import { InfoCard, LabelValue } from "../shared/Shared";

export const OtherInfo = ({ job }) => (
    <InfoCard title="Other Information">
        <LabelValue label="Address" value={job.address} />
        <LabelValue label="Problem Description" value={job.details} />
    </InfoCard>
);
