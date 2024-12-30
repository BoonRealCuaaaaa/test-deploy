export interface PurchasingPotentialProps {
  rating: string;
  reason: string;
}

function PurchasingPotential(props: PurchasingPotentialProps) {
  return (
    <div className="section-ticket-sentiment">
      <div className="section-title">Purchasing Potential</div>
      <div className="group-values">
        <div className="group-values-item">
          <div className="label font-semibold">Rating</div>
          <div className="value">{props.rating}</div>
        </div>
        <div className="group-values-item-breakline">
          <div className="label font-semibold">Reason</div>
          <div className="paragraph">{props.reason}</div>
        </div>
      </div>
    </div>
  );
}

export default PurchasingPotential;
