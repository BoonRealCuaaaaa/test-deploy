import useParentSize from '@/shared/hooks/use-parent-size';
import { WIDTH_BREAKPOINT } from '@/shared/modules/ticket-sidebar/constants/size';

import { Sentiment } from './constant/sentiment';
import { SENTIMENT_PROPS } from './constant/sentiment-props';
import { SentimentProp } from './types/sentiment-prop';

import '@/shared/styles/index.css';

export interface CustomerSentimentProps {
  sentiment: { [key in Sentiment]?: string };
}

function CustomerSentiment(props: CustomerSentimentProps) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [parentRef, parentSize] = useParentSize();

  const sentimentLines: React.ReactNode[] = [];

  for (const [sentiment, sentimentProp] of Object.entries(SENTIMENT_PROPS) as [Sentiment, SentimentProp][]) {
    const value: string | undefined = props.sentiment[sentiment];
    sentimentLines.push(
      <div className={parentSize.width < WIDTH_BREAKPOINT ? 'group-values-item' : 'group-values-item-large'}>
        <div className="label">{sentimentProp.title}</div>
        <div className="value">{value ?? 'Unknown'}</div>
      </div>
    );
  }

  return (
    <div className="section-ticket-sentiment" ref={parentRef}>
      <div className="section-title">Sentiments</div>

      <div className={parentSize.width < WIDTH_BREAKPOINT ? 'group-values' : 'group-values-large'}>
        {sentimentLines.map((item) => item)}
      </div>
    </div>
  );
}

export default CustomerSentiment;
