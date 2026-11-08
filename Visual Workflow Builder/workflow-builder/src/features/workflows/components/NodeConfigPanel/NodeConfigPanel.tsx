import type { Node } from '@xyflow/react';
import type { WorkflowNodeData, ConfigPayload } from '../../types';
// import type { FilterConfig, ActionConfig, TriggerConfig } from '../../types';

import PanelHeader from './Title&DeleteBtn';
import Label from './Label';
// import ConfigInput from './ConfigInput';
// import ConfigSelect from './ConfigSelect';
import FilterConfigForm from './FilterConfigForm/FilterConfigForm';

// const FILTER_OPTIONS = [
//     { value: 'equals', label: 'Equals' },
//     { value: 'notEquals', label: 'Does not equal' },
//     { value: 'greaterThan', label: 'Greater than' },
//     { value: 'lessThan', label: 'Less than' },
// ];

type Props = {
    onDelete: () => void;
    selectedNode: Node<WorkflowNodeData, 'workflow'> | null;
    onLabelChange: (newLabel: string) => void;
    onConfigChange: (config: ConfigPayload) => void;
};

export default function NodeConfigPanel({ selectedNode, onLabelChange, onDelete, onConfigChange, }: Props) {

    // const updateFilterConfig = <K extends keyof FilterConfig>(
    //     field: K,
    //     value: FilterConfig[K]
    // ) => {
    //     if (!selectedNode || selectedNode.data.kind !== 'filter') return;
    //     const filterConfig: FilterConfig = { ...selectedNode.data.config, [field]: value, }
    //     onConfigChange({
    //         nodeId: selectedNode.id,
    //         kind: 'filter',
    //         config: filterConfig,
    //     });
    // };


    // const updateActionConfig = <K extends keyof ActionConfig>(
    //     field: K,
    //     value: ActionConfig[K]
    // ) => {
    //     if (!selectedNode || selectedNode.data.kind !== 'action') return;
    //     const actionConfig: ActionConfig = { ...selectedNode.data.config, [field]: value, }
    //     onConfigChange({
    //         nodeId: selectedNode.id,
    //         kind: 'action',
    //         config: actionConfig,
    //     });
    // };

    // const updateTriggerConfig = <K extends keyof TriggerConfig>(
    //     field: K,
    //     value: TriggerConfig[K]
    // ) => {
    //     if (!selectedNode || selectedNode.data.kind !== 'trigger') return;
    //     const Config: TriggerConfig = { ...selectedNode.data.config, [field]: value, }
    //     onConfigChange({
    //         nodeId: selectedNode.id,
    //         kind: 'trigger',
    //         config: Config,
    //     });
    // };

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
            className={`box-border h-full shrink-0 overflow-hidden bg-zinc-900
                    font-sans text-zinc-100 transition-all duration-300 ease-in-out
                    ${selectedNode
                    ? 'w-70 min-w-70 border-l border-zinc-700 p-6 opacity-100'
                    : 'w-0 min-w-0 border-l-0 p-0 opacity-0 pointer-events-none'
                }`}
        >

            <PanelHeader selectedNodeId={selectedNode.id} onDelete={onDelete} />

            <Label nodeType={selectedNode.type} label={String(selectedNode.data.label)} onLabelChange={onLabelChange} />


            <div className="mb-5">
                <p className="mb-3 text-sm font-medium capitalize text-violet-400">
                    {selectedNode.data.kind} Settings
                </p>
                <div className="space-y-4">
                    
                    {selectedNode.data.kind === 'filter' && (

                        <>
                            <FilterConfigForm
                                selectedNode={selectedNode}
                                onConfigChange={onConfigChange} />

                        </>

                    )}

                    {selectedNode.data.kind === 'trigger' && (
                        <p className="text-sm text-zinc-400">
                            Trigger configuration coming next.
                        </p>
                    )}


                    {selectedNode.data.kind === 'action' && (
                        <p className="text-sm text-zinc-400">
                            Action configuration coming next.
                        </p>
                    )}

                </div>


            </div>
        </aside>
    );
}