import type { Node } from '@xyflow/react';
import type { WorkflowNodeData, FilterConfig, ConfigPayload } from '../../../types';

import ConfigInput from '../Input/ConfigInput';
import ConfigSelect from '../Input/ConfigSelect';

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

  if (selectedNode.data.kind !== 'filter') return null;

  const config = selectedNode.data.config; // now narrowed to FilterConfig

    const updateFilterConfig = <K extends keyof FilterConfig>(
        field: K,
        value: FilterConfig[K]
    ) => {
        const filterConfig: FilterConfig = { ...config, [field]: value, }
        onConfigChange({
            nodeId: selectedNode.id,
            kind: 'filter',
            config: filterConfig,
        });
    };

    
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