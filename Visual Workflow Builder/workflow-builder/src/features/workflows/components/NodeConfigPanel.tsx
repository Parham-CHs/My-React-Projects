import type { Node } from '@xyflow/react';
import type { WorkflowNodeData, FilterConfig } from '../types';

type Props = {
    onDelete: () => void;
    selectedNode: Node<WorkflowNodeData, 'workflow'> | null;
    onLabelChange: (newLabel: string) => void;
    onFilterConfigChange: (config: FilterConfig) => void;
};

export default function NodeConfigPanel({ selectedNode, onLabelChange, onDelete, onFilterConfigChange, }: Props) {

    // const updateFilterField = (
    //     field: keyof FilterConfig,
    //     value: string
    // ) => {
    //     if (data.kind !== 'filter') return;

    //     onFilterConfigChange({
    //         ...data.config,
    //         [field]: value,
    //     });
    // };

    const updateFilterField = <K extends keyof FilterConfig>(
        field: K,
        value: FilterConfig[K]
    ) => {
        if (data.kind !== 'filter') return;

        onFilterConfigChange({
            ...data.config,
            [field]: value,
        });
    };

    if (!selectedNode) {
        return (
            <aside
                className='box-border h-full shrink-0 overflow-hidden bg-zinc-900
                    font-sans text-zinc-100 transition-all duration-300 ease-in-out

                    w-0 min-w-0 border-l-0 p-0 opacity-0 pointer-events-none'
            />
        );
    }

    const { data } = selectedNode;

    return (
        <aside
            className={`box-border h-full shrink-0 overflow-hidden bg-zinc-900
                    font-sans text-zinc-100 transition-all duration-300 ease-in-out
                    ${selectedNode
                    ? 'w-70 min-w-70 border-l border-zinc-700 p-6 opacity-100'
                    : 'w-0 min-w-0 border-l-0 p-0 opacity-0 pointer-events-none'
                }`}
        >
            <div className="mb-6 flex items-center justify-between border-b border-zinc-700 pb-4">
                <h2 className="text-lg font-semibold">
                    Node Configuration
                </h2>

                <button
                    onClick={onDelete}
                    className="rounded-md bg-red-600 px-2 py-1.5 text-sm text-white hover:bg-red-500"
                >
                    Delete
                </button>
            </div>

            <div>
                <p className="my-3 text-[13px] text-zinc-400">
                    Node ID: {selectedNode.id}
                </p>

                <label
                    htmlFor="node-label"
                    className="mb-2 block text-[13px] font-medium text-zinc-300"
                >
                    Node Label
                </label>

                <input
                    id="node-label"
                    type="text"
                    value={String(selectedNode.data.label ?? '')}
                    onChange={(event) => onLabelChange(event.target.value)}
                    className="box-border w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-50 outline-none transition-colors hover:border-zinc-500 focus:border-violet-500"
                />

                <p className="my-3 text-[13px] text-zinc-400">
                    Node Type: {selectedNode.type}
                </p>
            </div>
            <div className="mb-5">
                <p className="mb-3 text-sm font-medium capitalize text-violet-400">
                    {data.kind} Settings
                </p>

                {data.kind === 'filter' && (
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                Field
                            </label>

                            <input
                                value={data.config.field}
                                onChange={(event) =>
                                    updateFilterField(
                                        'field',
                                        event.target.value
                                    )
                                }
                                placeholder="e.g. user.age"
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:border-violet-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                Operator
                            </label>

                            <select
                                value={data.config.operator}
                                // Operator select
                                onChange={(event) => updateFilterField('operator', event.target.value as FilterConfig['operator'])
                                } className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:border-violet-500"
                            >
                                <option value="equals">Equals</option>
                                <option value="notEquals">Does not equal</option>
                                <option value="greaterThan">Greater than</option>
                                <option value="lessThan">Less than</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-zinc-400">
                                Value
                            </label>

                            <input
                                value={data.config.value}
                                onChange={(event) =>
                                    updateFilterField('value', event.target.value)
                                }
                                placeholder="e.g. 18"
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:border-violet-500"
                            />
                        </div>
                    </div>
                )}

                {data.kind === 'trigger' && (
                    <p className="text-sm text-zinc-400">
                        Trigger configuration coming next.
                    </p>
                )}

                {data.kind === 'action' && (
                    <p className="text-sm text-zinc-400">
                        Action configuration coming next.
                    </p>
                )}
            </div>
        </aside>
    );
}