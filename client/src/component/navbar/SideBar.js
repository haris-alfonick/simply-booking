import { Bell, Briefcase, CalendarIcon, HelpCircle, LayoutDashboard, Menu, Search, Settings, Users, X } from 'lucide-react';
import React, { useState } from 'react'

const SideBar = () => {

    const [currentView, setCurrentView] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const user = { name: 'Admin User', email: "admin@simplybooking.com" }

    return (
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
                        { icon: Users, label: 'Clients', view: 'clients' },
                    ].map((item) => (
                        <button
                            key={item.view}
                            onClick={() => setCurrentView(item.view)}
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
                            {/* <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
                                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button> */}
                            <div className="relative hidden md:block">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search clients, bookings..."
                                    className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {user.name[0]}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

        </div>
    )
}

export default SideBar