import React, { useState, useMemo } from 'react';
import {
  Search, Download, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Menu, X, Bell, Calendar as CalendarIcon, Briefcase,
  Users, Settings, HelpCircle, LayoutDashboard, Mail, Phone, Clock, CircleX,
  UserPlus, CreditCard, Eye, Subscript, TrendingUp,
  Calendar,
} from 'lucide-react';

const Header = ({ user, title, subtitle, color }) => (
  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 mb-4 rounded-lg">
    <h1 className="text-2xl font-bold text-gray-800">{title} {user.fullname}</h1>
    <p className="text-gray-600 mt-1">{subtitle}</p>
  </div>
)

const DataTable = ({ columns, data, filters = [], onExport, searchable = true, title, subtitle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = searchable ?
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        ) : true;

      const matchesFilters = filters.every(filter => {
        const filterValue = filterValues[filter.key];
        if (!filterValue || filterValue === 'all') return true;
        return item[filter.key] === filterValue;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, filterValues, filters, searchable]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className=" bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {(title || subtitle) && (
        <div className="">
          {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      <div className="py-4 border-b border-gray-200 flex flex-wrap gap-3">
        {searchable && (
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {filters.map(filter => (
          <select
            key={filter.key}
            value={filterValues[filter.key] || 'all'}
            onChange={(e) => setFilterValues(prev => ({ ...prev, [filter.key]: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{filter.label}</option>
            {filter.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}

        {onExport && (
          <button
            onClick={onExport}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>

              {columns.map(col => (
                <th key={col.key} className={`${col.label.type === Number ? "text-end" : "text-start"} px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icons: Icon, label, value, difference, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>

        <div className="p-3 rounded-lg text-green-500 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" /> 12.5%
        </div>
      </div>
      <div>
        <p className="text-md text-gray-500">{label}</p>

        <div className="flex items-center">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm text-gray-500 ms-2 mt-3">{difference} &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</p>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Paid: 'bg-green-100 text-green-800',
    Trial: 'bg-yellow-100 text-yellow-800',
    Active: 'bg-green-100 text-green-800',
    Expiring: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const user = JSON.parse(localStorage.getItem("user"));

  const dashboardStats = [
    { label: 'Clients on Paid Subscription', value: '1,284', change: '+12.5%', trend: 'up', icons: CreditCard, difference: "vs last month" },
    { label: 'Trial Clients (7-day)', value: '156', change: '+8.2%', trend: 'up', icons: Clock, difference: "vs last month" },
    { label: 'Total Site Visits', value: '52.4k', change: '+23.1%', trend: 'up', icons: Calendar, difference: "this month" },
    { label: 'Total Bookings Made', value: '8,972', change: '+15.3%', trend: 'up', icons: CircleX, difference: "life time Booking" }
  ];

  const allClientsData = [
    { name: 'Wellness Studio Pro', email: 'contact@wellnesspro.com', status: 'Paid', startDate: 'Jan 15, 2024', location: 'New York, NY', bookings: 342, lastLogin: '2 hours ago' },
    { name: 'Fitness First NYC', email: 'admin@fitnessfirst.com', status: 'Paid', startDate: 'Feb 02, 2024', location: 'Brooklyn, NY', bookings: 289, lastLogin: '1 day ago' },
    { name: 'Zen Yoga Center', email: 'info@zenyoga.com', status: 'Trial', startDate: 'Dec 01, 2024', location: 'Los Angeles, CA', bookings: 45, lastLogin: '5 hours ago' },
    { name: 'Peak Performance Gym', email: 'team@peakgym.com', status: 'Paid', startDate: 'Mar 10, 2024', location: 'Chicago, IL', bookings: 198, lastLogin: '3 days ago' },
    { name: 'Mindful Massage Spa', email: 'hello@mindfulspa.com', status: 'Trial', startDate: 'Dec 03, 2024', location: 'Miami, FL', bookings: 23, lastLogin: '1 hour ago' }
  ];

  const trialClientsData = [
    { name: 'Serenity Spa', email: 'Hello@serenityspa.com', location: 'Los Angeles, CA', expires: 'Dec 30, 2025', bookings: 67, daysLeft: '1 day left' },
    { name: 'Core Fitness Pro', email: 'Info@corefitness.com', location: 'Miami, FL', expires: 'Dec 31, 2025', bookings: 45, daysLeft: '2 days left' },
    { name: 'Harmony Wellness', email: 'contact@harmony.com', location: 'Austin, TX', expires: 'Jan 02, 2026', bookings: 32, daysLeft: '5 days left' },
    { name: 'Harmony Wellness', email: 'contact@harmony.com', location: 'Austin, TX', expires: 'Jan 02, 2026', bookings: 32, daysLeft: '5 days left' },

  ];

  const cancellationsData = [
    { name: 'Sarah Johnson', email: 'sarah@example.com', cancelDate: 'Dec 30, 2025', reason: 'Budget constraints', billing: '$49/month', usage: 'Low Usage' },
    { name: 'Michael Chen', email: 'michael@example.com', cancelDate: 'Dec 29, 2025', reason: 'Switching providers', billing: '$99/month', usage: 'Medium Usage' },
    { name: 'Emma Wilson', email: 'emma@example.com', cancelDate: 'Dec 28, 2025', reason: 'Business closed', billing: '$49/month', usage: 'Low Usage' }
  ];

  const allClientsColumns = [
    { key: 'name', label: 'Client Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />
    },
    { key: 'startDate', label: 'Start Date' },
    { key: 'location', label: 'Location' },
    { key: 'bookings', label: 'Total Bookings' },

    { key: 'lastLogin', label: 'Last Login' },
    {
      key: 'actions',
      label: 'Actions',
      render: () => <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
    }
  ];

  const trialClientsColumns = [
    { key: 'name', label: 'Client Name' },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
    { key: 'expires', label: 'Date Left' },
    { key: 'bookings', label: 'Bookings' },
    {
      key: 'daysLeft',
      label: 'Status',
      render: (val) => <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">{val}</span>
    }
  ];

  const cancellationsColumns = [
    { key: 'name', label: 'Client Name' },
    { key: 'email', label: 'Email' },
    { key: 'cancelDate', label: 'Cancel Date' },
    { key: 'reason', label: 'Reason' },
    { key: 'billing', label: 'Last Billing' },
    {
      key: 'usage',
      label: 'Usage',
      render: (val) => <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">{val}</span>
    }
  ];

  const allClientsFilters = [
    {
      key: 'status',
      label: 'All Status',
      options: [
        { value: 'Paid', label: 'Paid' },
        { value: 'Trial', label: 'Trial' }
      ]
    },
    {
      key: 'location',
      label: 'All Locations',
      options: [
        { value: 'New York, NY', label: 'New York, NY' },
        { value: 'Los Angeles, CA', label: 'Los Angeles, CA' },
        { value: 'Chicago, IL', label: 'Chicago, IL' },
        { value: 'Miami, FL', label: 'Miami, FL' }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
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
            { icon: Users, label: 'All Clients', view: 'clients' },
            { icon: Clock, label: 'Trial Clients', view: 'trials' },
            { icon: CircleX, label: 'Cancelations', view: 'cancellations' },

          ].map((item) => (
            <button
              key={item.view}
              onClick={() => setActiveTab(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.view ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}

          <p className="text-xs font-semibold text-gray-400 px-3 mb-2">ANALYTICS</p>

          {[
            { icon: UserPlus, label: 'New Trail Users', view: 'newtrialusers' },
            { icon: CreditCard, label: 'New Paid Users', view: 'newpaidusers' },
          ].map((item) => (
            <button
              key={item.view}
              onClick={() => setActiveTab(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.view ? 'bg-cyan-50 text-cyan-600' : 'text-gray-700 hover:bg-gray-50'
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




        <div className="flex-1 overflow-auto p-4">

          {activeTab === 'dashboard' && (
            <div className="space-y-6 w-5xl">
              <Header user={user} title="Welcome Back," subtitle="Here's what happening with your SimplyBooking platform today" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardStats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />

                ))}
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <>
              <Header user={user} title="All Clients" subtitle="Manage and view all your platform clients" />

              <DataTable


                columns={allClientsColumns}
                data={allClientsData}
                filters={allClientsFilters}
                onExport={() => alert('Exporting CSV...')}
              />
            </>
          )}

          {activeTab === 'trials' && (
            <>
              <Header user={user} title="Trial Clients" subtitle="Users currently on the 7-days free trial" />
              <DataTable


                columns={trialClientsColumns}
                data={trialClientsData}
                onExport={() => alert('Exporting CSV...')}
              />
            </>

          )}

          {activeTab === 'cancellations' && (
            <>
              <Header user={user} title="Cancellations" subtitle="Track and analyze subscription cancellations" />
              <DataTable


                columns={cancellationsColumns}
                data={cancellationsData}
                onExport={() => alert('Exporting CSV...')}
              />

            </>

          )}


        </div>
      </div>
    </div>
  );
};

export default Dashboard;