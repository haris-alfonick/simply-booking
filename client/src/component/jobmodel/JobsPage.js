import { useState } from "react";
import JobModal from "./common/JobModal";
import { API_BASE_URL } from "../api/Api";
import { showSuccess } from "../utils/toast";

const JobsPage = ({ btnName, jobs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleApiRequest = async (method, endpoint, body) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        showSuccess("Estimate sent to client");
        setIsModalOpen(false);
        setSelectedJob(null);
        await new Promise((res) => setTimeout(res, 1000));
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      setError("Failed to send estimate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const body = {
      price: selectedJob.price,
      notes: selectedJob.notes,
    };
    handleApiRequest("POST", `/quotes/send-estimate/${selectedJob._id}`, body);
  };

  const handleSchedule = () => {
    const body = {
      date: selectedJob.date,
      time: selectedJob.time,
    };
    handleApiRequest("PUT", `/quotes/update/${selectedJob._id}`, body);
  };

  const handleMarkCompleted = () => {
    const body = {
      status: "completed",
    };
    handleApiRequest("PUT", `/quotes/update/${selectedJob._id}`, body);
  };


  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     await fetch(`${API_BASE_URL}/quotes/send-estimate/${selectedJob._id}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         price: selectedJob.price,
  //         notes: selectedJob.notes,
  //       }),
  //     });

  //     showSuccess("Estimate sent to client");
  //     setIsModalOpen(false);
  //     setSelectedJob(null);
  //     await new Promise((res) => setTimeout(res, 1000));
  //   } catch (err) {
  //     setError("Failed to send estimate. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSchedule = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     await fetch(`${API_BASE_URL}/quotes/update/${selectedJob._id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         date: selectedJob.date,
  //         time: selectedJob.time,
  //       }),
  //     });

  //     showSuccess("Estimate sent to client");
  //     setIsModalOpen(false);
  //     setSelectedJob(null);
  //     await new Promise((res) => setTimeout(res, 1000));
  //   } catch (err) {
  //     setError("Failed to send estimate. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleMarkCompleted = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     await fetch(`${API_BASE_URL}/quotes/update/${selectedJob._id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         status: "completed",
  //       }),
  //     });

  //     showSuccess("Estimate sent to client");
  //     setIsModalOpen(false);
  //     setSelectedJob(null);
  //     await new Promise((res) => setTimeout(res, 1000));
  //   } catch (err) {
  //     setError("Failed to send estimate. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>

      <button
        className="text-cyan-600 bg-blue-100 px-4 py-2 rounded-lg hover:underline text-sm"
        onClick={() => handleOpen(jobs)}>
        {btnName}
      </button>

      <JobModal
        isOpen={isModalOpen}
        job={selectedJob}
        onClose={handleClose}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onSchedule={handleSchedule}
        onMarkCompleted={handleMarkCompleted}
        loading={loading}
        error={error}
        API_BASE_URL={API_BASE_URL}
      />
    </>
  );
};

export default JobsPage;
