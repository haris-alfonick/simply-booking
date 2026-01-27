import { useState, useMemo, useEffect, useCallback } from 'react';
import Chart from "react-apexcharts";
import {
  Search, Download, ChevronLeft, ChevronRight, Bell, Users, Settings, HelpCircle, LayoutDashboard, Clock, CircleX, UserPlus, CreditCard, TrendingUp, Calendar, TriangleAlert, TrendingDown, X, Menu, ArrowBigRight
} from 'lucide-react';
import { getBusinesses } from '../api/Api';

import {DataTable} from "./DataTable";

const Header = ({ user, title, subtitle, onExport }) => (
  <div className='flex justify-between bg-gradient-to-r from-cyan-50 to-blue-50 p-6 mb-4 rounded-lg'>
    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        {title} {user ? user.fullname : ''}
      </h1>
      <p className="text-gray-600 mt-1">{subtitle}</p>
    </div>
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
);

const StatCard = ({ icons: Icon, label, value, subtitle, change }) => {
  const isTrendingUp = change > 0;
  const changeColor = isTrendingUp ? "text-green-500" : "text-red-500";
  const ChangeIcon = isTrendingUp ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        <div className={`p-3 rounded-lg ${changeColor} flex items-center gap-2`}>
          <ChangeIcon className="w-6 h-6" />
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <p className="text-md text-gray-500">{label}</p>
        <div className="flex items-center">
          <p className="text-3xl font-bold">{value || 0}</p>
          <p className="text-sm text-gray-500 ms-2 mt-3">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};



