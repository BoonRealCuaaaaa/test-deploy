import { Separator } from '@/shared/components/separator';

import CustomerSentiment from './components/customer-sentiment';
import { Sentiment } from './components/customer-sentiment/constant/sentiment';
import PurchasingPotential from './components/purchasing-potential';
import TicketOverview from './components/ticket-overview';
import TicketSummary from './components/ticket-summary';

import '@/shared/styles/index.css';

export interface TicketSidebarMainProps {
  sentiment: { [key in Sentiment]: string } | {};
  summary: string | undefined;
  commentsCount: number;
  averageResponseTime: string;
  lastMessageTime: string;
  purchasingPotential: {
    rating: string;
    reason: string;
  };
}

function TicketSidebarMain(props: TicketSidebarMainProps) {
  return (
    <div className="flex flex-col space-y-3">
      <TicketOverview
        commentsCount={props.commentsCount}
        averageResponseTime={props.averageResponseTime}
        lastMessageTime={props.lastMessageTime}
      />
      <Separator />
      <CustomerSentiment sentiment={props.sentiment} />
      <Separator />
      <PurchasingPotential {...props.purchasingPotential} />
      <Separator />
      <TicketSummary summaryContent={props.summary} />
    </div>
  );
}

export default TicketSidebarMain;
