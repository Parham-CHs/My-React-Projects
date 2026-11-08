import type { Node } from '@xyflow/react';
import type { WorkflowNodeData, FilterConfig, ConfigPayload } from '../../../types';

import ConfigInput from '../ConfigInput';
import ConfigSelect from '../ConfigSelect';

const FILTER_OPTIONS = [
    { value: 'equals', label: 'Equals' },
    { value: 'notEquals', label: 'Does not equal' },
    { value: 'greaterThan', label: 'Greater than' },
    { value: 'lessThan', label: 'Less than' },
];

type Props = {
    selectedNode: Node<WorkflowNodeData, 'workflow'>;
    onConfigChange: (config: ConfigPayload) => void;
};

export default function FilterConfigForm({ selectedNode, onConfigChange }: Props) {

    const updateFilterConfig = <K extends keyof FilterConfig>(
        field: K,
        value: FilterConfig[K]
    ) => {
        if (selectedNode.data.kind !== 'filter') return;
        const filterConfig: FilterConfig = { ...selectedNode.data.config, [field]: value, }
        onConfigChange({
            nodeId: selectedNode.id,
            kind: 'filter',
            config: filterConfig,
        });
    };

    if (selectedNode.data.kind !== 'filter') return null;

    const config = selectedNode.data.config; // now narrowed to FilterConfig
    
    return (
      <>
        <ConfigInput
          label="Field"
          placeholder="e.g. user.age"
          value={config.field}
          onChange={(value) => updateFilterConfig('field', value)}
        />
    
        <ConfigSelect
          label="Operator"
          options={FILTER_OPTIONS}
          value={config.operator}
          onChange={(value) =>
            updateFilterConfig('operator', value as FilterConfig['operator'])
          }
        />
    
        <ConfigInput
          label="Value"
          placeholder="e.g. 18"
          value={config.value}
          onChange={(value) => updateFilterConfig('value', value)}
        />
      </>
    );

}