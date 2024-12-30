export interface TicketSummaryProps {
  summaryContent: string | undefined;
}

function TicketSummary(props: TicketSummaryProps) {
  return (
    <div className="section-ticket-sentiment">
      <div className="section-title">Summary</div>
      <div className="paragraph">{props.summaryContent ? props.summaryContent : 'No history'}</div>
    </div>
  );
}

export default TicketSummary;
