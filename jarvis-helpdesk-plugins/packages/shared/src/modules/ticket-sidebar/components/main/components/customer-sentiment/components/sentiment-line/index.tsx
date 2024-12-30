import classNames from 'classnames';

export interface SentimentLineProps {
  title: string;
  content: string;
  className?: string;
}

const SentimentLine = (props: SentimentLineProps) => {
  return (
    <div className={classNames('flex justify-between', props.className)}>
      <div className="text-base font-medium">{props.title}</div>
      <div className="text-base font-extrabold">{props.content}</div>
    </div>
  );
};

export default SentimentLine;
