import React from 'react'
import { Menu, X, Search, Bell, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Briefcase, Users, Settings, HelpCircle, Download } from 'lucide-react';

import Layout from '../navbar/Layout'

const ClientDashboard = () => {

    const jobs = [
        { id: 1, client: 'Emma Davis', email: 'sarah.j@email.com', service: 'Plumbing Repair', location: 'Los Angeles, CA', date: '2025-12-30', status: 'Cancelled', price: '$450' },
        { id: 2, client: 'Emma Davis', email: 'sarah.j@email.com', service: 'Home Cleaning', location: 'Los Angeles, CA', date: '2025-12-30', status: 'Request', price: '$450' },
        { id: 3, client: 'John Doe', email: 'Doe.j@email.com', service: 'Lawn Care', location: 'Los Angeles, CA', date: '2025-01-15', status: 'Pending', price: '$150' },
    ];

    const jobsOverview = [
        { type: 'Job Requests', count: 2, color: 'blue' },
        { type: 'Pending Jobs', count: 2, color: 'yellow' },
        { type: 'Upcoming Jobs', count: 2, color: 'cyan' },
        { type: 'Completed', count: 2, color: 'green' },
        { type: 'Cancelled', count: 2, color: 'red' },
    ];
    const stats = { totalJobs: 8, pendingJobs: 8, upcoming: 8, clients: 8 };


    return (
        <Layout>
            <div className="space-y-6 w-5xl">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Admin</h1>
                    <p className="text-gray-600 mt-1">Here's what happening with your SimplyBooking platform today</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Jobs', value: stats.totalJobs, icon: Briefcase, color: 'bg-blue-50 text-blue-600' },
                        { label: 'Pending Jobs', value: stats.pendingJobs, icon: Briefcase, color: 'bg-yellow-50 text-yellow-600' },
                        { label: 'Upcoming', value: stats.upcoming, icon: Briefcase, color: 'bg-cyan-50 text-cyan-600' },
                        { label: 'clients', value: stats.clients, icon: Briefcase, color: 'bg-purple-50 text-purple-600' },
                    ].map((stat, idx) => (
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Recents Jobs</h2>
                            <button className="text-cyan-600 text-sm hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <tbody>
                                    {jobs.map((job) => (
                                        <tr key={job.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-semibold">
                                                        {job.client.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{job.client}</p>
                                                        <p className="text-sm text-gray-500">{job.service}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600">{job.location}<br />{job.date}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-cyan-100 text-cyan-600'
                                                    }`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button 
                                                // onClick={() => setSelectedJob(job)}
                                                 className="text-cyan-600 bg-blue-100 p-2 rounded-lg hover:underline text-sm">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Jobs Overview</h2>
                        <div className="space-y-4">
                            {jobsOverview.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full bg-${item.color}-500`}></div>
                                        <span className="text-sm">{item.type}</span>
                                    </div>
                                    <span className="font-semibold">{String(item.count).padStart(2, '0')}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t space-y-2">
                            <h2 className="text-lg font-semibold mb-4">Quick Action</h2>
                            <button className="w-full py-2 text-center bg-gray-100 rounded-lg text-sm hover:bg-gray-50 rounded flex items-center gap-2 px-2">
                                <Users className="w-4 h-4" />
                                View Job Requests
                            </button>
                            <button className="w-full py-2 text-center bg-gray-100 rounded-lg text-sm hover:bg-gray-50 rounded flex items-center gap-2 px-2">
                                <CalendarIcon className="w-4 h-4" />
                                Check Calendar
                            </button>
                            <button className="w-full py-2 text-center bg-gray-100 rounded-lg text-sm hover:bg-gray-50 rounded flex items-center gap-2 px-2">
                                <Users className="w-4 h-4" />
                                Manage Clients
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default ClientDashboard