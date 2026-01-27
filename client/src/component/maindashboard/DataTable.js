import { useState, useMemo } from "react";

import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
export const DataTable = ({ columns, data, filters = [], onExport, searchable = true, title, subtitle, viewAllText, onViewAll }) => {
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

  const getUniqueValues = (key) => {
    return [...new Set(data.map(item => item[key]))].filter(Boolean);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {(title || subtitle || viewAllText) && (
        <div className="flex justify-between mb-4">
          <div>
            {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {viewAllText && (
            <p
              className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={onViewAll}
            >
              {viewAllText}
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
              placeholder="Search..."
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
            <option value="all">All {filter.label}</option>
            {getUniqueValues(filter.key).map((value, idx) => (
              <option key={idx} value={value}>{value}</option>
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
                <th
                  key={col.key}
                  className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${col.align === 'center' ? 'text-center' :
                    col.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 whitespace-nowrap ${col.align === 'center' ? 'text-center' :
                      col.align === 'right' ? 'text-right' : 'text-left'
                      }`}
                  >
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
