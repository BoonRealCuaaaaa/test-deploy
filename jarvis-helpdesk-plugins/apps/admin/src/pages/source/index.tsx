import SourceTable from './components/source-table';
import SourceTableEmptyPlaceholder from './components/source-table-empty-placeholder';
import SourceTitle from './components/source-title';

const SourcePage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 px-10">
      <div className="w-full max-w-content">
        <SourceTitle />
      </div>
      <div className="w-full max-w-content">
        <SourceTable emptyPlaceholder={<SourceTableEmptyPlaceholder />} />
      </div>
    </div>
  );
};

export default SourcePage;
