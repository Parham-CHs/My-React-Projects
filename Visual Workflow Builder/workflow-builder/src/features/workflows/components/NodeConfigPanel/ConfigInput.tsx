type Props = {
    label: string;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
};

export default function ConfigInput({ label, value, onChange, placeholder }: Props) {

    return (
        <div>
            <label className="mb-2 block text-sm text-zinc-400">
                {label}
            </label>

            <input
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:border-violet-500"
            />
        </div>
    );
}