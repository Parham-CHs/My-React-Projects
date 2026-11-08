type Props = {
    onDelete: () => void;
    selectedNodeId: string | null;
};


export default function PanelHeader({ selectedNodeId, onDelete }: Props) {

    return (
        <>
            <div className="mb-3 flex items-center justify-between border-b border-zinc-700 pb-4">
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
                <p className="my-2 text-[13px] text-zinc-400">
                    Node ID: {selectedNodeId}
                </p>
            </div>
        </>
    );
}