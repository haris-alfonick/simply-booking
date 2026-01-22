import { CircleAlert } from "lucide-react";
import { InfoCard } from "../shared/Shared";

export const PendingView = ({ job }) => (
  <InfoCard title="Estimate Summary">
    <h1 className="text-lg font-semibold">${job.price}</h1>
    <p className="text-sm">{job.notes}</p>

    <div className="flex items-center gap-2 bg-blue-50 p-2 rounded mt-3 text-blue-600">
      <CircleAlert size={16} />
      Waiting for client to accept the estimate
    </div>
  </InfoCard>
);
