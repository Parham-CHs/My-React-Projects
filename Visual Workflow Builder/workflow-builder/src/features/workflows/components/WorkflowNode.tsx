import {
    Handle,
    Position,
    type NodeProps,
} from '@xyflow/react';
import type { WorkflowNodeType } from '../types';


export default function WorkflowNode({ data }: NodeProps<WorkflowNodeType>) {
    return (
        <div
            className={`min-w-40 rounded-lg border bg-zinc-800 px-4.5 py-3.5 text-white
                ${data.kind === 'trigger' ? 'border-green-600' : ''}
                ${data.kind === 'action' ? 'border-blue-500' : ''}
                ${data.kind === 'filter' ? 'border-yellow-500' : ''}
            `}
        >
            <Handle type="target" position={Position.Left} />

            <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-zinc-400">
                    {data.kind.toUpperCase()}
                </span>

                <strong className="text-sm">
                    {data.label}
                </strong>
            </div>


            {data.kind === 'filter' ?
                (
                    <>
                        <Handle
                            id="true"
                            type="source"
                            position={Position.Right}
                            style={{ top: '35%' }}
                        />
                        <Handle
                            id="false"
                            type="source"
                            position={Position.Right}
                            style={{ top: '70%' }}
                        />
                    </>
                )
                : (<Handle type="source" position={Position.Right} />)
            }

        </div>
    );
}