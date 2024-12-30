import { Button } from '@/src/components/button';

import { RULE_FORM_SIZE } from '../constants/rule-form-size';

export interface AddRuleFormProps {
  ruleInput: string;
  setRuleInput: (newRule: string) => void;
  onAddRule: () => void;
}

const AddRuleForm = ({ ruleInput, setRuleInput, onAddRule }: AddRuleFormProps) => {
  return (
    <div className="box-border basis-3/4 text-lg font-semibold">
      <h2 className="rounded-t-lg border-x border-t px-7 py-4 text-base font-semibold shadow-sm">Add New Rule</h2>
      <div className="flex flex-col rounded-b-lg border-x border-b px-7 py-5 shadow-sm">
        <textarea
          className="h-20 w-full rounded-md border border-gray-300 bg-gray-50 p-2 font-sans text-sm font-normal outline-none"
          placeholder="Write your rule here..."
          value={ruleInput}
          onChange={(e) => setRuleInput(e.target.value)}
          maxLength={RULE_FORM_SIZE.MAX_CONTENT}
        />
        <p className="text-jarvis-text mt-2 self-end text-xs font-normal">{`${ruleInput.length}/${RULE_FORM_SIZE.MAX_CONTENT}`}</p>
        <Button
          variant="primary"
          size="medium"
          disabled={ruleInput.trim().length === 0}
          className="mb-2 mt-4 h-9 w-20 self-end text-xs"
          onClick={onAddRule}
        >
          Add new
        </Button>
      </div>
    </div>
  );
};

export default AddRuleForm;
