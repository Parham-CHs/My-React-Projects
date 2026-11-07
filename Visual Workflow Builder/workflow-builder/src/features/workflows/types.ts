export type NodeKind = 'trigger' | 'action' | 'filter';

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



