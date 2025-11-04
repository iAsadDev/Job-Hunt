import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Building,
  Mail,
  FileText,
  Target,
  Award,
  Edit3,
  Trash2,
  Plus,
  Eye,
  Calendar,
  Users,
  Zap,
  Search,
  Filter,
  Star,
  TrendingUp,
  Clock
} from "lucide-react";
import { toast } from "react-toastify";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://job-hunt-backend-production.up.railway.app'
    : 'http://localhost:4000';

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/jobs/my-jobs`, {
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
      await axios.delete(`${API_BASE_URL}/api/jobs/${id}`, {
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

  const handleView = (id) => {
    navigate(`/jobs/${id}`);
  };

  // Filter jobs based on search and filter
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || job.jobType === filterType;
    return matchesSearch && matchesType;
  });

  const getJobTypeColor = (type) => {
    const colors = {
      "Full-time": "from-emerald-500 to-emerald-600",
      "Part-time": "from-blue-500 to-blue-600", 
      "Contract": "from-amber-500 to-amber-600",
      "Internship": "from-purple-500 to-purple-600",
      "Remote": "from-cyan-500 to-cyan-600"
    };
    return colors[type] || "from-slate-500 to-slate-600";
  };

  const getCardGradient = (index) => {
    const gradients = [
      "from-blue-50 to-cyan-50",
      "from-purple-50 to-pink-50", 
      "from-green-50 to-emerald-50",
      "from-amber-50 to-orange-50",
      "from-indigo-50 to-blue-50",
      "from-rose-50 to-pink-50"
    ];
    return gradients[index % gradients.length];
  };

  const getStatsGradient = () => {
    return "from-purple-500 via-pink-500 to-rose-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-20">
        <div className="max-w-7xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-slate-600 text-lg">Loading your opportunities...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Opportunities</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Manage and track all your job postings in one place. Reach top talent with your opportunities.
          </p>
        </motion.div>

        {/* Stats Overview */}
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Opportunities</p>
                  <p className="text-3xl font-bold">{jobs.length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Active Types</p>
                  <p className="text-3xl font-bold">{new Set(jobs.map(job => job.jobType)).size}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">This Month</p>
                  <p className="text-3xl font-bold">{jobs.length}</p>
                </div>
                <Star className="w-8 h-8 text-amber-200" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/60 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search your opportunities..."
                className="pl-12 w-full py-4 px-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-700 placeholder-slate-500 bg-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="py-4 px-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-700 bg-white/50"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/post-job")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Plus className="w-5 h-5" />
              Post New Job
            </motion.button>
          </div>
          
          <div className="mt-4 text-sm text-slate-500 flex justify-between items-center">
            <span>
              Showing <span className="text-purple-600 font-bold">{filteredJobs.length}</span> of{" "}
              <span className="text-slate-700 font-bold">{jobs.length}</span> opportunities
            </span>
            {(searchTerm || filterType !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("All");
                }}
                className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Briefcase className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {jobs.length === 0 ? "No Opportunities Posted Yet" : "No Matching Opportunities"}
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
              {jobs.length === 0 
                ? "Start building your talent pipeline by posting your first job opportunity."
                : "No jobs match your current search criteria. Try adjusting your filters."
              }
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/post-job")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Post Your First Opportunity
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-gradient-to-br ${getCardGradient(index)} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 group`}
                >
                  {/* Job Header with Gradient */}
                  <div className={`bg-gradient-to-r ${getJobTypeColor(job.jobType)} p-4 text-white`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {job.jobType}
                      </span>
                      {job.salary && (
                        <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          ${job.salary.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center text-slate-600 font-medium">
                        <Building className="w-4 h-4 mr-2" />
                        {job.company}
                      </div>
                    </div>

                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed text-sm">
                      {job.description}
                    </p>

                    {/* Job Details */}
                    <div className="space-y-3">
                      <div className="flex items-center text-slate-700">
                        <MapPin className="w-4 h-4 text-slate-500 mr-3" />
                        <span className="text-sm">{job.location || "Remote"}</span>
                      </div>
                      
                      {job.salary && (
                        <div className="flex items-center text-slate-700">
                          <DollarSign className="w-4 h-4 text-slate-500 mr-3" />
                          <span className="text-sm">${job.salary.toLocaleString()}/year</span>
                        </div>
                      )}

                      <div className="flex items-center text-slate-700">
                        <Mail className="w-4 h-4 text-slate-500 mr-3" />
                        <span className="text-sm">{job.contact}</span>
                      </div>

                      {job.requirements && (
                        <div className="flex items-start text-slate-600">
                          <Target className="w-4 h-4 text-slate-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-sm line-clamp-2">{job.requirements}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6 pt-4 bg-white/50 border-t border-white/30">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleView(job._id)}
                        className="flex-1 bg-white text-slate-700 py-2 px-3 rounded-xl hover:bg-slate-100 transition-all duration-300 font-semibold text-xs flex items-center justify-center gap-1 border border-slate-200"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(job._id)}
                        className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold text-xs flex items-center justify-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(job._id)}
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded-xl hover:bg-red-600 transition-all duration-300 font-semibold text-xs flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stats Footer */}
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Growing Your Talent Pipeline</h3>
              <p className="text-purple-100 text-lg mb-6 max-w-2xl mx-auto">
                You're actively building connections with talented professionals. Keep your opportunities updated for better matches.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/post-job")}
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Post Another Opportunity
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;