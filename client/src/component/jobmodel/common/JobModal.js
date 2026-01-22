import { ErrorBanner, LoadingOverlay } from "../shared/Shared";
import { EstimateForm } from "./EstimateForm";
import { JobInfo } from "./JobInfo";
import { ModalHeader } from "./ModalHeader";
import { OtherInfo } from "./OtherInfo";
import { PendingView } from "./PendingView";
import { UpcomingView } from "./UpcomingView";

const JobModal = ({
    isOpen,
    job,
    onClose,
    onInputChange,
    onSubmit,
    onSchedule,
    onMarkCompleted,
    loading,
    error,
    API_BASE_URL
}) => {
    if (!isOpen || !job) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative">
                <ModalHeader job={job} onClose={onClose} />

                {/* 🔹 Global loading overlay */}
                {loading && <LoadingOverlay />}

                <div className="p-6 space-y-6">
                    {error && <ErrorBanner message={error} />}

                    <JobInfo job={job} />
                    <OtherInfo job={job} />

                    {job.status === "pending" && <PendingView job={job} />}

                    {job.status === "upcoming" && (
                        <UpcomingView
                            job={job}
                            onInputChange={onInputChange}
                            onSchedule={onSchedule}
                            onMarkCompleted={onMarkCompleted}
                            loading={loading}
                            API_BASE_URL={API_BASE_URL}
                        />
                    )}

                    {job.status !== "pending" && job.status !== "upcoming" && (
                        <EstimateForm
                            job={job}
                            onInputChange={onInputChange}
                            onSubmit={onSubmit}
                            loading={loading}
                            API_BASE_URL={API_BASE_URL}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobModal;


