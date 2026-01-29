import { X } from "lucide-react";

export const ModalHeader = ({ job, onClose }) => (
    <div className="sticky top-0 bg-white z-10 flex justify-between px-6 pt-6">
        <div>
            <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">{job.service}</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {job.status}
                </span>
            </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
        </button>
    </div>
);
