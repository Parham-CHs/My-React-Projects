import type { WorkflowNodeType } from "../types";

type ValidationError = {
    nodeId: string;
    message: string;
};

export default function validateWorkflow(nodes: WorkflowNodeType[]): ValidationError[] {
    const errors: ValidationError[] = [];
    for (const node of nodes) {
        const  nodeId = node.id;
        if (node.data.kind === 'filter') {
            const  { field, operator, value } = node.data.config;
            if (typeof field !== 'string' || field.trim() === '')
                errors.push({ nodeId, message: 'Invalid Field' })
            if (!['equals', 'notEquals', 'greaterThan', 'lessThan'].includes(operator))
                errors.push({ nodeId, message: 'Invalid Operator' })
            if (typeof value !== 'string' || value.trim() === '')
                errors.push({ nodeId, message: 'Invalid Value' })
        }

        if (node.data.kind === 'action') {
            const  { url, method } = node.data.config;
            if (typeof url !== 'string' || url.trim() === '')
                errors.push({ nodeId, message: 'Invalid url' })
            if (!['GET' , 'POST' , 'PUT' , 'DELETE'].includes(method))
                errors.push({ nodeId, message: 'Invalid Method' })

        }

        if (node.data.kind === 'trigger') {
            const  triggerType = node.data.config.triggerType;
            if (!['manual' , 'webhook'].includes(triggerType))
                errors.push({ nodeId, message: 'Invalid TriggerType' })
        }
    }


    return errors;
};

