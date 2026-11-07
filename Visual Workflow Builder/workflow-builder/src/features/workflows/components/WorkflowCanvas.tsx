import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    type NodeChange,
    type EdgeChange,
    // applyNodeChanges,
    // applyEdgeChanges,
    type Node,
    // type Edge,
    // type NodeChange,

    // addEdge,
    type Connection
} from '@xyflow/react';

import type { WorkflowNodeData, FilterConfig } from '../types';


import NodeConfigPanel from './NodeConfigPanel';


import WorkflowNode from './WorkflowNode';
// import { NODE_KINDS } from './WorkflowNode';
// import type { NodeKind } from './WorkflowNode';


import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { workflowActions } from '../workflowSlice';



import '@xyflow/react/dist/style.css';
import Toolbar from './toolbar';

const nodeTypes = {
    workflow: WorkflowNode,
};


export default function WorkflowCanvas() {

    // load states from Redux store (subscribtion)
    const nodes = useAppSelector((state) => state.workflow.nodes);
    const edges = useAppSelector((state) => state.workflow.edges);
    const selectedNodeId = useAppSelector((state) => state.workflow.selectedNodeId);
    const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;

    const dispatch = useAppDispatch();
    
    // handle functions
    // const handleAddNode = (kind: WorkflowNodeData['kind']) => {
    //     dispatch(workflowActions.addNode({ kind }));
    // };

    const handleNodeUpdate = (nodeChange: NodeChange<Node<WorkflowNodeData, 'workflow'>>[]) => {
        dispatch(workflowActions.updateNodes(nodeChange));
    };

    const handleEdgeUpdate = (edgeChange: EdgeChange[]) => {
        dispatch(workflowActions.updateEdges(edgeChange));
    };


    const handleNodeClick = (selectedNode: Node) => {
        dispatch(workflowActions.focusNode({ selectedNodeId: selectedNode.id }));
    };

    const handleNodeLabelChange = (newLabel: string) => {
        if (!selectedNode) return;

        dispatch(workflowActions.updateNodeLabel({ nodeId: selectedNode.id, newLabel, }));
    };

    const handleConnect = (connection: Connection) => {
        dispatch(workflowActions.onConnect(connection));
    };

    const unFocusNode = () => {
        dispatch(workflowActions.unfocusNode());
    };

    const handleDeleteNode = () => {
        if (!selectedNode) return;
        dispatch(workflowActions.deleteNode(selectedNode.id));
    };

    const handleFilterConfigChange = (config: FilterConfig) => {
        if (!selectedNode) return;

        dispatch(
            workflowActions.updateFilterConfig({
                nodeId: selectedNode.id,
                config,
            })
        );
    };
    // end of handle functions

    return (

        <div className="flex h-screen w-full">

            <div className="flex min-w-0 flex-1 flex-col">

                {/* Toolbar */}
                <Toolbar/>

                {/* Canvas */}
                <div className="min-h-0 flex-1">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={handleNodeUpdate}
                        onEdgesChange={handleEdgeUpdate}
                        onConnect={handleConnect}
                        onNodeClick={(_, node) => handleNodeClick(node)}
                        onPaneClick={unFocusNode}
                        fitView
                    >
                        <Background />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </div>

            </div>

            {/* Config panel */}
            <NodeConfigPanel
                selectedNode={selectedNode}
                onDelete={handleDeleteNode}
                onLabelChange={handleNodeLabelChange}
                onFilterConfigChange={handleFilterConfigChange}
            />
        </div>

    );
}
