import React, { useState, useMemo } from 'react';

const DataTable = ({
  columns,
  data,
  filters = [],
  onExport,
  searchable = true,
  title,
  subtitle,
  ViewAll,
  setActiveTab,
  itemsPerPage = 10,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [filteredData, currentPage, itemsPerPage]);

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
            Export CSV
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              {columns.map(col => (
                <th key={col.key} className={`px-4 py-2 text-${col.textAlign || 'left'} text-sm font-medium text-gray-600`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="text-center">
                {columns.map(col => (
                  <td key={col.key} className={`px-4 py-2 ${col.textAlign ? `text-${col.textAlign}` : ''}`}>
                    {col.render ? col.render(row) : row[col.key]}
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
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;










