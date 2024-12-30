import InnovationAmico from '@/src/assets/svgs/Innovation-amico.svg';

const RuleTableEmptyPlaceholder = () => {
  return (
    <div className="mb-8 flex flex-col items-center gap-y-6 rounded-xl border p-16 shadow-sm">
      <img src={InnovationAmico} alt="innovation-amico image" />
      <div className="flex flex-col items-center gap-y-5">
        <div>
          <h2 className="mb-3 text-center text-2xl font-semibold">No Rules added yet</h2>
          <p className="text-center text-sm text-[#252F4A]">Start by adding new rules to shape your AI's responses.</p>
        </div>
      </div>
    </div>
  );
};

export default RuleTableEmptyPlaceholder;
