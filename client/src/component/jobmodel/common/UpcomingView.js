import { Calendar, CircleCheckBig } from "lucide-react";
import { Button, InfoCard, PhotoPreview } from "../shared/Shared";

export const UpcomingView = ({
    job,
    onInputChange,
    onSchedule,
    onMarkCompleted,
    API_BASE_URL,
    loading
}) => (
    <>
        <PhotoPreview photo={job.photo} API_BASE_URL={API_BASE_URL} />

        <InfoCard title="Schedule Job">
            <div className="bg-green-50 p-3 rounded text-green-600 mb-4">
                Client has accepted the estimate
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="date"
                    name="date"
                    value={job.date || ""}
                    onChange={onInputChange}
                    className="border rounded px-3 py-2"
                />
                <input
                    type="time"
                    name="time"
                    value={job.time || ""}
                    onChange={onInputChange}
                    className="border rounded px-3 py-2"
                />
            </div>

            <div className="flex gap-2 mt-4">
                <Button color="blue" icon={<Calendar size={16} />}
                    disabled={loading}
                    onClick={onSchedule}
                >
                    {loading ? "Updating..." : "Update Schedule"}
                </Button>
                <Button
                    color="green"
                    icon={<CircleCheckBig size={16} />}
                    disabled={loading}
                    onClick={onMarkCompleted}
                >
                    Mark Completed
                </Button>
            </div>
        </InfoCard>
    </>
);






