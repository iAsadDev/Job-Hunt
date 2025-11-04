import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { JobContext } from "../context/jobContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  FileText,
  Mail,
  BadgeCheck,
  ArrowLeft,
  Clock,
  User,
  Layers,
  Calendar,
  Shield,
  Rocket,
  Star,
  Users,
  Target
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

  const getJobTypeColor = (type) => {
    const colors = {
      "Full-time": "bg-emerald-100 text-emerald-700 border-emerald-200",
      "Part-time": "bg-blue-100 text-blue-700 border-blue-200",
      "Contract": "bg-amber-100 text-amber-700 border-amber-200",
      "Internship": "bg-purple-100 text-purple-700 border-purple-200",
      "Remote": "bg-cyan-100 text-cyan-700 border-cyan-200"
    };
    return colors[type] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  if (!selectedJobId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <div className="max-w-2xl mx-auto p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100"
          >
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Briefcase className="w-12 h-12 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Select an Opportunity</h2>
            <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
              Choose a job from our curated list to view detailed information and requirements.
            </p>
            <button
              onClick={() => navigate("/jobs/all-jobs")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Browse Premium Opportunities
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <div className="max-w-4xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-48 rounded-2xl animate-pulse"></div>
            
            {/* Content Skeleton */}
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <div className="max-w-2xl mx-auto p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100"
          >
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Connection Issue</h2>
            <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/jobs/all-jobs")}
                className="bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-200 transition-all duration-300 font-semibold"
              >
                Back to Opportunities
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate("/jobs/all-jobs")}
          className="flex items-center gap-3 text-slate-600 hover:text-slate-800 transition-colors duration-200 font-semibold mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Opportunities
        </motion.button>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
          {/* Job Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex-1">
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                  >
                    {job.title}
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-3 mb-6"
                  >
                    <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-medium">
                      <Building className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      {job.location || "Remote"}
                    </span>
                    <span className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium border ${getJobTypeColor(job.jobType)}`}>
                      <Clock className="w-4 h-4" />
                      {job.jobType}
                    </span>
                  </motion.div>
                </div>

                {job.salary && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-2xl shadow-2xl min-w-[200px] text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-2xl font-bold">${job.salary.toLocaleString()}</span>
                    </div>
                    <div className="text-amber-100 text-sm font-medium">Annual Salary</div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Job Content */}
          <div className="p-8 md:p-12 space-y-12">
            {/* Overview Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-xl">
                  <BadgeCheck className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Opportunity Overview</h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">{job.description}</p>
            </motion.section>

            {/* Requirements Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Requirements & Qualifications</h2>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">{job.requirements}</p>
              </div>
            </motion.section>

            {/* Additional Information Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Responsibilities */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Layers className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Key Responsibilities</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{job.responsibilities || "Responsibilities will be discussed during the interview process."}</p>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Application Process</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-slate-700">
                    <strong>Contact:</strong> {job.contact || "HR Department"}
                  </p>
                  <p className="text-slate-600 text-sm">
                    Submit your application including resume and cover letter for consideration.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Quick Apply Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center pt-8"
            >
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-12 py-4 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl hover:shadow-3xl font-semibold text-lg flex items-center justify-center gap-3 mx-auto group">
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                Apply for This Opportunity
              </button>
              <p className="text-slate-500 text-sm mt-4">
                Join thousands of professionals who found their dream roles through our platform
              </p>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetails;