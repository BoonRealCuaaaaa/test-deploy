import { TicketOverviewProps } from './types/overview-props';

function TicketOverview(props: TicketOverviewProps) {
  return (
    <div className="section-ticket-sentiment">
      <h2 className="section-title">Overview</h2>
      <div className="group-values">
        <div className="group-values-item">
          <div className="label">Total messages</div>
          <div className="value">{props.commentsCount}</div>
        </div>
        <div className="group-values-item">
          <div className="label">Last message by agent</div>
          <div className="value">{props.lastMessageTime === '0s' ? '--' : props.lastMessageTime}</div>
        </div>
        {props.averageResponseTime !== '0s' && (
          <div className="group-values-item">
            <div className="label">Average response time</div>
            <div className="value">{props.averageResponseTime}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketOverview;
