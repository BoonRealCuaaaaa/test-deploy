import KnowledgeTable from './components/table';
import KnowledgeTableEmptyPlaceholder from './components/table/empty-placeholder';
import KnowledgeTitle from './components/title';

const KnowledgePage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 px-10">
      <div className="w-full max-w-content">
        <KnowledgeTitle />
      </div>
      <div className="w-full max-w-content">
        <KnowledgeTable emptyPlaceholder={<KnowledgeTableEmptyPlaceholder />} />
      </div>
    </div>
  );
};

export default KnowledgePage;
