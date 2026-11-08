import type { ValidationError } from '../types';

type Props = {
    errors: ValidationError[];
    onErrorClick: (nodeId: string) => void;
    onClose: () => void;
};

export default function ValidationResults({
    errors,
    onErrorClick,
    onClose,
}: Props) {
    return (
        <div className="absolute left-4 top-20 z-50 w-80 rounded-lg border border-zinc-700 bg-zinc-900 p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-white">
                    Validation Results
                </h2>

                <button onClick={onClose}>
                    Close
                </button>
            </div>

            {errors.length === 0 ? (
                <p className="text-green-400">
                    Workflow is valid!
                </p>
            ) : (
                <div className="space-y-2">
                    {errors.map((error, index) => (
                        <button
                            key={`${error.nodeId}-${index}`}
                            onClick={() => onErrorClick(error.nodeId)}
                            className="block w-full rounded-md bg-red-950 p-3 text-left text-sm text-red-300 hover:bg-red-900"
                        >
                            <p>{error.message}</p>
                            <span className="text-xs text-red-400">
                                Node: {error.nodeId}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
