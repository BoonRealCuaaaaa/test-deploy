import { SentimentProp } from '../types/sentiment-prop';

import { Sentiment } from './sentiment';

export const SENTIMENT_PROPS: { [key in Sentiment]: SentimentProp } = {
  [Sentiment.TONE]: {
    title: 'Customer tone',
  },
  [Sentiment.SATISFACTION]: {
    title: 'Customer satisfaction',
  },
  [Sentiment.URGENCY]: {
    title: 'Customer urgency',
  },
  [Sentiment.AGENT_TONE]: {
    title: 'Agent tone',
  },
};
