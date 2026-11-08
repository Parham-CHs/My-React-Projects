import type { Node } from '@xyflow/react';
import type { WorkflowNodeData, ActionConfig, ConfigPayload } from '../../../types';

import ConfigInput from '../Input/ConfigInput';
import ConfigSelect from '../Input/ConfigSelect';



const METHOD_OPTIONS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
];

type Props = {
  selectedNode: Node<WorkflowNodeData, 'workflow'>;
  onConfigChange: (config: ConfigPayload) => void;
};

export default function ActionConfigForm({ selectedNode, onConfigChange }: Props) {

  if (selectedNode.data.kind !== 'action') return null;

  const config = selectedNode.data.config; // now narrowed to ActionConfig

  const updateActionConfig = <K extends keyof ActionConfig>(
    field: K,
    value: ActionConfig[K]
  ) => {
    const actionConfig: ActionConfig = { ...config, [field]: value, }
    onConfigChange({
      nodeId: selectedNode.id,
      kind: 'action',
      config: actionConfig,
    });
  };


  return (
    <>
      <ConfigSelect
        label="Method"
        options={METHOD_OPTIONS}
        value={config.method}
        onChange={(value) =>
          updateActionConfig('method', value as ActionConfig['method'])}
      />
      <ConfigInput
        label="URL"
        placeholder="https://api.example.com/users"
        value={config.url}
        onChange={(value) => updateActionConfig('url', value)}
      />

    </>
  );

}