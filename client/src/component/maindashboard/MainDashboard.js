import React, { useState, useMemo } from 'react';
import Chart from "react-apexcharts";
import {
  Search, Download, ChevronLeft, ChevronRight, MoreHorizontal, Menu, X, Bell,
  Users, Settings, HelpCircle, LayoutDashboard, Clock, CircleX,
  UserPlus, CreditCard, TrendingUp, Calendar, TriangleAlert, MessageSquare
} from 'lucide-react';

const Header = ({ user, title, subtitle }) => (
  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 mb-4 rounded-lg">
    <h1 className="text-2xl font-bold text-gray-800">
      {title} {user ? user.fullname : ''}
    </h1>
    <p className="text-gray-600 mt-1">{subtitle}</p>
  </div>
);

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

const StatCard = ({ icons: Icon, label, value, difference }) => (
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
        <p className="text-sm text-gray-500 ms-2 mt-3">{difference}</p>
      </div>
    </div>
  </div>
);

const StatCard1 = ({ icon: Icon, label, value, growth, iconColor }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    <div className="flex items-start justify-between">
      <div className={`p-2 rounded-lg ${iconColor}`}>
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex items-center text-green-600 text-sm font-medium">
        <TrendingUp className="w-4 h-4 mr-1" />
        {growth}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
    </div>
  </div>
);

