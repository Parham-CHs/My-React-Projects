
import { describe, it, expect } from 'vitest';
import validateWorkflow from './validateWorkflow';
import type {
    WorkflowNodeType,
    FilterConfig,
    ActionConfig,
    TriggerConfig,
} from '../types';

// npx vitest run

const createFilterNode = (
    config: FilterConfig
): WorkflowNodeType => ({
    id: 'filter-1',
    type: 'workflow',
    position: { x: 0, y: 0 },
    data: {
        label: 'Filter',
        kind: 'filter',
        config,
    },
});

const createActionNode = (
    config: ActionConfig
): WorkflowNodeType => ({
    id: 'action-1',
    type: 'workflow',
    position: { x: 0, y: 0 },
    data: {
        label: 'Action',
        kind: 'action',
        config,
    },
});

const createTriggerNode = (
    config: TriggerConfig
): WorkflowNodeType => ({
    id: 'trigger-1',
    type: 'workflow',
    position: { x: 0, y: 0 },
    data: {
        label: 'Trigger',
        kind: 'trigger',
        config,
    },
});

describe('validateWorkflow', () => {
    describe('Filter nodes', () => {
        it('returns no errors for a valid Filter node', () => {
            const node = createFilterNode({
                field: 'age',
                operator: 'greaterThan',
                value: '18',
            });

            expect(validateWorkflow([node])).toEqual([]);
        });

        it('returns an error for an empty field', () => {
            const node = createFilterNode({
                field: '   ',
                operator: 'equals',
                value: 'John',
            });

            expect(validateWorkflow([node])).toEqual([
                { nodeId: 'filter-1', message: 'Invalid Field' },
            ]);
        });

        it('returns an error for an empty value', () => {
            const node = createFilterNode({
                field: 'name',
                operator: 'equals',
                value: '',
            });

            expect(validateWorkflow([node])).toEqual([
                { nodeId: 'filter-1', message: 'Invalid Value' },
            ]);
        });

        it('returns two errors when both field and value are empty', () => {
            const node = createFilterNode({
                field: '',
                operator: 'equals',
                value: ' ',
            });

            expect(validateWorkflow([node])).toEqual([
                { nodeId: 'filter-1', message: 'Invalid Field' },
                { nodeId: 'filter-1', message: 'Invalid Value' },
            ]);
        });
    });

    describe('Action nodes', () => {
        it('returns no errors for a valid Action node', () => {
            const node = createActionNode({
                method: 'POST',
                url: 'https://api.example.com/users',
            });

            expect(validateWorkflow([node])).toEqual([]);
        });

        it('returns an error for an empty URL', () => {
            const node = createActionNode({
                method: 'GET',
                url: '   ',
            });

            expect(validateWorkflow([node])).toEqual([
                { nodeId: 'action-1', message: 'Invalid url' },
            ]);
        });
    });

    describe('Trigger nodes', () => {
        it('returns no errors for a valid Trigger node', () => {
            const node = createTriggerNode({
                triggerType: 'manual',
            });

            expect(validateWorkflow([node])).toEqual([]);
        });
    });

    describe('Multiple nodes', () => {
        it('validates multiple nodes and collects all errors', () => {
            const validFilter = createFilterNode({
                field: 'age',
                operator: 'greaterThan',
                value: '18',
            });

            const invalidAction = {
                ...createActionNode({
                    method: 'GET',
                    url: '',
                }),
                id: 'action-2',
            };

            const invalidFilter = {
                ...createFilterNode({
                    field: '',
                    operator: 'equals',
                    value: '',
                }),
                id: 'filter-2',
            };

            const validTrigger = createTriggerNode({
                triggerType: 'webhook',
            });

            expect(
                validateWorkflow([
                    validFilter,
                    invalidAction,
                    invalidFilter,
                    validTrigger,
                ])
            ).toEqual([
                { nodeId: 'action-2', message: 'Invalid url' },
                { nodeId: 'filter-2', message: 'Invalid Field' },
                { nodeId: 'filter-2', message: 'Invalid Value' },
            ]);
        });
    });
});
