

type Props = {
    label: string;
    nodeType: string;
    onLabelChange: (newLabel: string) => void;
};

export default function Label({ nodeType, label, onLabelChange }: Props) {

    return (
        <div>
            <label
                htmlFor="node-label"
                className="mb-2 block text-[13px] font-medium text-zinc-300"
            >
                Node Label
            </label>

            <input
                id="node-label"
                type="text"
                value={String(label ?? '')}
                onChange={(event) => onLabelChange(event.target.value)}
                className="box-border w-full rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-50 outline-none transition-colors hover:border-zinc-500 focus:border-violet-500"
            />

            <p className="my-3 text-[13px] text-zinc-400">
                Node Type: {nodeType}
            </p>
        </div>
    );
}