import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiType,
  FiMail,
  FiList,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Loader from "../components/Loader"; // Assume you have a Loader component

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/jobs/my-jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(res.data);
      } catch (error) {
        toast.error("Failed to load your jobs");
        console.error("Error fetching my jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?"))
      return;
    try {
      await axios.delete(`http://localhost:4000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== id));
      toast.success("Job deleted successfully");
    } catch (err) {
      toast.error("Failed to delete job");
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/jobs/edit/${id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          My Job Postings
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Manage all your posted job opportunities
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <FiBriefcase className="w-full h-full" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No jobs posted yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by posting your first job opportunity.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/post-job")}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post a Job
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white transform transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {job.jobType}
                    </span>
                    {job.salary && (
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ${job.salary}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-500 line-clamp-3">
                    {job.description}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {job.responsibilities && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <FiList className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {job.responsibilities
                            .split("\n")
                            .filter(Boolean)
                            .map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="flex-shrink-0 mt-1 mr-2">
                                  <svg
                                    className="h-3 w-3 text-indigo-400"
                                    fill="currentColor"
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M11.707 2.293a1 1 0 00-1.414 0L4.586 8 1.707 5.121a1 1 0 00-1.414 1.414l3.5 3.5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" />
                                  </svg>
                                </span>
                                <span className="text-sm text-gray-700 leading-relaxed">
                                  {item}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start">
                    <FiBriefcase className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                    <span className="ml-3 text-sm text-gray-700">
                      {job.company}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <FiMapPin className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                    <span className="ml-3 text-sm text-gray-700">
                      {job.location}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <FiMail className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                    <span className="ml-3 text-sm text-gray-700">
                      {job.contact}
                    </span>
                  </div>
                  {job.requirements && (
                    <div className="flex items-start">
                      <FiList className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
                      <span className="ml-3 text-sm text-gray-700 line-clamp-2">
                        {job.requirements}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-3 flex justify-between">
                <button
                  onClick={() => handleEdit(job._id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FiEdit2 className="mr-1.5 h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FiTrash2 className="mr-1.5 h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
