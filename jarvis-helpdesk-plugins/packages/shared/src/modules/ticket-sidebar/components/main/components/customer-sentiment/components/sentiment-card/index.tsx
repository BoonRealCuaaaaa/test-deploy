import classNames from 'classnames';

export interface SentimentCardProps {
  title: string;
  content: string;
  className?: string;
}

const SentimentCard = (props: SentimentCardProps) => {
  return (
    <div
      className={classNames(
        'flex flex-col justify-between rounded border-2 border-dashed px-3 py-1.5',
        props.className
      )}
    >
      <div className="text-wrap text-base font-bold">{props.content}</div>
      <div className="text-wrap text-base font-normal">{props.title}</div>
    </div>
  );
};

export default SentimentCard;
