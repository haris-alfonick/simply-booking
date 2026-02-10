
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import JobsPage from "../../jobmodel/JobsPage";

export const DayView = ({ quotes = [], selectedDate, setSelectedDate, timeSlots, fetchQuotes }) => {
    const dayKey = selectedDate.toISOString().split("T")[0];

    const dayQuotes = quotes.filter((q) => (q.date || q.createdAt.split("T")[0]) === dayKey && q.status === "upcoming");

    return (
        <div className="p-4">
            <div className="flex items-center justify-end mt-[-70px] mb-7">
                <button className='p-2 bg-gray-100 hover:bg-gray-100 rounded' onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>
                    <ChevronLeft className='w-5 h-5' />
                </button>
                <h2 className="mx-4 font-semibold">
                    {selectedDate.toDateString()}
                </h2>
                <button className='p-2 bg-gray-100 hover:bg-gray-100 rounded' onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>
                    <ChevronRight className='w-5 h-5' />
                </button>
            </div>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <td className="text-sm text-gray-500 py-3 px-4">Time</td>
                        <td className="text-sm text-gray-500 py-3 px-4">Client</td>
                        <td className="text-sm text-gray-500 py-3 px-4">Service</td>
                        <td className="text-sm text-gray-500 py-3 px-4 text-end">Price</td>
                        <td className="text-sm text-gray-500 py-3 px-4 text-end ms-8">Status</td>
                        <td className="text-sm text-gray-500 py-3 px-4 text-end mr-4">Action</td>
                    </tr>
                </thead>

                <tbody>
                    {/* {timeSlots.map((time, idx) => {
                        const appt = dayQuotes.find((q) => q.time === time);
                        return (
                            <tr key={idx} className="border-b">
                                <td className="text-sm text-gray-500 py-3 px-4">{time}</td>
                                {appt && (
                                    <>
                                        <td className="text-sm font-medium py-3 px-4">{appt.name}</td>
                                        <td className="text-xs py-3 px-4">{appt.service}</td>
                                        <td className="text-sm text-end text-green-600 py-3 px-4">{appt.price}</td>
                                        <td className="text-sm text-end py-3 text-blue-500 items-center px-4"><span className='border border-blue-500 bg-blue-100 px-2 py-1 rounded-[16px]'>{appt.status}</span></td>
                                        <td className="text-sm text-end text-green-600 py-3 px-4"> <JobsPage btnName={"View"} jobs={appt} fetchQuotes={fetchQuotes} /></td>
                                    </>
                                )}
                            </tr>
                        );
                    })} */}

                    {timeSlots.map((time, idx) => {
                        const appts = dayQuotes.filter((q) => q.time === time);
                        return (
                            <tr key={idx} className="border-b">
                                <td className="text-sm text-gray-500 py-3 px-4">{time}</td>
                                {appts.length > 0 ? (
                                    appts.map((appt, apptIdx) => (
                                        <React.Fragment key={apptIdx}>
                                            <td className="text-sm font-medium py-3 px-4">{appt.name}</td>
                                            <td className="text-xs py-3 px-4">{appt.service}</td>
                                            <td className="text-sm text-end text-green-600 py-3 px-4">{appt.price}</td>
                                            <td className="text-sm text-end py-3 text-blue-500 items-center px-4">
                                                <span className="border border-blue-500 bg-blue-100 px-2 py-1 rounded-[16px]">
                                                    {appt.status}
                                                </span>
                                            </td>
                                            <td className="text-md text-end py-3 px-4">
                                                <JobsPage btnName={"View"} jobs={appt} fetchQuotes={fetchQuotes} />
                                            </td>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <td colSpan="5" className="text-center text-sm text-gray-400 py-3 px-4">No appointments</td>
                                )}
                            </tr>
                        );
                    })}


                </tbody>
            </table>
        </div>
    );
};
