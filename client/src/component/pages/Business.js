import { useEffect, useState } from 'react';
import { getBusinesses } from '../api/Api';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const res = await getBusinesses({ page, limit: 10 });
      setBusinesses(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [page]);

  if (loading) return <p>Loading businesses...</p>;

  return (
    <div>
      <h2>Businesses</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Bookings</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((biz) => (
            <tr key={biz._id}>
              <td>{biz.businessName}</td>
              <td>{biz.email}</td>
              <td>{biz.status}</td>
              <td>{biz.bookings}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: '16px' }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: '0 10px' }}>
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Businesses;
