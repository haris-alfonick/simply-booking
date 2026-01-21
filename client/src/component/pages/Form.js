import React, { useEffect, useState } from "react";
import axios from "axios";

const QuotesTable = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    photo: ""
  });

  const IMAGE_BASE_URL = "http://localhost:5000/uploads";

  useEffect(() => {
    axios.get("http://localhost:5000/api/quotes").then((res) => {
      setRows(res.data);
    });
  }, []);

  // 👉 Edit button click
  const handleEdit = (row) => {
    setFormData(row);   // set row data into form
    setShowModal(true);
  };

  // 👉 Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quotes</h2>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>
                <img
                  src={`${IMAGE_BASE_URL}/${row.photo}`}
                  alt=""
                  width="60"
                />
              </td>
              <td>
                <button onClick={() => handleEdit(row)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Edit Quote</h3>

            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <br /><br />

            <label>Current Image</label><br />
            {formData.photo && (
              <img
                src={`${IMAGE_BASE_URL}/${formData.photo}`}
                alt="preview"
                style={{
                  width: "150px",
                  borderRadius: "8px",
                  marginTop: "10px"
                }}
              />
            )}

            <br /><br />

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Simple modal styles */
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const modalContentStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "300px"
};

export default QuotesTable;
