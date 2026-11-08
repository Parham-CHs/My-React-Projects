import { type Node } from '@xyflow/react';

export const NODE_KINDS = [
    'trigger',
    'action',
    'filter',
] as const;
// export type NodeKind = 'trigger' | 'action' | 'filter';
export type NodeKind = typeof NODE_KINDS[number];

export type WorkflowNodeType = Node<WorkflowNodeData, 'workflow'>;

export type WorkflowNodeData =
    | {
        label: string;
        kind: 'filter';
        config: FilterConfig;
    }
    | {
        label: string;
        kind: 'trigger';
        config: TriggerConfig;
    }
    | {
        label: string;
        kind: 'action';
        config: ActionConfig;
    };

export type FilterConfig = {
    field: string;
    operator: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan';
    value: string;
};

export type TriggerConfig = {
    triggerType: 'manual' | 'webhook';
};

export type ActionConfig = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
};

export type ConfigPayload =
  | { nodeId: string; kind: 'trigger'; config: TriggerConfig }
  | { nodeId: string; kind: 'action';  config: ActionConfig  }
  | { nodeId: string; kind: 'filter';  config: FilterConfig  };

  export type ValidationError = {
    nodeId: string;
    message: string;
};