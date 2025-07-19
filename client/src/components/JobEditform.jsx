import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JobEditForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    requirements: '',
    jobType: 'Full-time',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const jobData = res.data;

        setFormData({
          title: jobData.title || '',
          description: jobData.description || '',
          company: jobData.company || '',
          location: jobData.location || '',
          salary: jobData.salary || '',
          requirements: jobData.requirements || '',
          jobType: jobData.jobType || 'Full-time',
        });

      } catch (err) {
        console.error("Failed to fetch job for editing", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`http://localhost:4000/api/jobs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/my-jobs");
    } catch (err) {
      console.error("Failed to update job", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading job data...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {[
          { label: 'Title', name: 'title' },
          { label: 'Description', name: 'description', isTextarea: true },
          { label: 'Company', name: 'company' },
          { label: 'Location', name: 'location' },
          { label: 'Salary', name: 'salary', type: 'number' },
            { label: 'Contact', name: 'contact' },
          { label: 'Requirements', name: 'requirements', isTextarea: true },
        ].map(({ label, name, type = 'text', isTextarea }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            {isTextarea ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-medium mb-1">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {updating ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
};

export default JobEditForm;
