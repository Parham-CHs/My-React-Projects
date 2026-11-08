import { useAppDispatch } from '../../../app/hooks';
import { workflowActions } from '../workflowSlice';
import { NODE_KINDS, type WorkflowNodeData } from '../types';

type Props = {
    onValidation: () => void;
};

export default function Toolbar({ onValidation }: Props) {

    const dispatch = useAppDispatch();

    const handleAddNode = (kind: WorkflowNodeData['kind']) => {
        dispatch(workflowActions.addNode({ kind }));
    };

    return (
        <div className="bg-zinc-800 p-3">
            <div className="flex flex-wrap gap-3">
                {NODE_KINDS.map((eachNodeKind) =>
                    <button
                        key={eachNodeKind}
                        onClick={() => handleAddNode(eachNodeKind)}
                        className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500 active:bg-violet-700"
                    >
                        + Add {eachNodeKind.charAt(0).toUpperCase() + eachNodeKind.slice(1)} Node
                    </button>
                )}
                <button
                    onClick={onValidation}
                    className="rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 active:bg-green-500"
                >
                    Validate Workflow
                </button>
            </div>
        </div>
    )

}