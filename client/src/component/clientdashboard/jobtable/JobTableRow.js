import JobsPage from "../../jobmodel/JobsPage";

export const JobTableRow = ({ job,fetchQuotes }) => {
    return (
        <tr key={job?._id} className="border-b hover:bg-gray-50">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-semibold">
                        {job?.name?.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium">{job?.name}</p>
                        <p className="text-sm text-gray-500">{job?.email}</p>
                    </div>
                </div>
            </td>

            <td className="p-4">
                <p className="text-sm font-medium">Service</p>
                <p className="text-sm text-gray-600">{job?.service}</p>
            </td>

            <td className="p-4">
                <p className="text-sm font-medium">Submitted On</p>
                <p className="text-sm text-gray-600">
                    {job?.createdAt ? new Date(job?.createdAt).toLocaleDateString() : "—"}
                </p>
            </td>

            <td className="p-4">
                <p className="text-sm font-medium">Price</p>
                <p className="text-sm text-gray-600">{job?.price === 0 ? "Pending" : job?.price}</p>
            </td>

            <td className="p-4">
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-gray-600">{job?.address}</p>
            </td>

            <td className="p-4">
                <button className="bg-cyan-100 px-4 py-2 rounded-[20px] text-yellow-500 hover:underline text-sm font-medium mr-2">
                    Request
                </button>
            </td>

            <td className="p-4">
                <JobsPage btnName={"View Details"} jobs={job} fetchQuotes={fetchQuotes} />
            </td>
        </tr>
    );
};
