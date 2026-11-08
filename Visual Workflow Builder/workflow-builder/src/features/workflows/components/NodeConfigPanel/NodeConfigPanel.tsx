import type { Node } from '@xyflow/react';
import type { WorkflowNodeData, ConfigPayload } from '../../types';

import PanelHeader from './PanelHeader/Title&DeleteBtn';
import FilterConfigForm from './Forms/FilterConfigForm';
import Label from './PanelHeader/Label';
import ActionConfigForm from './Forms/ActionConfigForm';
import TriggerConfigForm from './Forms/TriggerConfigForm';



type Props = {
    onDelete: () => void;
    selectedNode: Node<WorkflowNodeData, 'workflow'> | null;
    onLabelChange: (newLabel: string) => void;
    onConfigChange: (config: ConfigPayload) => void;
};

export default function NodeConfigPanel({ selectedNode, onLabelChange, onDelete, onConfigChange, }: Props) {


    if (!selectedNode) {
        return (
            <aside
                className='box-border h-full shrink-0 overflow-hidden bg-zinc-900
                    font-sans text-zinc-100 transition-all duration-300 ease-in-out
                    w-0 min-w-0 border-l-0 p-0 opacity-0 pointer-events-none'
            />
        );
    }

    return (

        <aside
            className='box-border h-full shrink-0 overflow-hidden bg-zinc-900
                    font-sans text-zinc-100 transition-all duration-300 ease-in-out
                    w-70 min-w-70 border-l border-zinc-700 p-6 opacity-100'
        >

            <PanelHeader selectedNodeId={selectedNode.id} onDelete={onDelete} />

            <Label nodeType={selectedNode.type} label={String(selectedNode.data.label)} onLabelChange={onLabelChange} />


            <div className="mb-5">
                <p className="mb-3 text-sm font-medium capitalize text-violet-400">
                    {selectedNode.data.kind} Settings
                </p>
                <div className="space-y-4">

                    {selectedNode.data.kind === 'filter' && (
                        <FilterConfigForm
                            selectedNode={selectedNode}
                            onConfigChange={onConfigChange} />
                    )}

                    {selectedNode.data.kind === 'trigger' && (
                        <TriggerConfigForm
                            selectedNode={selectedNode}
                            onConfigChange={onConfigChange} />
                    )}

                    {selectedNode.data.kind === 'action' && (
                        <ActionConfigForm
                            selectedNode={selectedNode}
                            onConfigChange={onConfigChange} />
                    )}

                </div>


            </div>
        </aside>
    );
}