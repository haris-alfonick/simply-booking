import { ChevronLeft, ChevronRight } from "lucide-react";

export const WeekView = ({ quotes = [], selectedDate, setSelectedDate }) => {

    const getStartOfWeek = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        d.setDate(d.getDate() - day);
        return d;
    };
    const start = getStartOfWeek(selectedDate);

    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
    });
    return (
        <div className="p-4">
            <div className="flex items-center justify-end mt-[-70px] mb-7">
                <button className='p-2 bg-gray-100 hover:bg-gray-100 rounded' onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))}>
                    <ChevronLeft className='w-5 h-5' />
                </button>
                <h2 className="mx-4 font-semibold">Week View</h2>
                <button className='p-2 bg-gray-100 hover:bg-gray-100 rounded' onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))}>
                    <ChevronRight className='w-5 h-5' />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {days.map((day) => {
                    const key = day.toISOString().split("T")[0];
                    const dayQuotes = quotes.filter(q => (q.date || q.createdAt.split("T")[0]) === key);

                    return (
                        <div key={key} className="border rounded p-2 rounded-lg">
                            <p className="ms-2 text-sm font-medium">{day.getDate()}</p>
                            {dayQuotes.map((q) => (
                                <div key={q._id} className="mt-1 bg-green-50 text-xs p-1 rounded">
                                    {q.time} &ensp;{q.name} &ensp;{q.service}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
