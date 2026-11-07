
import type { Node } from '@xyflow/react';

type Props = {
    onDelete: () => void;
    selectedNode: Node | null;
    onLabelChange: (newLabel: string) => void;
};

export default function NodeConfigPanel({ selectedNode, onLabelChange, onDelete }: Props) {
    return (
        <>
            {selectedNode && (
                <aside className="box-border h-full w-70 min-w-68.75 border-l border-zinc-700 bg-zinc-900 p-6 font-sans text-zinc-100">

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

                </aside>
            )}

        </>
    );
}
