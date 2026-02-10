import React, { useEffect, useState } from 'react'
import {
    Menu, X, Search, Calendar as CalendarIcon, Briefcase, Users, Settings, HelpCircle, Download, LayoutDashboard,
    Calendar, ChevronLeft, ChevronRight, User, Mail, Phone, ArrowBigRight,
    Globe

} from 'lucide-react';
import ExportCSV from '../maindashboard/ExportCSV';
import { useNavigate } from 'react-router-dom'
import { getQuotes } from '../api/Api';
import JobsPage from '../jobmodel/JobsPage';
import { DayView } from './calander/DayView';
import { WeekView } from './calander/WeekView';
import { MonthView } from './calander/MonthView';
import { JobTableRow } from './jobtable/JobTableRow';
import CancellationForm from './CancellationForm';

const RenderDashboard = ({ quotes, jobsOverview, setCurrentView, setJobsView, setStatus, user, fetchQuotes }) => {
    return (
        <div className="space-y-6 w-5xl">

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800">Welcome Back, {user.fullname}</h1>
                <p className="text-gray-600 mt-1">Here's what happening with your SimplyBooking platform today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {jobsOverview.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className='ms-5'>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3 bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Recents Jobs</h2>
                        <button className="text-cyan-600 text-sm hover:underline" onClick={() => { setCurrentView('jobs'); setJobsView('request') }}>View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <tbody>
                                {quotes?.data?.map((job, idx) => {
                                    if (idx < 5) return <tr key={job._id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-semibold">
                                                    {job.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{job.name}</p>
                                                    <p className="text-sm text-gray-500">{job.service}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{job.address}<br />{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ""}</td>
                                        <td className="p-4 text-right">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-cyan-100 text-cyan-600'
                                                }`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <JobsPage btnName={"View Details"} jobs={job} fetchQuotes={fetchQuotes} />
                                        </td>

                                    </tr>
                                })}

                            </tbody>

                        </table>

                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">Jobs Overview</h2>
                    <div className="space-y-4">
                        {jobsOverview.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg cursor-pointer" onClick={() => { setCurrentView(item.jobview === null ? 'dashboard' : 'jobs'); setJobsView(item.jobview); setStatus(item.jobview === null ? '' : item.jobview) }}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full bg-${item.color}-500`}></div>
                                    <span className="text-sm">{item.label}</span>
                                </div>
                                <span className="font-semibold">{String(item.value).padStart(2, '0')}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t space-y-2">
                        <h2 className="text-lg font-semibold mb-4">Quick Action</h2>
                        <button className="w-full py-2 text-center bg-gray-50 rounded-lg text-sm hover:bg-gray-100 rounded flex items-center gap-2 px-2" onClick={() => setCurrentView('jobs')} >
                            <Users className="w-4 h-4" />
                            View Job Requests
                        </button>
                        <button className="w-full py-2 text-center bg-gray-50 rounded-lg text-sm hover:bg-gray-100 rounded flex items-center gap-2 px-2" onClick={() => setCurrentView('calendar')}>
                            <CalendarIcon className="w-4 h-4" />
                            Check Calendar
                        </button>
                        {/* <button className="w-full py-2 text-center bg-gray-100 rounded-lg text-sm hover:bg-gray-50 rounded flex items-center gap-2 px-2">
                            <Users className="w-4 h-4" />
                            Manage Clients
                        </button> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

const column = [{ label: "Name", key: "name" },
{ label: "email", key: "email" },
{ label: "service", key: "service" },
{ label: "Submited On", key: "name" },
{ label: "Price", key: "price" },
{ label: "Location", key: "address" },
{ label: "Status", key: "status" },]

const RenderJobs = ({ quotes, stats, jobsView, setJobsView, page, setPage, setStatus, totalPages, fetchQuotes }) => {

    const getJobStatusFilter = () => {
        switch (jobsView) {
            case 'request':
                return 'request';
            case 'pending':
                return 'pending';
            case 'upcoming':
                return 'upcoming';
            case 'completed':
                return 'completed';
            case 'cancelled':
                return 'cancelled';
            default:
                return '';
        }
    };

    const renderTableRows = () => {
        const filteredJobs = quotes?.data?.filter(job => job.status === getJobStatusFilter());
        return filteredJobs?.map(job => <JobTableRow key={job._id} job={job} fetchQuotes={fetchQuotes} />);
    };

    const renderJobStatusButton = (status, color, label, count) => (
        <div className={`flex items-center px-4 gap-2 rounded-lg ${jobsView === status ? 'bg-gray-200' : 'hover:bg-gray-50'}`}>
            <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
            <button onClick={() => { setJobsView(status); setStatus(status); setPage(1); }} className="py-2 text-sm ">
                {label} ({count})
            </button>
        </div>
    );





    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Jobs</h1>
                    <p className="text-gray-600">Manage all your service jobs in one place</p>
                </div>
                <ExportCSV allData={quotes.data} columns={column} filename={"Jobs"} btncolor={"cyan"} />
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b flex flex-wrap gap-2">
                    {renderJobStatusButton('request', 'blue', 'Request Jobs', stats.request)}
                    {renderJobStatusButton('pending', 'yellow', 'Pending Jobs', stats.pending)}
                    {renderJobStatusButton('upcoming', 'cyan', 'Upcoming Jobs', stats.upcoming)}
                    {renderJobStatusButton('completed', 'green', 'Completed Jobs', stats.completed)}
                    {renderJobStatusButton('cancelled', 'red', 'Cancelled Jobs', stats.cancelled)}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                    </table>

                    <div className="flex justify-center gap-2 my-4">
                        <button
                            className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}>
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="px-4 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages || totalPages === 0}>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RenderCalendar = ({ quotes, calendarView, setCalendarView, fetchQuotes, selectedDate, setSelectedDate, setDate }) => {

    const timeSlots = Array.from({ length: 24 }, (_, i) =>
        `${String(i).padStart(2, "0")}:00`
    );
    const today = new Date();

    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${year}-${month}`;



    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Calendar</h1>
                    <p className="text-gray-600">View and manage your scheduled jobs</p>
                </div>
                <ExportCSV allData={quotes.data} columns={column} filename={"Jobs"} btncolor={"cyan"} />
            </div>

            <div className="bg-white rounded-lg shadow-sm border">

                <div className="p-4 border-b flex gap-2">
                    {["day", "week", "month"].map((v) => (
                        <button
                            key={v}
                            onClick={() => {
                                setCalendarView(v);
                                setDate(formattedDate);
                                setSelectedDate(new Date());
                            }}
                            className={`px-4 py-2 rounded-lg text-sm capitalize ${calendarView === v ? "bg-gray-200" : "hover:bg-gray-50"}`}
                        >
                            {v}
                        </button>
                    ))}
                </div>

                {calendarView === "day" && (
                    <DayView
                        timeSlots={timeSlots}
                        quotes={quotes?.data}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        fetchQuotes={fetchQuotes}
                    />
                )}

                {calendarView === "week" && (
                    <WeekView
                        quotes={quotes?.data}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                )}

                {calendarView === "month" && (
                    <MonthView
                        quotes={quotes?.data}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                )}
            </div>


        </div>
    );
};


// const RenderClients = ({setSelectedClient}) => {
//     const [activeTab, setActiveTab] = useState('pending');
//     const [isclientVisible, setisclientVisible] = useState(false);


//     const clients = [
//         {id: 1, name: 'Sarah Johnson', company: 'Techcorp Industries', email: 'sarah.j@email.com', phone: '(555) 123-4567', services: ['Home Cleaning', 'Window Washing'], totalJobs: 5, memberSince: '2023' }
//     ];


//     const clientData = {
//         name: 'Sarah Johnson',
//         company: 'Techcorp Industries',
//         email: 'sarah.j@email.com',
//         phone: '(555) 123-4567',
//         totalJobs: 5,
//         memberSince: '2023',
//         services: ['Home Cleaning', 'Window Washing']
//     };

//     const jobs = [
//         {id: 1, service: 'Home Cleaning', date: '2024-01-15', status: 'pending' },
//         {id: 2, service: 'Home Cleaning', date: '2024-01-15', status: 'pending' },
//         {id: 3, service: 'Home Cleaning', date: '2024-01-15', status: 'pending' },
//         {id: 4, service: 'Window Washing', date: '2024-01-10', status: 'upcoming' },
//         {id: 5, service: 'Home Cleaning', date: '2023-12-20', status: 'past' }
//     ];

//     const filteredJobs = jobs.filter(job => {
//         if (activeTab === 'pending') return job.status === 'pending';
//         if (activeTab === 'upcoming') return job.status === 'upcoming';
//         if (activeTab === 'past') return job.status === 'past';
//         return true;
//     });


//     return (
//         <div className="space-y-6">
//             {isclientVisible && (

//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-50 p-8 flex items-center justify-center">
//                     <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative">
//                         <div className="flex items-center justify-between px-6 pt-6">
//                             <h2 className="text-xl font-semibold text-gray-800">Client Profile</h2>
//                             <button className="text-black-400 hover:text-black-600 transition-colors"
//                                 onClick={() => setisclientVisible(!isclientVisible)}>
//                                 <X size={24} />
//                             </button>
//                         </div>

//                         <div className="p-6">
//                             <div className="flex items-start space-x-4 mb-6 border rounded-lg p-4">
//                                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                                     <User className="text-blue-500" size={24} />
//                                 </div>

//                                 <div className="flex-1">
//                                     <h3 className="text-lg font-semibold text-gray-800">{clientData.name}</h3>
//                                     <p className="text-sm text-gray-500 mb-4">{clientData.company}</p>

//                                     <div className="grid grid-cols-2 gap-4 mb-4">
//                                         <div className="flex items-center space-x-2 text-sm text-gray-600">
//                                             <Mail size={16} className="text-gray-400" />
//                                             <span>{clientData.email}</span>
//                                         </div>

//                                         <div className="flex items-center space-x-2 text-sm text-gray-600">
//                                             <Briefcase size={16} className="text-gray-400" />
//                                             <span>{clientData.totalJobs} total jobs</span>
//                                         </div>
//                                     </div>

//                                     <div className="grid grid-cols-2 gap-4 mb-4">
//                                         <div className="flex items-center space-x-2 text-sm text-gray-600">
//                                             <Phone size={16} className="text-gray-400" />
//                                             <span>{clientData.phone}</span>
//                                         </div>

//                                         <div className="flex items-center space-x-2 text-sm text-gray-600">
//                                             <Calendar size={16} className="text-gray-400" />
//                                             <span>Member since {clientData.memberSince}</span>
//                                         </div>
//                                     </div>

//                                     <div className="flex flex-wrap gap-2">
//                                         {clientData.services.map(service => (
//                                             <span
//                                                 key={service}
//                                                 className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
//                                             >
//                                                 {service}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="mb-6">
//                                 <div className="flex space-x-1  mb-4">
//                                     {['pending', 'upcoming', 'past'].map(tab => (
//                                         <button
//                                             key={tab}
//                                             onClick={() => setActiveTab(tab)}
//                                             className={`px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === tab
//                                                 ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
//                                                 : 'text-gray-500 hover:text-gray-700'
//                                                 }`}
//                                         >
//                                             {tab} Jobs
//                                         </button>
//                                     ))}
//                                 </div>

//                                 <div className="space-y-3 max-h-64 overflow-y-auto">
//                                     {filteredJobs.length === 0 ? (
//                                         <p className="text-sm text-gray-400 text-center py-8">No jobs in this category</p>
//                                     ) : (
//                                         filteredJobs.map(job => (
//                                             <div key={job.id} className="flex items-center border justify-between p-3  rounded-lg hover:bg-gray-100 transition-colors">
//                                                 <div>
//                                                     <p className="font-medium text-gray-800">{job.service}</p>
//                                                     <p className="text-sm text-gray-500">Submitted : {job.date}</p>
//                                                 </div>
//                                                 <button className="text-blue-500 bg-blue-100 rounded-[20px] px-2 py-1  text-sm font-medium hover:text-blue-600 transition-colors">
//                                                     Request
//                                                 </button>
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             )}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                 <div>
//                     <h1 className="text-2xl font-bold">Clients</h1>
//                     <p className="text-gray-600">Manage your client relationships</p>
//                 </div>
//                 <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-2">
//                     <Download className="w-4 h-4" />
//                     Export CSV
//                 </button>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm p-4">
//                 <div className="flex gap-4 mb-4">
//                     <div className="flex-1">
//                         <input type="text" placeholder="Search clients..." className="w-full px-4 py-2 border rounded-lg" />
//                     </div>
//                     <select className="px-4 py-2 border rounded-lg">
//                         <option value="">All Services</option>

//                         {[...new Set(clients.flatMap(client => client.services))].map(
//                             (service, index) => (
//                                 <option key={index} value={service}>
//                                     {service}
//                                 </option>
//                             )
//                         )}
//                     </select>


//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {Array(6).fill(clients[0]).map((client, idx) => (
//                         <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//                             <div className="flex items-start gap-3 mb-4">
//                                 <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-semibold text-lg">
//                                     {client.name.charAt(0)}
//                                 </div>
//                                 <div className="flex-1">
//                                     <h3 className="font-semibold">{client.name}</h3>
//                                     <p className="text-sm text-gray-600">{client.company}</p>
//                                 </div>
//                             </div>
//                             <div className="space-y-2 text-sm mb-4">
//                                 <p className="text-gray-600">{client.email}</p>
//                                 <p className="text-gray-600">{client.phone}</p>
//                             </div>
//                             <div className="flex gap-2 mb-4">
//                                 {client.services.map((service, i) => (
//                                     <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{service}</span>
//                                 ))}
//                             </div>
//                             <div className="flex items-center justify-between pt-4 border-t">
//                                 <span className="text-sm text-gray-600">📋 {client.totalJobs} jobs</span>
//                                 <button
//                                     onClick={() => {
//                                         setSelectedClient(client);
//                                         setisclientVisible(!isclientVisible)
//                                     }}
//                                     className="text-cyan-600 hover:underline text-sm font-medium">
//                                     View Profile
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// };


const ClientDashboard = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [jobsView, setJobsView] = useState('request');
    const [calendarView, setCalendarView] = useState('day');

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [quotes, setQuotes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());


    //   const today = new Date();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const year = selectedDate.getFullYear();
    const formattedDate = `${year}-${month}`;
    const [date, setDate] = useState(`${formattedDate}`);


    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => { fetchQuotes() }, [page, currentView, status, jobsView, search, selectedDate, date]);
    const fetchQuotes = async () => {
        try {
            const res = await getQuotes({
                search,
                page,
                status,
                limit: currentView === "calendar" ? 30 : 10,
                date: date
            });

            // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            // if (!res.ok) {
            //     // await delay(1000); 
            //     navigate('/');
            //     return;
            // }
            // console.log(currentView === "calendar" ? 30 : 10,'data fetched with limit');
            // console.log(formattedDate, "selected date")
            setQuotes(res || []);
            setTotalPages(res.pagination?.totalPages || 0);

        } catch (err) {
            console.error('Failed to fetch quotes:', err);
        }
    };

    // Stats for the dashboard view
    const stats = {
        totalJobs: quotes?.pagination?.total,
        pending: quotes?.counts?.pending,
        upcoming: quotes?.counts?.upcoming,
        cancelled: quotes?.counts?.cancelled,
        completed: quotes?.counts?.completed,
        request: quotes?.counts?.request,
        clients: quotes?.pagination?.total,
    };

    // Job overview cards
    const jobsOverview = [
        { label: 'Total Jobs', value: stats.totalJobs, icon: Calendar, color: 'bg-blue-50 text-blue-600', jobview: null },
        { label: 'Pending Jobs', value: stats.pending, icon: Calendar, color: 'bg-yellow-50 text-yellow-600', jobview: "pending" },
        { label: 'Upcoming', value: stats.upcoming, icon: Calendar, color: 'bg-cyan-50 text-cyan-600', jobview: "upcoming" },
        { label: 'Completed', value: stats.completed, icon: Calendar, color: 'bg-purple-50 text-purple-600', jobview: "completed" },
    ];

    return (
        <>
            <div className='flex h-screen bg-gray-50'>
                <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r overflow-hidden`}>
                    <div className="p-6">
                        <h1 className="text-xl font-bold text-cyan-600">Simplybooking</h1>
                        <p className="text-xs text-gray-500">Admin Dashboard</p>
                        <hr className='mt-1' />
                    </div>

                    <nav className="px-4 space-y-1">
                        <p className="text-xs font-semibold text-gray-400 px-3 mb-2">MAIN</p>
                        {[
                            { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
                            { icon: Briefcase, label: 'Jobs', view: 'jobs' },
                            { icon: CalendarIcon, label: 'Calendar', view: 'calendar' },
                            { icon: Globe, label: 'Close Business', view: 'closebusiness' },
                        ].map((item) => (
                            <button
                                key={item.view}
                                onClick={() => { setStatus(item.view === "jobs" ? "request" : ""); setCurrentView(item.view); setJobsView("request"); setDate(item.view !== "calendar" ? "" : formattedDate) }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${currentView === item.view ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        ))}

                        {/* <button
                            key={item.view}
                            onClick={() => { navigate(`/service/${quotes?.domain || 'default'}`) }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${currentView === "service" ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            
                        >
                            <Service className="w-5 h-5" />
                            <span>View Service</span>
                        </button> */}


                    </nav>

                    {sidebarOpen && (<div className="absolute bottom-0 w-64 p-4 border-t cursor-pointer">
                        <button onClick={() => {
                            localStorage.removeItem("user"); localStorage.removeItem("token"); localStorage.removeItem('expiresAt'); navigate('/login')
                        }} className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mb-1">
                            <ArrowBigRight className="w-5 h-5" />
                            <span>Log Out</span>
                        </button>
                    </div>)}
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-white border-b px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
                                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </button>
                                <div className="relative hidden md:block">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search clients, bookings..."
                                        className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-medium">{user.fullname}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                                        {user.fullname[0]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-auto p-6">
                        {currentView === 'dashboard' && <RenderDashboard quotes={quotes} jobsOverview={jobsOverview} setCurrentView={setCurrentView} setJobsView={setJobsView}
                            page={page} setPage={setPage} setStatus={setStatus} totalPages={totalPages} user={user} fetchQuotes={fetchQuotes} />}
                        {currentView === 'jobs' && <RenderJobs quotes={quotes} jobsOverview={jobsOverview} stats={stats} setStatus={setStatus} jobsView={jobsView} setJobsView={setJobsView}
                            page={page} setPage={setPage} totalPages={totalPages} fetchQuotes={fetchQuotes} />}
                        {currentView === 'calendar' && <RenderCalendar quotes={quotes} setSelectedClient={setSelectedClient} calendarView={calendarView} setCalendarView={setCalendarView}
                            fetchQuotes={fetchQuotes} selectedDate={selectedDate} setSelectedDate={setSelectedDate} formattedDate={formattedDate} setDate={setDate} />}
                        {currentView === 'closebusiness' && <CancellationForm quotes={quotes} fetchQuotes={fetchQuotes} />}

                    </main>
                </div>
            </div>
        </>
    );
}

export default ClientDashboard;



