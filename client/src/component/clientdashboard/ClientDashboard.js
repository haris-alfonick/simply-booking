import React, { useEffect, useState } from 'react'
import {
    Menu, X, Search, Bell, Calendar as CalendarIcon, Briefcase, Users, Settings, HelpCircle, Download, LayoutDashboard,
    Calendar, ChevronLeft, ChevronRight, User, Mail, Phone,
    CircleAlert
} from 'lucide-react';
import { API_BASE_URL, getQuotes } from '../api/Api';
import { showSuccess } from '../utils/toast';

const RenderDashboard = ({ setSelectedJob, quotes, jobsOverview, setCurrentView, setJobsView, page, setPage, setStatus, selectedJob,
    totalPages, isModalOpen, handleClose, getBase64Image, handleEditClick, handleInputChange, handleSubmit, user

}) => {

    return (
        <div className="space-y-6 w-5xl">

            {isModalOpen && selectedJob && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 p-8 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative">
                        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 pt-6 rounded-lg">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-semibold text-gray-800">{selectedJob.service}</h2>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                        {selectedJob.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{selectedJob.name}</p>
                            </div>
                            <button
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={handleClose}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="rounded-lg p-4 border">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Client Information</h3>

                                    <div className="space-y-2.5">
                                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                                            <User size={16} className="text-gray-400" />
                                            <span>{selectedJob.name}</span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                                            <Mail size={16} className="text-gray-400" />
                                            <span>{selectedJob.email}</span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                                            <Phone size={16} className="text-gray-400" />
                                            <span>{selectedJob.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg p-4 border">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Job Details</h3>

                                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span>Submitted: {new Date(selectedJob.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 border p-4 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">Other Information</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-600 block mb-1">Address</label>
                                        <div className="border rounded px-3 py-2 text-sm text-gray-700 h-16">
                                            {selectedJob.address}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-600 block mb-1">Problem description</label>
                                        <div className="border rounded px-3 py-2 text-sm text-gray-700 h-20">
                                            {selectedJob.details}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {selectedJob.status !== 'pending' ? <>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Uploaded Photos</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                                            <img
                                                src={`${API_BASE_URL}/quotes/image/${selectedJob.photo}`}
                                                alt={`Uploaded photo`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="my-6 border p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Send Estimate</h3>

                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-medium text-gray-600 block mb-1">Price ($)</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={selectedJob.price}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter estimate price"
                                                    className="w-full h-full rounded px-3 py-2 border text-sm text-gray-700"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-gray-600 block mb-1">Notes (Optional)</label>
                                                <textarea
                                                    name="notes"
                                                    value={selectedJob.notes}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full h-full rounded px-3 py-2 border text-sm text-gray-700"
                                                />
                                            </div>

                                            <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm">
                                                Send Estimate to Client
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </> : <>
                                <div className="mb-6 border p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Estimate Summary</h3>
                                    <div className="border rounded bg-gray-50 px-3 py-2 text-sm text-gray-700 h-20">

                                        <h1 className="text-lg font-semibold text-gray-800 mb-3">{selectedJob.price}</h1>
                                        {selectedJob.notes}
                                    </div>
                                    <div className="border rounded text-blue-500 flex items-center bg-blue-50 px-3 py-2 text-sm text-gray-700 mt-3 ">
                                        <CircleAlert className="w-4 h-4 me-2 text-blue-500" /> <p className='text-blue-500'>Waiting for client to accept the estimated</p>
                                    </div>
                                </div>
                            </>}




                        </div>
                    </div>
                </div>

            )}







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
                                            <button
                                                onClick={() => handleEditClick(job)}
                                                className="text-cyan-600 bg-blue-100 p-2 rounded-lg hover:underline text-sm"
                                            >
                                                View Details
                                            </button>
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

const RenderJobs = ({ quotes, stats, jobsView, setJobsView, page, setPage, status, setStatus, getBase64Image, totalPages,
    isModalOpen, handleClose, handleEditClick, handleInputChange, handleSubmit, selectedJob
}) => {


    return (
        <div className="space-y-6">

            {isModalOpen && selectedJob && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 p-8 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative">
                        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 pt-6 rounded-lg">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-semibold text-gray-800">{selectedJob.service}</h2>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                        {selectedJob.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{selectedJob.name}</p>
                            </div>
                            <button
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={handleClose}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="rounded-lg p-4 border">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Client Information</h3>

                                    <div className="space-y-2.5">
                                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                                            <User size={16} className="text-gray-400" />
                                            <span>{selectedJob.name}</span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                                            <Mail size={16} className="text-gray-400" />
                                            <span>{selectedJob.email}</span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                                            <Phone size={16} className="text-gray-400" />
                                            <span>{selectedJob.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg p-4 border">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Job Details</h3>

                                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span>Submitted: {new Date(selectedJob.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 border p-4 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">Other Information</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-600 block mb-1">Address</label>
                                        <div className="border rounded px-3 py-2 text-sm text-gray-700 h-16">
                                            {selectedJob.address}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-600 block mb-1">Problem description</label>
                                        <div className="border rounded px-3 py-2 text-sm text-gray-700 h-20">
                                            {selectedJob.details}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {selectedJob.status !== 'pending' ? <>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Uploaded Photos</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                                            <img
                                                src={`${API_BASE_URL}/quotes/image/${selectedJob.photo}`}
                                                alt={`Uploaded photo`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="my-6 border p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Send Estimate</h3>

                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-medium text-gray-600 block mb-1">Price ($)</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={selectedJob.price}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter estimate price"
                                                    className="w-full h-full rounded px-3 py-2 border text-sm text-gray-700"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-gray-600 block mb-1">Notes (Optional)</label>
                                                <textarea
                                                    name="notes"
                                                    value={selectedJob.notes}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full h-full rounded px-3 py-2 border text-sm text-gray-700"
                                                />
                                            </div>

                                            <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm">
                                                Send Estimate to Client
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </> : <>
                                <div className="mb-6 border p-4 b rounded-lg">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Estimate Summary</h3>
                                    <div className="border rounded bg-gray-50 px-3 py-2 text-sm text-gray-700 h-20">

                                        <h1 className="text-lg font-semibold text-gray-800 mb-3">{selectedJob.price}</h1>
                                        {selectedJob.notes}
                                    </div>
                                    <div className="border rounded text-blue-500 flex items-center bg-blue-50 px-3 py-2 text-sm text-gray-700 mt-3 ">
                                        <CircleAlert className="w-4 h-4 me-2 text-blue-500" /> <p className='text-blue-500'>Waiting for client to accept the estimated</p>
                                    </div>
                                </div>
                            </>}

                        </div>
                    </div>
                </div>



            )}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Jobs</h1>
                    <p className="text-gray-600">Manage all your service jobs in one place</p>
                </div>
                <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b flex flex-wrap gap-2">
                    <div className={`flex items-center px-4 gap-2 rounded-lg ${jobsView === 'request' ? 'bg-gray-200' : 'hover:bg-gray-50'}`}>
                        <div className={`w-2 h-2 rounded-full bg-blue-500`}></div>
                        <button onClick={() => { setJobsView('request'); setStatus("request") }} className={` py-2 text-sm `}>
                            Request Jobs ({stats.request})
                        </button>
                    </div>
                    <div className={`flex items-center px-4 gap-2 rounded-lg ${jobsView === 'pending' ? 'bg-gray-200' : 'hover:bg-gray-50'}`}>
                        <div className={`w-2 h-2 rounded-full bg-yellow-500`}></div>
                        <button onClick={() => { setJobsView('pending'); setStatus("pending") }} className={` py-2 text-sm `}>
                            Pending Jobs ({stats.pending})
                        </button>
                    </div>

                    <div className={`flex items-center px-4 gap-2 rounded-lg ${jobsView === 'upcoming' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                        <div className={`w-2 h-2 rounded-full bg-cyan-500`}></div>
                        <button onClick={() => { setJobsView('upcoming'); setStatus("upcoming") }} className={` py-2 text-sm `}>
                            Upcoming Jobs ({stats.upcoming})
                        </button>
                    </div>

                    <div className={`flex items-center px-4 gap-2 rounded-lg ${jobsView === 'completed' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                        <div className={`w-2 h-2 rounded-full bg-green-500`}></div>
                        <button onClick={() => { setJobsView('completed'); setStatus("completed") }} className={` py-2 text-sm `}>
                            Completed Jobs ({stats.completed})
                        </button>
                    </div>
                    <div className={`flex items-center px-4 gap-2 rounded-lg ${jobsView === 'cancelled' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                        <div className={`w-2 h-2 rounded-full bg-red-500`}></div>
                        <button onClick={() => { setJobsView('cancelled'); setStatus("cancelled") }} className={` py-2 text-sm `}>
                            Cancelled Jobs ({stats.cancelled})
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        {jobsView === 'request' && (

                            <tbody>

                                {quotes?.data
                                    ?.filter(job => job.status === "request")
                                    .map(job => (
                                        <tr key={job._id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-semibold">
                                                        {job.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{job.name}</p>
                                                        <p className="text-sm text-gray-500">{job.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Service</p>
                                                <p className="text-sm text-gray-600">{job.service}</p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Submitted On</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.createdAt
                                                        ? new Date(job.createdAt).toLocaleDateString()
                                                        : "—"}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Price</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.price === 0 ? "Pending" : job.price}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Location</p>
                                                <p className="text-sm text-gray-600">{job.address}</p>
                                            </td>

                                            <td className="p-4">
                                                <button className="bg-cyan-100 px-4 py-2 rounded-[20px] text-yellow-500 hover:underline text-sm font-medium mr-2">
                                                    Request
                                                </button>
                                            </td>

                                            <td className="p-4">
                                                <button
                                                    onClick={() => handleEditClick(job)}
                                                    className="text-cyan-600 bg-blue-100 p-2 rounded-lg hover:underline text-sm"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                            </tbody>
                        )}

                        {jobsView === 'pending' && (

                            <tbody>

                                {quotes?.data
                                    ?.filter(job => job.status === "pending")
                                    .map(job => (
                                        <tr key={job.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-semibold">
                                                        {job.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{job.name}</p>
                                                        <p className="text-sm text-gray-500">{job.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Service</p>
                                                <p className="text-sm text-gray-600">{job.service}</p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Submitted On</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.createdAt
                                                        ? new Date(job.createdAt).toLocaleDateString()
                                                        : "—"}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Price</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.price === 0 ? "Pending" : job.price}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Location</p>
                                                <p className="text-sm text-gray-600">{job.address}</p>
                                            </td>

                                            <td className="p-4">
                                                <button className="bg-cyan-100 px-4 py-2 rounded-[20px] text-yellow-500 hover:underline text-sm font-medium mr-2">
                                                    Request
                                                </button>
                                            </td>

                                            <td className="p-4">
                                                <button
                                                    onClick={() => handleEditClick(job)}
                                                    className="text-cyan-600 bg-blue-100 p-2 rounded-lg hover:underline text-sm"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                            </tbody>
                        )}

                        {jobsView === 'upcoming' && (

                            <tbody>

                                {quotes?.data
                                    ?.filter(job => job.status === "upcoming")
                                    .map(job => (
                                        <tr key={job.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-semibold">
                                                        {job.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{job.name}</p>
                                                        <p className="text-sm text-gray-500">{job.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Service</p>
                                                <p className="text-sm text-gray-600">{job.service}</p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Submitted On</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.createdAt
                                                        ? new Date(job.createdAt).toLocaleDateString()
                                                        : "—"}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Price</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.price === 0 ? "Pending" : job.price}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Location</p>
                                                <p className="text-sm text-gray-600">{job.address}</p>
                                            </td>

                                            <td className="p-4">
                                                <button className="bg-cyan-100 px-4 py-2 rounded-[20px] text-yellow-500 hover:underline text-sm font-medium mr-2">
                                                    Request
                                                </button>
                                            </td>

                                            <td className="p-4">
                                                <button
                                                    // onClick={() => setSelectedJob(job)}
                                                    onClick={() => handleEditClick(job)}
                                                    className="text-cyan-600 bg-blue-100 p-2 rounded-lg hover:underline text-sm"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                            </tbody>
                        )}

                        {jobsView === 'completed' && (

                            <tbody>

                                {quotes?.data
                                    ?.filter(job => job.status === "completed")
                                    .map(job => (
                                        <tr key={job.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-semibold">
                                                        {job.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{job.name}</p>
                                                        <p className="text-sm text-gray-500">{job.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Service</p>
                                                <p className="text-sm text-gray-600">{job.service}</p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Submitted On</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.createdAt
                                                        ? new Date(job.createdAt).toLocaleDateString()
                                                        : "—"}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Price</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.price === 0 ? "Pending" : job.price}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Location</p>
                                                <p className="text-sm text-gray-600">{job.address}</p>
                                            </td>

                                            <td className="p-4">
                                                <button className="bg-cyan-100 px-4 py-2 rounded-[20px] text-yellow-500 hover:underline text-sm font-medium mr-2">
                                                    Request
                                                </button>
                                            </td>

                                            <td className="p-4">
                                                <button
                                                    // onClick={() => setSelectedJob(job)}
                                                    onClick={() => handleEditClick(job)}
                                                    className="text-cyan-600 bg-blue-100 p-2 rounded-lg hover:underline text-sm"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                            </tbody>
                        )}

                        {jobsView === 'cancelled' && (

                            <tbody>

                                {quotes?.data
                                    ?.filter(job => job.status === "cancelled")
                                    .map(job => (
                                        <tr key={job.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-semibold">
                                                        {job.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{job.name}</p>
                                                        <p className="text-sm text-gray-500">{job.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Service</p>
                                                <p className="text-sm text-gray-600">{job.service}</p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Submitted On</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.createdAt
                                                        ? new Date(job.createdAt).toLocaleDateString()
                                                        : "—"}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Price</p>
                                                <p className="text-sm text-gray-600">
                                                    {job.price === 0 ? "Pending" : job.price}
                                                </p>
                                            </td>

                                            <td className="p-4">
                                                <p className="text-sm font-medium">Location</p>
                                                <p className="text-sm text-gray-600">{job.address}</p>
                                            </td>

                                            <td className="p-4">
                                                <button className="bg-cyan-100 px-4 py-2 rounded-[20px] text-yellow-500 hover:underline text-sm font-medium mr-2">
                                                    Request
                                                </button>
                                            </td>

                                            <td className="p-4">
                                                <button
                                                    // onClick={() => setSelectedJob(job)}
                                                    onClick={() => handleEditClick(job)}
                                                    className="text-cyan-600 bg-blue-100 p-2 rounded-lg hover:underline text-sm"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                            </tbody>
                        )}
                    </table>
                    <div className="flex justify-center gap-2 my-4">
                        <button className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200 flex items-center justify-center" onClick={() => setPage(page - 1)} disabled={page === 1}><ChevronLeft className="w-4 h-4" /></button>
                        <span className=" px-4 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200">Page {page} of {totalPages}</span>
                        <button className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

const RenderCalendar = ({ quotes, page, setPage, isModalOpen, setIsModalOpen, selectedJob, setSelectedJob }) => {
    const [currentDate, setCurrentDate] = useState(new Date());


    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const [calendarView, setCalendarView] = useState('day');

    const monthEvents = [
        { date: 18, time: '2:00 PM', service: 'HVAC Service', status: 'upcoming' },
        { date: 20, time: '10:50 AM', service: 'Pool Maintenance', status: 'upcoming' },
        { date: 22, time: '9:00 AM', service: 'Landscaping', status: 'upcoming' },
    ];


    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'];

    const appointments = [
        { id: 1, day: 6, time: '09:00 AM', name: 'ali Johnson', service: 'Landscaping', amount: 150, status: 'Upcoming' },
        { id: 2, day: 7, time: '10:00 AM', name: 'abid Johnson', service: 'Landscaping', amount: 160, status: 'Upcoming' },
        { id: 3, day: 8, time: '11:00 AM', name: 'asif Johnson', service: 'Landscaping', amount: 170, status: 'Upcoming' },
        { id: 4, day: 9, time: '12:00 PM', name: 'amir Johnson', service: 'Landscaping', amount: 200, status: 'Upcoming' },
    ];


    const days = [
        { name: 'Sun', date: 14 },
        { name: 'Mon', date: 15 },
        { name: 'Tue', date: 16 },
        { name: 'Wed', date: 17 },
        { name: 'Thu', date: 18 },
        { name: 'Fri', date: 19 },
        { name: 'Sat', date: 20 },
    ];

    const selectedDayIndex = 1;  // Monday



    const jobData = {
        title: 'Landscaping',
        status: 'Upcoming',
        clientName: 'Emma Davis',
        clientInfo: {
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '(555) 123-4567'
        },
        jobDetails: {
            submitted: '1/15/2024'
        },
        questionnaire: {
            propertySize: '3 bedroom house, ~2000 sqft',
            cleaningFrequency: 'One-time deep clean',
            specialRequirements: 'Pet-friendly products needed'
        },
        photos: [
            'https:images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop',
            'https:images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
        ]
    };




    return (
        <div className="space-y-6">
            {isModalOpen && (

                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 p-8 flex items-center justify-center ">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative">
                        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 pt-6 rounded-lg">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-semibold text-gray-800">{jobData.title}</h2>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                        {jobData.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{jobData.clientName}</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setIsModalOpen(!isModalOpen)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className=" rounded-lg p-4 border">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Client Information</h3>

                                    <div className="space-y-2.5">
                                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                                            <User size={16} className="text-gray-400" />
                                            <span>{jobData.clientInfo.name}</span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                                            <Mail size={16} className="text-gray-400" />
                                            <span>{jobData.clientInfo.email}</span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                                            <Phone size={16} className="text-gray-400" />
                                            <span>{jobData.clientInfo.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className=" rounded-lg p-4 border">
                                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Job Details</h3>

                                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span>Submitted: {jobData.jobDetails.submitted}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 border p-4 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">Other Information</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-600 block mb-1">Address</label>
                                        <div className="border rounded px-3 py-2 text-sm text-gray-700 h-16" rows={3}>
                                            {jobData.questionnaire.propertySize}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-600 block mb-1">Problem description</label>
                                        <div className="border rounded px-3 py-2 text-sm text-gray-700 h-20" rows={3}>
                                            {jobData.questionnaire.propertySize}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">Uploaded Photos</h3>

                                <div className="grid gird-col-2 sm:grid-cols-3  gap-4">
                                    {jobData.photos.map((photo, index) => (
                                        <div
                                            key={index}
                                            className="aspect-video bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                                        >
                                            <img
                                                src={photo}
                                                alt={`Uploaded photo ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="my-6 border p-4 rounded-lg">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">Send Estimate</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-600 block mb-1">Price ($)</label>
                                        {/* <div className="bg-gray-100 rounded px-3 py-2 text-sm text-gray-700"> */}
                                        <input placeholder='Enter estimate price ' className='w-full h-full rounded px-3 py-2 border text-sm text-gray-700' />                                        </div>
                                    {/* </div> */}

                                    <div>
                                        <label className="text-xs font-medium text-gray-600 block mb-1">Cleaning frequency</label>
                                        {/* <div className="w-full"> */}
                                        <textarea rows={3} className='w-full h-full rounded px-3 py-2 border text-sm text-gray-700' />
                                        {/* </div> */}
                                    </div>
                                    <button className='px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm'>Send Estimated to Client</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Calendar</h1>
                    <p className="text-gray-600">View and manage your scheduled jobs</p>
                </div>
                <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4 border-b flex flex-wrap gap-2">
                    <button
                        onClick={() => setCalendarView('day')}
                        className={`px-4 py-2 rounded-lg text-sm ${calendarView === 'day' ? 'bg-gray-200' : 'hover:bg-gray-50'}`}
                    >
                        Day
                    </button>
                    <button
                        onClick={() => setCalendarView('week')}
                        className={`px-4 py-2 rounded-lg text-sm ${calendarView === 'week' ? 'bg-gray-200' : 'hover:bg-gray-50'}`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setCalendarView('month')}
                        className={`px-4 py-2 rounded-lg text-sm ${calendarView === 'month' ? 'bg-gray-200' : 'hover:bg-gray-50'}`}
                    >
                        Month
                    </button>
                </div>

                {calendarView === 'day' && (
                    <div className="p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2></h2>
                            <div className="flex gap-2 items-center justify-center">
                                <button className="p-2 bg-gray-100 hover:bg-gray-100 rounded">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-lg font-semibold">Dec 14 - Dec 20, 2025</h2>

                                <button className="p-2 bg-gray-100 hover:bg-gray-100 rounded">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div className="space-y-2">
                            {timeSlots.map((time) => {
                                const appointment = quotes?.data.find((appt) => {
                                    const createdTime = new Date(appt.createdAt).toLocaleTimeString("en-GB", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });

                                    return createdTime === time;
                                });

                                return (
                                    <div key={time} className="flex items-center border-b py-3 ">
                                        {/* Time slot */}
                                        <span className="w-24 text-sm text-gray-600">{time}</span>

                                        {appointment && (
                                            <div className="flex-1 bg-white p-3 rounded ml-4 overflow-x-auto">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-center">
                                                        <p className="font-medium">{appointment.name}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {new Date(appointment.createdAt).toLocaleTimeString("en-GB", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </p>
                                                    </div>

                                                    <p className="text-sm text-gray-600">{appointment.service}</p>

                                                    <p className="font-medium text-green-600">
                                                        ${appointment.amount.toFixed(2)}
                                                    </p>

                                                    <span className="text-xs bg-cyan-100 text-cyan-600 px-2 py-1 rounded-full">
                                                        {appointment.price}
                                                    </span>

                                                    <button
                                                        className="ml-4 border px-2 py-1 rounded-lg text-cyan-600 hover:underline text-sm"
                                                        onClick={() => setIsModalOpen(!isModalOpen)}
                                                    >
                                                        View
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                )}

                {calendarView === 'week' && (
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2></h2>
                            <div className="flex gap-2 items-center justify-center">
                                <button className="p-2 bg-gray-100 hover:bg-gray-100 rounded">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-lg font-semibold">Dec 14 - Dec 20, 2025</h2>

                                <button className="p-2 bg-gray-100 hover:bg-gray-100 rounded">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {days.map((day, idx) => (
                                <div key={idx} className="text-center">
                                    <p className="text-sm font-medium text-gray-600">

                                    </p>

                                    <p
                                        className={`text-2xl font-bold mt-2 ${idx === selectedDayIndex
                                            ? 'text-white bg-cyan-500 w-10 h-10 flex items-center justify-center rounded-full mx-auto'
                                            : ''
                                            }`}
                                    >
                                        {day.date}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 grid grid-cols-7 gap-2">
                            {quotes?.data?.map((appt) => (
                                <div
                                    key={appt.id}
                                    className={` col-start-${appt.day} bg-green-50 border-green-500 p-3 rounded-lg border`}
                                    onClick={() => setIsModalOpen(!isModalOpen)}
                                >
                                    <p className="text-xs text-green-500 font-medium">
                                        {new Date(appt.createdAt).toLocaleTimeString("en-GB", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                    <p className="text-sm text-green-500 font-medium mt-1">{appt.name}</p>
                                    <p className="text-xs text-green-500 text-gray-600">{appt.service}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {calendarView === 'month' && (
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2></h2>
                            <div className="flex gap-2 items-center justify-center">
                                <button className="p-2 bg-gray-100 hover:bg-gray-100 rounded">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-lg font-semibold">January 2026</h2>

                                <button className="p-2 bg-gray-100 hover:bg-gray-100 rounded">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <div key={day} className="text-center font-medium text-sm text-gray-600 py-2">{day}</div>
                            ))}
                            {Array.from({ length: firstDay }).map((_, idx) => (
                                <div key={`empty-${idx}`} className="aspect-[6/2]"></div>
                            ))}
                            {Array.from({ length: daysInMonth }).map((_, idx) => {
                                const day = idx + 1;
                                const hasEvent = quotes?.data?.find(e => e.date === day);
                                return (
                                    <div key={day} className="aspect-[6/2] border rounded-lg p-2 hover:bg-gray-50" onClick={() => setIsModalOpen(!isModalOpen)}>
                                        <p className={`text-sm ${day === 20 ? 'bg-cyan-500 text-white w-6 h-6 flex items-center justify-center rounded-full' : ''}`}>
                                            {day}
                                        </p>
                                        {hasEvent && (
                                            <div className="mt-1">
                                                <p className="text-xs text-cyan-600 font-medium">
                                                    {new Date(hasEvent.createdAt).toLocaleTimeString("en-GB", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                                <p className="text-xs text-gray-600 truncate">{hasEvent.service}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
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

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedJob, setSelectedJob] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        address: '',
        details: '',
        photo: null,
        price: 0,
        notes: "",
        date: "",
        time: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quotes, setQuotes] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");


    const user = JSON.parse(localStorage.getItem("user"));

    // ////////////////////////////////////////////

    const handleEditClick = (job) => {
        console.log(job)
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedJob((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`${API_BASE_URL}/quotes/send-estimate/${selectedJob._id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                price: selectedJob.price,
                notes: selectedJob.notes,
            }),
        });

        showSuccess("Estimate sent to client");
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const getBase64Image = (image) => {
        if (!image || !image.data) return null;
        const base64String = btoa(
            new Uint8Array(image.data.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );

        return `data:${image.contentType};base64,${base64String}`;
    };

    const fetchQuotes = async () => {
        try {
            const res = await getQuotes({ businessId: "696b9741be003a82e3e253e8", page, limit: 10, status });
            console.log(res)
            setQuotes(res);
            setTotalPages(res.pagination.totalPages);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchQuotes() }, [page, status, currentView, jobsView]);

    useEffect(() => {
        if (search === null || search === "") { fetchQuotes() } else { handleSearch() }
    }, [search]);
    const handleSearch = async () => {
        let businessId = "696b9741be003a82e3e253e8"
        try {
            const response = await fetch(` http://localhost:5000/api/quotes/search?search=${search}&page=${page}&businessId=${businessId}`, {
                method: "GET"
            });
            const data = await response.json();
            if (!response.ok) {
                setQuotes(data);
                console.log(data.data)

            } else {
                setQuotes(data);
            }
        } catch (err) {
            setQuotes([]);
        }
    };

    const stats = {
        totalJobs: quotes?.pagination?.total, pending: quotes?.counts?.pending, upcoming: quotes?.counts?.upcoming,
        cancelled: quotes?.counts?.cancelled, completed: quotes?.counts?.completed, request: quotes?.counts?.request, clients: quotes?.pagination?.total,

    };

    const jobsOverview = [
        { label: 'Total Jobs', value: stats.totalJobs, icon: Calendar, color: 'bg-blue-50 text-blue-600', jobview: null },
        { label: 'Pending Jobs', value: stats.pending, icon: Calendar, color: 'bg-yellow-50 text-yellow-600', jobview: "pending" },
        { label: 'Upcoming', value: stats.upcoming, icon: Calendar, color: 'bg-cyan-50 text-cyan-600', jobview: "upcoming" },
        { label: 'Completed', value: stats.completed, icon: Calendar, color: 'bg-purple-50 text-purple-600', jobview: "completed" },
        // { label: 'Request', value: stats.request, icon: Calendar, color: 'bg-purple-50 text-purple-600', jobview: "request" },

    ]


    return (
        <>

            <div className='flex h-screen bg-gray-50'>

                <div className={`${sidebarOpen ? 'w-64' : 'w-0'}  transition-all duration-300 bg-white border-r overflow-hidden`}>
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
                            // { icon: Users, label: 'Clients', view: 'clients' },
                        ].map((item) => (
                            <button
                                key={item.view}
                                onClick={() => { setCurrentView(item.view); setStatus('') }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${currentView === item.view ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="absolute bottom-0 w-64 p-4 border-t">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg mb-1">
                            <Settings className="w-5 h-5" />
                            <span>Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                            <HelpCircle className="w-5 h-5" />
                            <span>Help Center</span>
                        </button>
                    </div>
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
                        {currentView === 'dashboard' && <RenderDashboard setSelectedJob={setSelectedJob} quotes={quotes} jobsOverview={jobsOverview} setCurrentView={setCurrentView}
                            setJobsView={setJobsView} page={page} setPage={setPage} setStatus={setStatus} selectedJob={selectedJob} totalPages={totalPages}
                            setIsModalOpen={setIsModalOpen} handleClose={handleClose} getBase64Image={getBase64Image} handleSubmit={handleSubmit} handleEditClick={handleEditClick}
                            handleInputChange={handleInputChange} isModalOpen={isModalOpen} user={user}


                        />}




                        {currentView === 'jobs' && <RenderJobs setSelectedJob={setSelectedJob} quotes={quotes} jobsOverview={jobsOverview} stats={stats} setStatus={setStatus}
                            jobsView={jobsView} setJobsView={setJobsView} page={page} setPage={setPage} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                            handleEditClick={handleEditClick} selectedJob={selectedJob} getBase64Image={getBase64Image} totalPages={totalPages}
                            handleClose={handleClose} handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}

                        />}




                        {currentView === 'calendar' && <RenderCalendar setSelectedClient={setSelectedClient} page={page} setPage={setPage} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedJob={selectedJob} />}
                        {/* {currentView === 'clients' && <RenderClients selectedClient={selectedClient} setSelectedClient={setSelectedClient} />} */}
                    </main>

                </div>

            </div>

        </>

    )
}

export default ClientDashboard