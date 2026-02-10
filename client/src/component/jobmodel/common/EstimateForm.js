import { Button, InfoCard, PhotoPreview } from "../shared/Shared";

export const EstimateForm = ({ job, onInputChange, onSubmit, API_BASE_URL, loading ,fetchQuotes}) => (
    <>
        <PhotoPreview photo={job.photo} API_BASE_URL={API_BASE_URL} />

        <InfoCard title="Send Estimate">
            <input
                type="number"
                name="price"
                value={job.price || ""}
                onChange={onInputChange}
                placeholder="Price ($)"
                className="border rounded px-3 py-2 w-full mb-3"
            />
            <textarea
                name="notes"
                value={job.notes || ""}
                onChange={onInputChange}
                rows={3}
                className="border rounded px-3 py-2 w-full mb-3"
            />

            <Button
                color="cyan"
                disabled={loading}
                onClick={onSubmit}
                fetchQuotes={fetchQuotes}
                className="px-4 py-2 bg-cyan-500 text-white rounded disabled:opacity-50"
            >
                {loading ? "Sending..." : "Send Estimate"}
            </Button>

        </InfoCard>
    </>
);
