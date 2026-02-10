import { ChevronLeft, ChevronRight } from "lucide-react";

export const MonthView = ({ quotes = [], selectedDate, setSelectedDate }) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // console.log("quotes", quotes);
    // console.log("firstDay", firstDay);
    // console.log("daysInMonth", daysInMonth);

    return (
        <div className="p-4">
            <div className="flex items-center justify-end mt-[-70px] mb-7">
                <button className='p-2 bg-gray-100 hover:bg-gray-100 rounded' onClick={() => setSelectedDate(new Date(year, month - 1, 1))}>
                    <ChevronLeft className='w-5 h-5' />
                </button>
                <h2 className="mx-4 font-semibold mx-2">
                    {selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}
                </h2>
                <button className='p-2 bg-gray-100 hover:bg-gray-100 rounded' onClick={() => setSelectedDate(new Date(year, month + 1, 1))}>
                    <ChevronRight className='w-5 h-5' />
                </button>
            </div>


            <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                    <div key={d} className="text-center font-medium text-sm">{d}</div>
                ))}

                {Array.from({ length: firstDay }).map((_, i) => <div key={i} />)}

                {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const events = quotes.filter(q => (q.date || q.createdAt.split("T")[0]) === key && q.status === "upcoming");
                    // const events = quotes.filter(q => q.date === key);

                    return (
                        <div key={day} className="border rounded p-2 rounded-lg">
                            <p className="text-sm font-medium">{day}</p>
                            {events.map(e => (
                                <p key={e._id} className="text-xs text-cyan-600 truncate">
                                    {e.time} -{e.name}- {e.service}
                                </p>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

