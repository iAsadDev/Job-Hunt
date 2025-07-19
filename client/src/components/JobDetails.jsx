import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { JobContext } from "../context/jobContext";
import { useNavigate } from "react-router-dom";
import { motion }  from "framer-motion";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  FileText,
  Phone,
  BadgeCheck,
  ArrowLeft,
  Clock,
  User,
  Layers
} from "lucide-react";

const JobDetails = () => {
  const { selectedJobId } = useContext(JobContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedJobId) return;

    const fetchJob = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`http://localhost:4000/api/jobs/${selectedJobId}`);
        setJob(res.data);
      } catch {
        setError("Failed to fetch job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [selectedJobId]);

  if (!selectedJobId) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Job Selected</h2>
          <p className="text-gray-600 mb-6">Please select a job from the list to view details.</p>
          <button
            onClick={() => navigate("/jobs/all-jobs")}
            className="bg-gradient-to-r from-amber-400 to-yellow-400 text-white px-6 py-2 rounded-lg hover:from-amber-500 hover:to-yellow-500 transition-all shadow-md"
          >
            Browse Available Jobs
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-20 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded w-1/3 mt-8"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 text-center">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-rose-400 p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold text-rose-800 mb-4">Error Loading Job</h2>
          <p className="text-rose-600 mb-6">{error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-6 py-2 rounded-lg hover:from-rose-500 hover:to-pink-500 transition-all shadow-md"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/jobs/all-jobs")}
              className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition shadow-sm"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto my-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Job Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{job.title}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <Building size={16} /> {job.company}
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <MapPin size={16} /> {job.location}
                </span>
                <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <Clock size={16} /> {job.jobType}
                </span>
              </div>
            </div>
            {job.salary && (
              <div className="bg-white text-purple-700 px-4 py-2 rounded-lg font-bold text-lg">
                ${job.salary.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Job Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Overview Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <BadgeCheck className="text-purple-600" size={20} />
              Job Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <User className="text-purple-600" size={20} />
              Requirements
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Layers className="text-purple-600" size={18} />
                Responsibilities
              </h3>
              <p className="text-gray-700 text-sm">{job.responsibilities|| "Not specified"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                <Phone className="text-purple-600" size={18} />
                Contact Information
              </h3>
              <p className="text-gray-700 text-sm">{job.contact || "Contact HR department"}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={() => navigate("/jobs/all-jobs")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            Back to Jobs List
          </button>
          
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;