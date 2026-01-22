import { Calendar, Mail, Phone, User } from "lucide-react";
import { InfoCard, InfoRow } from "../shared/Shared";

export const JobInfo = ({ job }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Client Information">
            <InfoRow icon={<User size={16} />} text={job.name} />
            <InfoRow icon={<Mail size={16} />} text={job.email} />
            <InfoRow icon={<Phone size={16} />} text={job.phone} />
        </InfoCard>

        <InfoCard title="Job Details">
            <InfoRow
                icon={<Calendar size={16} />}
                text={`Submitted: ${new Date(job.createdAt).toLocaleDateString()}`}
            />
        </InfoCard>
    </div>
);
