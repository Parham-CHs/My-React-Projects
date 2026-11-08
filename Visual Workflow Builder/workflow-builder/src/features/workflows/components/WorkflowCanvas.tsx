import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    type NodeChange,
    type EdgeChange,
    // type Node,

    type Connection
} from '@xyflow/react';

//types
import type { ConfigPayload, WorkflowNodeType } from '../types';

//UI
import Toolbar from './toolbar';
import WorkflowNode from './WorkflowNode';
import NodeConfigPanel from './NodeConfigPanel/NodeConfigPanel';

//Redux
import { workflowActions } from '../workflowSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

//Css
import '@xyflow/react/dist/style.css';

import validateWorkflow from '../utils/validateWorkflow'
import ValidationResults from './ValidationResults';
import { useState } from 'react';


const nodeTypes = {
    workflow: WorkflowNode,
};


export default function WorkflowCanvas() {
    const [isErrorVisible, setErrorVisible] = useState(false)

    //Selector and Dispatch
    const { nodes, edges, selectedNodeId, validationErrors } = useAppSelector((state) => state.workflow);
    const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;

    const dispatch = useAppDispatch();



    // handle functions
    const handleNodeUpdate = (nodeChange: NodeChange<WorkflowNodeType>[]) => {
        dispatch(workflowActions.updateNodes(nodeChange));
    };

    // const handleAddNode = (kind: WorkflowNodeData['kind']) => {
    //     dispatch(workflowActions.addNode({ kind }));
    // };

    const handleEdgeUpdate = (edgeChange: EdgeChange[]) => {
        dispatch(workflowActions.updateEdges(edgeChange));
    };


    const handleNodeClick = (nodeId: string) => {
        dispatch(workflowActions.setSelectedNode(nodeId));
    };

    const handleNodeLabelChange = (newLabel: string) => {
        if (!selectedNode) return;

        dispatch(workflowActions.updateNodeLabel({ nodeId: selectedNode.id, newLabel, }));
    };

    const handleConnect = (connection: Connection) => {
        dispatch(workflowActions.onConnect(connection));
    };

    const unFocusNode = () => {
        dispatch(workflowActions.setSelectedNode(null));
    };

    const handleDeleteNode = () => {
        if (!selectedNode) return;
        dispatch(workflowActions.deleteNode(selectedNode.id));
    };

    // const handleConfigChange = (config: FilterConfig | ActionConfig | TriggerConfig): void => {
    //     if (!selectedNode) return;
    //     if (typeof config == FilterConfig)
    //         dispatch(
    //             workflowActions.updateFilterConfig({
    //                 nodeId: selectedNode.id,
    //                 config,
    //             })
    //         );
    // };

    const handleConfigChange = (config: ConfigPayload): void => {
        if (!selectedNode) return;
        dispatch(
            workflowActions.updateConfig(config)
        );
    };

    const handleValidation = (): void => {
        dispatch(workflowActions.setValidationErrors(validateWorkflow(nodes)))
        setErrorVisible(true)
    };
    // end of handle functions

    return (
        <div className="flex h-screen w-full">

            <div className="flex min-w-0 flex-1 flex-col">

                {/* Toolbar */}
                <Toolbar onValidation={handleValidation} />

                {/* Canvas */}
                <div className="min-h-0 flex-1">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={handleNodeUpdate}
                        onEdgesChange={handleEdgeUpdate}
                        onConnect={handleConnect}
                        onNodeClick={(_, node) => handleNodeClick(node.id)}
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
                onConfigChange={handleConfigChange}
            />

            {/* {Error Validation Module} */}
            {isErrorVisible && <ValidationResults errors={validationErrors} onErrorClick={handleNodeClick}
                onClose={() => setErrorVisible(false)} />}
        </div>

    );
}
