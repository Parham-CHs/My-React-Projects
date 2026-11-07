import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    type Node, type Edge, type NodeChange, type EdgeChange, type Connection,
    addEdge, applyNodeChanges, applyEdgeChanges
} from '@xyflow/react';
import type { WorkflowNodeData, FilterConfig, TriggerConfig, ActionConfig, } from './types';

type WorkflowNode = Node<WorkflowNodeData, 'workflow'>;

type WorkflowState = {
    nodes: WorkflowNode[];
    edges: Edge[];
    selectedNodeId: string | null;
};

const initialState: WorkflowState = {
    nodes: [],
    edges: [],
    selectedNodeId: null,
};

function createWorkflowNode(
    kind: WorkflowNodeData['kind'],
    position: { x: number; y: number }
): Node<WorkflowNodeData, 'workflow'> {
    const id = crypto.randomUUID();

    switch (kind) {
        case 'trigger':
            return {
                id,
                type: 'workflow',
                position,
                data: {
                    label: 'New Trigger',
                    kind: 'trigger',
                    config: createDefaultConfig('trigger'),
                },
            };

        case 'action':
            return {
                id,
                type: 'workflow',
                position,
                data: {
                    label: 'New Action',
                    kind: 'action',
                    config: createDefaultConfig('action'),
                },
            };

        case 'filter':
            return {
                id,
                type: 'workflow',
                position,
                data: {
                    label: 'New Filter',
                    kind: 'filter',
                    config: createDefaultConfig('filter'),
                },
            };
    }
}

// function createWorkflowNode(
//     kind: WorkflowNodeData['kind'],
//     position: { x: number; y: number }
// ): Node<WorkflowNodeData, 'workflow'> {

//     const labels = {
//         trigger: 'New Trigger',
//         action: 'New Action',
//         filter: 'New Filter',
//     };

//     return {
//         id: crypto.randomUUID(),
//         type: 'workflow',
//         position,
//         data: {
//             label: labels[kind],
//             kind,
//             config: createDefaultConfig(kind),
//         },
//     };
// }

// function createDefaultConfig(
//     kind: WorkflowNodeData['kind']
// ): WorkflowNodeData['config'] {
//     switch (kind) {
//         case 'trigger':
//             return {
//                 triggerType: 'manual',
//             } satisfies TriggerConfig;

//         case 'action':
//             return {
//                 method: 'GET',
//                 url: '',
//             } satisfies ActionConfig;

//         case 'filter':
//             return {
//                 field: '',
//                 operator: 'equals',
//                 value: '',
//             } satisfies FilterConfig;
//     }
// }

function createDefaultConfig(kind: 'trigger'): TriggerConfig;
function createDefaultConfig(kind: 'action'): ActionConfig;
function createDefaultConfig(kind: 'filter'): FilterConfig;

function createDefaultConfig(
    kind: WorkflowNodeData['kind']
): TriggerConfig | ActionConfig | FilterConfig {
    switch (kind) {
        case 'trigger':
            return {
                triggerType: 'manual',
            };

        case 'action':
            return {
                method: 'GET',
                url: '',
            };

        case 'filter':
            return {
                field: '',
                operator: 'equals',
                value: '',
            };
    }
}

const workflowSlice = createSlice({
    name: 'workflow',
    initialState,
    reducers: {

        addNode: (
            state,
            action: PayloadAction<{ kind: WorkflowNodeData['kind'] }>
        ) => {

            const newNode = createWorkflowNode(action.payload.kind, {
                x: 200,
                y: 200 + state.nodes.length * 150,
            });

            state.nodes.push(newNode)
            state.selectedNodeId = newNode.id
        },

        updateNodes: (state, action: PayloadAction<NodeChange<WorkflowNode>[]>) => {
            const removedIds = action.payload
                .filter(change => change.type === 'remove')
                .map(change => change.id);

            state.nodes = applyNodeChanges<WorkflowNode>(action.payload, state.nodes);

            state.edges = state.edges.filter(
                edge =>
                    !removedIds.includes(edge.source) &&
                    !removedIds.includes(edge.target)
            );

            if (
                state.selectedNodeId &&
                removedIds.includes(state.selectedNodeId)
            ) {
                state.selectedNodeId = null;
            }
        },

        focusNode: (state,
            action: PayloadAction<{ selectedNodeId: string }>
        ) => {
            state.selectedNodeId = (action.payload.selectedNodeId);
        },

        unfocusNode: (state) => {
            state.selectedNodeId = null;
        },

        updateEdges: (state,
            action: PayloadAction<EdgeChange[]>
        ) => {
            state.edges = applyEdgeChanges(action.payload, state.edges);
        },

        onConnect: (state, action: PayloadAction<Connection>) => {
            const edge = {
                ...action.payload,
                label: action.payload.sourceHandle,
            };
            state.edges = addEdge(edge, state.edges)
        },

        updateNodeLabel: (
            state,
            action: PayloadAction<{ nodeId: string; newLabel: string }>
        ) => {
            const node = state.nodes.find(
                node => node.id === action.payload.nodeId
            );

            if (node) {
                node.data.label = action.payload.newLabel;
            }
        },

        deleteNode: (state, action: PayloadAction<string>) => {
            const nodeId = action.payload;

            state.nodes = state.nodes.filter(
                node => node.id !== nodeId
            );

            state.edges = state.edges.filter(
                edge =>
                    edge.source !== nodeId &&
                    edge.target !== nodeId
            );

            if (state.selectedNodeId === nodeId) {
                state.selectedNodeId = null;
            }
        },

        updateFilterConfig: (
            state,
            action: PayloadAction<{
                nodeId: string;
                config: FilterConfig;
            }>
        ) => {
            const node = state.nodes.find(
                node => node.id === action.payload.nodeId
            );

            if (node && node.data.kind === 'filter') {
                node.data.config = action.payload.config;
            }
        },


    }
});

export const workflowActions = workflowSlice.actions;

export default workflowSlice.reducer;