const DataTable = ({ columns, data, filters = [], onExport, searchable = true, title, subtitle, ViewAll, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = searchable
        ? Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
        : true;

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {(title || subtitle || ViewAll) && (
        <div className="flex justify-between mb-4">
          <div>
            {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {ViewAll && (
            <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-700" onClick={setActiveTab}>
              {ViewAll}
            </p>
          )}
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {filters.map(filter => (
          <select
            key={filter.key}
            value={filterValues[filter.key] || 'all'}
            onChange={(e) => {
              setFilterValues(prev => ({ ...prev, [filter.key]: e.target.value }));
              setCurrentPage(1);
            }}
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
                <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
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

const DataTable1 = ({ columns, data, statusColors }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-gray-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-sm">
                  {col.key === 'status' ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[row[col.key]]}`}>
                      {row[col.key]}
                    </span>
                  ) : col.key === 'plan' ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${row[col.key] === 'Business'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                      {row[col.key]}
                    </span>
                  ) : col.key === 'revenue' ? (
                    <span className="text-green-600 font-medium">{row[col.key]}</span>
                  ) : (
                    <span className={col.key === 'email' ? 'text-gray-500' : 'text-gray-900'}>
                      {row[col.key]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [daysFilter, setDaysFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const itemsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user"));


  const dashboardConfig = {
    newtrialusers: {
      title: 'Trial Users List',
      stats: [
        { icon: Calendar, label: 'Daily Signups', value: 12, growth: '12.5%', iconColor: 'bg-blue-50' },
        { icon: Calendar, label: 'Weekly Signups', value: 84, growth: '8.2%', iconColor: 'bg-blue-50' },
        { icon: Calendar, label: 'Monthly Signups', value: 342, growth: '23.1%', iconColor: 'bg-blue-50' },
        { icon: Calendar, label: 'Quarterly Signups', value: 956, growth: '15.3%', iconColor: 'bg-blue-50' },
        { icon: Calendar, label: 'Annually Signups', value: 3972, growth: '15.3%', iconColor: 'bg-blue-50' },
      ],
      columns: [
        { key: 'clientName', label: 'Client Name' },
        { key: 'email', label: 'Email' },
        { key: 'signupDate', label: 'Signup Date' },
        { key: 'dateLeft', label: 'Date Left' },
        { key: 'bookings', label: 'Bookings' },
        { key: 'status', label: 'Status' },
      ],
      data: Array(84).fill(null).map((_, i) => ({
        clientName: `Core Fitness Pro ${i + 1}`,
        email: 'info@corefitness.com',
        signupDate: `Dec ${8 - (i % 25)}, 2025`,
        dateLeft: `${5 + (i % 10)} Days`,
        bookings: `${12 + (i % 20)}`,
        status: i % 3 === 0 ? 'Active' : 'Expiring',
      })),
      statusColors: {
        Active: 'bg-green-100 text-green-700 border border-green-200',
        Expiring: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      },
    },
    newpaidusers: {
      title: 'Paid Users List',
      stats: [
        { icon: Calendar, label: 'Daily Conversation', value: 8, growth: '12.5%', iconColor: 'bg-blue-50' },
        { icon: Calendar, label: 'Weekly Conversation', value: 56, growth: '8.2%', iconColor: 'bg-blue-50' },
        { icon: Calendar, label: 'Monthly Conversation', value: 224, growth: '23.1%', iconColor: 'bg-blue-50' },
        { icon: Calendar, label: 'Quarterly Conversation', value: 672, growth: '15.3%', iconColor: 'bg-blue-50' },
        { icon: Calendar, label: 'Annually Conversation', value: 2688, growth: '15.3%', iconColor: 'bg-blue-50' },
      ],
      columns: [
        { key: 'clientName', label: 'Client Name' },
        { key: 'email', label: 'Email' },
        { key: 'plan', label: 'Plan' },
        { key: 'converted', label: 'Converted' },
        { key: 'revenue', label: 'Revenue' },
        { key: 'status', label: 'Status' },
      ],
      data: Array(84).fill(null).map((_, i) => ({
        clientName: `Mark Davis ${i + 1}`,
        email: 'info@corefitness.com',
        plan: i % 3 === 0 ? 'Business' : 'Pro',
        converted: `Dec ${4 - (i % 25)}, 2025`,
        revenue: i % 3 === 0 ? '$199/mo' : '$99/mo',
        status: 'Active',
      })),
      statusColors: {
        Active: 'bg-green-100 text-green-700 border border-green-200',
      },
    },
  };

  const currentConfig = dashboardConfig[activeTab];

  const getFilteredData = () => {
    if (!currentConfig) return [];
    let filtered = [...currentConfig.data];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (sortOrder === 'newest') {
      filtered.reverse();
    }

    return filtered;
  };

  const filteredData = getFilteredData();
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const dashboardStats = [
    { label: 'Clients on Paid Subscription', value: '1,284', icons: CreditCard, difference: 'vs last month' },
    { label: 'Trial Clients (7-day)', value: '156', icons: Clock, difference: 'vs last month' },
    { label: 'Total Bookings Made', value: '8,972', icons: Calendar, difference: 'lifetime Booking' },
    { label: 'Total Cancellations', value: '52.4k', icons: CircleX, difference: 'this month' },
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
  ];

  const cancellationsData = [
    { name: 'Sarah Johnson', email: 'sarah@example.com', cancelDate: 'Dec 30, 2025', reason: 'Budget constraints', billing: '$49/month', usage: 'Low Usage' },
    { name: 'Michael Chen', email: 'michael@example.com', cancelDate: 'Dec 29, 2025', reason: 'Switching providers', billing: '$99/month', usage: 'Medium Usage' },
    { name: 'Emma Wilson', email: 'emma@example.com', cancelDate: 'Dec 28, 2025', reason: 'Business closed', billing: '$49/month', usage: 'Low Usage' }
  ];

  const trialUsers = [
    { id: 1, name: 'Emma Davis', company: 'Plumbing Recon', daysLeft: 1, plan: 'Pro Plan' },
    { id: 2, name: 'John Smith', company: 'FixIt Pro', daysLeft: 3, plan: 'Business Plan' },
    { id: 3, name: 'Adil Lee', company: 'Pipe Masters', daysLeft: 4, plan: 'Business Plan' },
    { id: 4, name: 'Amir Lee', company: 'Pipe Masters', daysLeft: 1, plan: 'Business Plan' },
  ];

  const allClientsColumns = [
    { key: 'name', label: 'Client Name' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'startDate', label: 'Start Date' },
    { key: 'location', label: 'Location' },
    { key: 'bookings', label: 'Total Bookings' },
    { key: 'lastLogin', label: 'Last Login' },
    { key: 'actions', label: 'Actions', render: () => <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button> }
  ];

  const trialClientsColumns = [
    { key: 'name', label: 'Client Name' },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
    { key: 'expires', label: 'Date Left' },
    { key: 'bookings', label: 'Bookings' },
    { key: 'daysLeft', label: 'Status', render: (val) => <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">{val}</span> }
  ];

  const cancellationsColumns = [
    { key: 'name', label: 'Client Name' },
    { key: 'email', label: 'Email' },
    { key: 'cancelDate', label: 'Cancel Date' },
    { key: 'reason', label: 'Reason' },
    { key: 'billing', label: 'Last Billing' },
    { key: 'usage', label: 'Usage', render: (val) => <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">{val}</span> }
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


    const cancellationStats = [
    { label: 'This Month', value: '1,284', icons: CreditCard, difference: 'vs last month' },
    { label: 'Avg.Monthly', value: '156', icons: Clock, difference: 'vs last month' },
    { label: 'Churm rate', value: '8,972', icons: Calendar, difference: 'lifetime Booking' },
  ];

  const state = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
        width: "100%",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      colors: ["#FF0000"],
      markers: {
        size: 6,
        colors: ["#FF0000"],
        strokeColors: "#fff",
        strokeWidth: 2,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50">

      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r overflow-hidden`}>
        <div className="p-6">
          <h1 className="text-xl font-bold text-cyan-600">Simplybooking</h1>
          <p className="text-xs text-gray-500">Admin Dashboard</p>
          <hr className="mt-1" />
        </div>

        <nav className="px-4 space-y-1">
          <p className="text-xs font-semibold text-gray-400 px-3 mb-2">MAIN</p>
          {[
            { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
            { icon: Users, label: 'All Clients', view: 'clients' },
            { icon: Clock, label: 'Trial Clients', view: 'trials' },
            { icon: CircleX, label: 'Cancellations', view: 'cancellations' },
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

          <p className="text-xs font-semibold text-gray-400 px-3 mb-2 pt-4">ANALYTICS</p>
          {[
            { icon: UserPlus, label: 'New Trial Users', view: 'newtrialusers' },
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
            <div className="space-y-6">
              <Header user={user} title="Welcome Back," subtitle="Here's what happening with your SimplyBooking platform today" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardStats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>

              <div className="flex flex-col xl:flex-row gap-4">
                <div className="bg-white rounded-lg shadow-sm w-full xl:w-[65%] p-6">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">All Clients</h2>
                    <p className="text-md text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => setActiveTab('clients')}>
                      View All
                    </p>
                  </div>

                  <table className="w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Client Name</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Status</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Start Date</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Location</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Total Booking</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {allClientsData.map((client, idx) => (
                        <tr key={idx} className="text-center">
                          <td className="px-4 py-2 text-start">
                            <span className="font-bold text-xl">{client.name}</span>
                            <br />
                            <span className="text-sm text-gray-500">{client.email}</span>
                          </td>
                          <td>
                            <p className={`text-md font-medium px-3 py-1 rounded-full inline-block ${client.status === 'Paid'
                              ? 'bg-green-100 text-green-500 border border-green-300'
                              : 'bg-red-100 text-red-500 border border-red-300'
                              }`}>
                              {client.status}
                            </p>
                          </td>
                          <td className="px-4 py-2">{client.startDate}</td>
                          <td className="px-4 py-2">{client.location}</td>
                          <td className="px-4 py-2">{client.bookings}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-lg shadow-sm w-full xl:w-[35%] p-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Trial Ending Soon</h2>
                      <p className="text-sm text-gray-500">Users to follow Up</p>
                    </div>
                    <p className="text-md text-green-500 cursor-pointer" onClick={() => setActiveTab('trials')}>
                      View All
                    </p>
                  </div>

                  {trialUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 mt-2 bg-gray-100 rounded-lg gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.plan === 'Pro Plan' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'
                          }`}>
                          {user.plan === 'Pro Plan' ? <TriangleAlert className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-col text-center">
                        <p className={`px-3 py-1 rounded-full text-xs font-medium ${user.plan === 'Pro Plan'
                          ? 'bg-red-100 text-red-500 border border-red-800'
                          : 'bg-yellow-100 text-yellow-500'
                          }`}>
                          {user.daysLeft} day{user.daysLeft > 1 ? 's' : ''} left
                        </p>
                        <p className="px-3 py-1 text-gray-500 text-xs font-medium">{user.plan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm w-full p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Cancellations</h2>
                  <p className="text-md text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => setActiveTab('cancellations')}>
                    View All
                  </p>
                </div>

                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-start text-sm font-semibold text-gray-900 w-[50%]">Clients</th>
                      <th className="px-4 py-2 text-end text-sm font-semibold text-gray-900">Cancel Date</th>
                      <th className="px-4 py-2 text-end text-sm font-semibold text-gray-900">Reason</th>
                      <th className="px-4 py-2 text-end text-sm font-semibold text-gray-900">Last Billing</th>
                      <th className="px-4 py-2 text-end text-sm font-semibold text-gray-900">Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancellationsData.map((cancel, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                            <span className="text-sm font-medium">{cancel.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{cancel.name}</p>
                            <p className="text-xs text-gray-500">{cancel.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs font-medium text-gray-500 text-end">{cancel.cancelDate}</td>
                        <td className="px-4 py-3 text-xs font-medium text-gray-500 text-end">{cancel.reason}</td>
                        <td className="px-4 py-3 text-xs font-medium text-gray-500 text-end">{cancel.billing}</td>
                        <td className="px-4 py-3 text-end">
                          <p className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-500 inline-block">
                            {cancel.usage}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {cancellationStats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>
              <div className='w-full'>

                <Chart
                  options={state.options}
                  series={state.series}
                  type="line"
                  width="100%"
                  height="600"
                />
              </div>





              <DataTable
                columns={cancellationsColumns}
                data={cancellationsData}
                onExport={() => alert('Exporting CSV...')}
              />
            </>
          )}

          {activeTab === 'newtrialusers' && currentConfig && (
            <>
              <Header title="New Trial Users Analytics" subtitle="Track Trial Signups across different time periods" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {currentConfig.stats.map((stat, idx) => (
                  <StatCard1 key={idx} {...stat} />
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{currentConfig.title}</h2>
                  <div className="flex justify-center gap-2">
                    <span className="px-4 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center">
                      Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} users
                    </span>
                    <button
                      className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange(setSearchTerm)(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => handleFilterChange(setStatusFilter)(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expiring">Expiring</option>
                  </select>
                  <select
                    value={daysFilter}
                    onChange={(e) => handleFilterChange(setDaysFilter)(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Days</option>
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => handleFilterChange(setSortOrder)(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>

                <DataTable1
                  columns={currentConfig.columns}
                  data={currentData}
                  statusColors={currentConfig.statusColors}
                />
              </div>
            </>
          )}

          {activeTab === 'newpaidusers' && currentConfig && (
            <>
              <Header title="New Paid Users Analytics" subtitle="Track Paid conversion and revenue across time periods" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {currentConfig.stats.map((stat, idx) => (
                  <StatCard1 key={idx} {...stat} />
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{currentConfig.title}</h2>
                  <div className="flex justify-center gap-2">
                    <span className="px-4 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center">
                      Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} users
                    </span>
                    <button
                      className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange(setSearchTerm)(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => handleFilterChange(setStatusFilter)(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expiring">Expiring</option>
                  </select>
                  <select
                    value={daysFilter}
                    onChange={(e) => handleFilterChange(setDaysFilter)(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Days</option>
                    <option value="7">Last 7 Days</option>
                    <option value="30">Last 30 Days</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => handleFilterChange(setSortOrder)(e.target.value)}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>

                <DataTable1
                  columns={currentConfig.columns}
                  data={currentData}
                  statusColors={currentConfig.statusColors}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;













