type Option = {
    label: string;
    value: string;
};

type Props = {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
};

export default function ConfigSelect({ label, value, onChange, options }: Props) {

    return (

        <div>
            <label className="mb-2 block text-sm text-zinc-400">
                {label}
            </label>

            <select
                value={value}
                // Operator select
                onChange={(event) => onChange(event.target.value)
                } className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:border-violet-500"
            >
                {options.map((option) => <option value={option.value} key={option.value}>{option.label??option.value}</option>)}
            </select>
        </div>
    );
}