import type { Node } from '@xyflow/react';
import type { WorkflowNodeData, TriggerConfig, ConfigPayload } from '../../../types';

// import ConfigInput from '../ConfigInput';
import ConfigSelect from '../Input/ConfigSelect';

// triggerType: 'manual' | 'webhook';
const TRIGGER_OPTIONS = [
  { value: 'manual', label: 'Manual' },
  { value: 'webhook', label: 'Webhook' }
];

type Props = {
  selectedNode: Node<WorkflowNodeData, 'workflow'>;
  onConfigChange: (config: ConfigPayload) => void;
};

export default function TriggerConfigForm({ selectedNode, onConfigChange }: Props) {

  if (selectedNode.data.kind !== 'trigger') return null;

  const config = selectedNode.data.config; // now narrowed to TriggerConfig

  const updateTriggerConfig = <K extends keyof TriggerConfig>(
    field: K,
    value: TriggerConfig[K]
  ) => {
    const triggerConfig: TriggerConfig = { ...config, [field]: value, }
    onConfigChange({
      nodeId: selectedNode.id,
      kind: 'trigger',
      config: triggerConfig,
    });
  };


  return (
    <>
      <ConfigSelect
        label="Trigger Type"
        options={TRIGGER_OPTIONS}
        value={config.triggerType}
        onChange={(value) =>
          updateTriggerConfig('triggerType', value as TriggerConfig['triggerType'])}
      />
    </>
  );

}