const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [businesses, setBusinesses] = useState([]);
  const [pagination, setPagination] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [businessName, setBusinessName] = useState('');

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchBusinesses = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getBusinesses({
        page,
        limit: 10,
      });

      setBusinesses(res?.data || []);
      setPagination(res?.pagination || null);
      setAnalytics(res?.analytics || null);
    } catch (error) {
      console.error("Failed to fetch businesses:", error);
    } finally {
      setLoading(false);
    }
  }, [businessName, page]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);


  const getLast6Months = () => {
    return Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      return {
        key: `${date.getFullYear()}-${date.getMonth() + 1}`,
        label: date.toLocaleString("default", { month: "short" })
      };
    });
  };

  const chartState = useMemo(() => {
    if (!analytics?.cancellationsLast6Months) return null;

    const months = getLast6Months();
    const data = months.map(m => {
      const match = analytics.cancellationsLast6Months.find(
        x => `${x.year}-${x.month}` === m.key
      );
      return match ? match.count : 0;
    });

    return {
      options: {
        chart: {
          id: "cancellation-trend",
          toolbar: { show: false }
        },
        xaxis: {
          categories: months.map(m => m.label)
        },
        colors: ["#EF4444"],
        stroke: {
          curve: "smooth",
          width: 3
        },
        markers: {
          size: 5
        },
        yaxis: {
          title: {
            text: "Cancellations"
          }
        }
      },
      series: [
        {
          name: "Cancellations",
          data
        }
      ]
    };
  }, [analytics]);

  const handleExportCSV = () => {
    alert('Exporting CSV...');
    // Implement actual CSV export logic here
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-600">Loading businesses...</p>
    </div>
  );

  const dashboardStats = [
    {
      label: 'Clients on Paid Subscription',
      value: analytics.totalPaid,
      icons: CreditCard,
      subtitle: 'vs last month',
      change: 12.5
    },
    {
      label: 'Trial Clients (7-day)',
      value: analytics.totalTrial,
      icons: Clock,
      subtitle: 'vs last month',
      change: 10.5
    },
    {
      label: 'Total Bookings Made',
      value: analytics.totalBookings,
      icons: Calendar,
      subtitle: 'lifetime Booking',
      change: 15
    },
    {
      label: 'Total Cancellations',
      value: analytics.totalCancelled,
      icons: CircleX,
      subtitle: 'this month',
      change: -5
    },
  ];

  const cancellationStats = [
    {
      label: 'This Month',
      value: analytics.totalCancelledThisMonth,
      icons: CreditCard,
      subtitle: 'This month',
      change: 12.5
    },
    {
      label: 'Avg. Monthly',
      value: analytics.avgCancelledPerMonth,
      icons: TrendingDown,
      subtitle: 'Avg. month',
      change: -10
    },
    {
      label: 'Churn Rate',
      value: `${analytics.churnRate}%`,
      icons: Calendar,
      subtitle: 'churn Rate',
      change: -5
    },
  ];

  const clientColumns = [
    {
      key: 'businessName',
      label: 'Client Name',
      render: (_, row) => (
        <div>
          <span className="font-medium text-sm">{row.businessName}</span>
          <br />
          <span className="text-sm text-gray-500">{row.email}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (status) => (
        <span className={`text-md font-medium px-3 py-1 rounded-full inline-block ${status === 'Paid'
            ? 'bg-green-100 text-green-500 border border-green-300'
            : status === 'Trial'
              ? 'bg-yellow-100 text-yellow-500 border border-yellow-300'
              : 'bg-red-100 text-red-500 border border-red-300'
          }`}>
          {status}
        </span>
      )
    },
    {
      key: 'startDate',
      label: 'Start Date',
      align: 'center',
      render: (date) => new Date(date).toLocaleDateString("en-GB")
    },
    {
      key: 'location',
      label: 'Location',
      align: 'center'
    },
    {
      key: 'bookings',
      label: 'Total Booking',
      align: 'center'
    },
  ];

  const trialColumns = [
    {
      key: 'businessName',
      label: 'Client Name',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
            <span className="text-sm font-medium">{row.businessName.charAt(0)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{row.businessName}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (status) => (
        <span className={`text-md font-medium px-3 py-1 rounded-full inline-block ${status === 'Trial'
            ? 'bg-yellow-100 text-yellow-500 border border-yellow-300'
            : 'bg-gray-100 text-gray-500 border border-gray-300'
          }`}>
          {status}
        </span>
      )
    },
    {
      key: 'startDate',
      label: 'Start Date',
      align: 'center',
      render: (date) => new Date(date).toLocaleDateString("en-GB")
    },
    {
      key: 'location',
      label: 'Location',
      align: 'center'
    },
    {
      key: 'bookings',
      label: 'Bookings',
      align: 'center'
    },
    {
      key: 'daysLeft',
      label: 'Days Left',
      align: 'center',
      render: (daysLeft, row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${daysLeft <= 2
            ? 'bg-red-100 text-red-500 border border-red-800'
            : 'bg-yellow-100 text-yellow-500 border border-yellow-300'
          }`}>
          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
        </span>
      )
    },
  ];

  const cancellationColumns = [
    {
      key: 'businessName',
      label: 'Client Name',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
            <span className="text-sm font-medium">{row.businessName.charAt(0)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{row.businessName}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'cancelledAt',
      label: 'Cancel Date',
      align: 'right',
      render: (_, row) => row.cancellation ? new Date(row.cancellation.cancelledAt).toLocaleDateString("en-GB") : 'N/A'
    },
    {
      key: 'reason',
      label: 'Reason',
      align: 'right',
      render: (_, row) => row.cancellation?.reason || 'N/A'
    },
    {
      key: 'billingPlan',
      label: 'Last Billing',
      align: 'right',
      render: (_, row) => row.cancellation?.billingPlan || 'N/A'
    },
    {
      key: 'usage',
      label: 'Usage',
      align: 'right',
      render: (_, row) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-500 inline-block">
          {row.cancellation?.usage || 'N/A'}
        </span>
      )
    },
  ];

  const trialBusinesses = businesses.filter(b => b.status === "Trial");
  const cancelledBusinesses = businesses.filter(b => b.status === "Cancelled");

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
        </nav>


        <div className="absolute bottom-0 w-64 p-4 border-t corsur-pointer">
          <button onClick={() => { localStorage.removeItem("user"); localStorage.removeItem("token") }} className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mb-1">
            <ArrowBigRight className="w-5 h-5" />
            <span>Log Out</span>
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
              <Header
                user={user}
                title="Welcome Back,"
                subtitle="Here's what's happening with your SimplyBooking platform today"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardStats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>

              <div className="flex flex-col xl:flex-row gap-4">
                {/* All Clients Preview */}
                <div className="bg-white rounded-lg shadow-sm w-full xl:w-[65%] p-6">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">All Clients</h2>
                    <p
                      className="text-md text-gray-500 cursor-pointer hover:text-gray-700"
                      onClick={() => setActiveTab('clients')}
                    >
                      View All
                    </p>
                  </div>

                  <div className="overflow-x-auto">
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
                        {businesses.slice(0, 5).map((client, idx) => (
                          <tr key={idx} className="text-center">
                            <td className="px-4 py-2 text-start">
                              <span className="font-bold text-md">{client.businessName}</span>
                              <br />
                              <span className="text-sm text-gray-500">{client.email}</span>
                            </td>
                            <td>
                              <p className={`text-md font-medium px-3 py-1 rounded-full inline-block ${client.status === 'Paid'
                                  ? 'bg-green-100 text-green-500 border border-green-300'
                                  : client.status === 'Trial'
                                    ? 'bg-yellow-100 text-yellow-500 border border-yellow-300'
                                    : 'bg-red-100 text-red-500 border border-red-300'
                                }`}>
                                {client.status}
                              </p>
                            </td>
                            <td className="px-4 py-2">{new Date(client.startDate).toLocaleDateString("en-GB")}</td>
                            <td className="px-4 py-2">{client.location}</td>
                            <td className="px-4 py-2">{client.bookings}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm w-full xl:w-[35%] p-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Trial Ending Soon</h2>
                      <p className="text-sm text-gray-500">Users to follow up</p>
                    </div>
                    <p
                      className="text-md text-green-500 cursor-pointer"
                      onClick={() => setActiveTab('trials')}
                    >
                      View All
                    </p>
                  </div>

                  {trialBusinesses.slice(0, 5).map((business, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 mt-2 bg-gray-100 rounded-lg gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${business.daysLeft <= 2
                            ? 'bg-red-100 text-red-500'
                            : 'bg-yellow-100 text-yellow-500'
                          }`}>
                          {business.daysLeft <= 2 ? <TriangleAlert className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{business.userId?.fullname || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{business.businessName}</p>
                        </div>
                      </div>
                      <div className="flex flex-col text-center">
                        <p className={`px-3 py-1 rounded-full text-xs font-medium ${business.daysLeft <= 2
                            ? 'bg-red-100 text-red-500 border border-red-800'
                            : 'bg-yellow-100 text-yellow-500'
                          }`}>
                          {business.daysLeft} day{business.daysLeft !== 1 ? 's' : ''} left
                        </p>
                        <p className="px-3 py-1 text-gray-500 text-xs font-medium">{business.plan || 'Trial'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm w-full p-6">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Cancellations</h2>
                  <p
                    className="text-md text-gray-500 cursor-pointer hover:text-gray-700"
                    onClick={() => setActiveTab('cancellations')}
                  >
                    View All
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-start text-sm font-semibold text-gray-900">Clients</th>
                        <th className="px-4 py-2 text-end text-sm font-semibold text-gray-900">Cancel Date</th>
                        <th className="px-4 py-2 text-end text-sm font-semibold text-gray-900">Reason</th>
                        <th className="px-4 py-2 text-end text-sm font-semibold text-gray-900">Last Billing</th>
                        <th className="px-4 py-2 text-end text-sm font-semibold text-gray-900">Usage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cancelledBusinesses.slice(0, 5).map((cancel, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="px-4 py-3 flex items-center gap-3">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                              <span className="text-sm font-medium">{cancel.businessName.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{cancel.businessName}</p>
                              <p className="text-xs text-gray-500">{cancel.email}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs font-medium text-gray-500 text-end">
                            {cancel.cancellation ? new Date(cancel.cancellation.cancelledAt).toLocaleDateString("en-GB") : 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-xs font-medium text-gray-500 text-end">
                            {cancel.cancellation?.reason || 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-xs font-medium text-gray-500 text-end">
                            {cancel.cancellation?.billingPlan || 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-end">
                            <p className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-500 inline-block">
                              {cancel.cancellation?.usage || 'N/A'}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <>
              <Header
                user={user}
                title="All Clients"
                subtitle="Manage and view all your platform clients"
                onExport={handleExportCSV}
              />
              <DataTable
                columns={clientColumns}
                data={businesses}
                filters={[
                  { key: 'status', label: 'Status' },
                  { key: 'location', label: 'Location' }
                ]}
                searchable={true}
                onExport={handleExportCSV}
              />
            </>
          )}

          {activeTab === 'trials' && (
            <>
              <Header
                user={user}
                title="Trial Clients"
                subtitle="Users currently on the 7-day free trial"
                onExport={handleExportCSV}
              />
              <DataTable
                columns={trialColumns}
                data={trialBusinesses}
                filters={[
                  { key: 'location', label: 'Location' }
                ]}
                searchable={true}
                onExport={handleExportCSV}
              />
            </>
          )}

          {activeTab === 'cancellations' && (
            <>
              <Header
                user={user}
                title="Cancellations"
                subtitle="Track and analyze subscription cancellations"
                onExport={handleExportCSV}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {cancellationStats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>

              {chartState && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancellation Trend (Last 6 Months)</h3>
                  <Chart
                    options={chartState.options}
                    series={chartState.series}
                    type="line"
                    width="100%"
                    height="400"
                  />
                </div>
              )}

              <DataTable
                columns={cancellationColumns}
                data={cancelledBusinesses}
                filters={[
                  { key: 'location', label: 'Location' }
                ]}
                searchable={true}
                onExport={handleExportCSV}
              />
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

























