import { HddStack } from 'react-bootstrap-icons';

const RuleCard = () => {
  return (
    <div className="box-border flex basis-1/3 flex-col gap-y-5 rounded-lg border px-8 py-7 shadow-sm">
      <HddStack className="text-2xl" />
      <div className="gap-y-3">
        <h2 className="mb-2 text-base font-medium">Strict AI behavior with Rules</h2>
        <p className="max-w-sm text-sm text-[#78829D]">
          Set guidelines to control how the AI responds, tailor the AI's output to fit particular needs, preferences, or
          contexts.
        </p>
      </div>
      <p className="text-sm text-blue-700">Learn more about Rule &gt;</p>
    </div>
  );
};

export default RuleCard;
