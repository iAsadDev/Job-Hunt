import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { JobContext } from "../context/jobContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaDollarSign,
  FaFilter,
  FaTimes,
  FaBuilding,
  FaClock,
  FaRocket
} from "react-icons/fa";
import Footer from "./footer";

const JobsList = () => {
  const navigate = useNavigate();
  const { onSelectJob } = useContext(JobContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [salaryRange, setSalaryRange] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:4000/api/jobs/all-jobs`, {
        headers: { 'Content-Type': 'application/json' },
      });
      setJobs(res.data);
    } catch (err) {
      let errorMessage = "Failed to fetch jobs";
      if (err.response) {
        errorMessage = err.response.data?.message || err.response.statusText;
      } else if (err.request) {
        errorMessage = "No response from server - please try again later";
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = "Request timeout - server is taking too long to respond";
      }
      setError(errorMessage);
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Filter jobs based on search term and selected type
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || job.jobType === selectedType;
    
    let matchesSalary = true;
    if (salaryRange !== "All" && job.salary) {
      switch(salaryRange) {
        case "0-50k":
          matchesSalary = job.salary <= 50000;
          break;
        case "50k-100k":
          matchesSalary = job.salary > 50000 && job.salary <= 100000;
          break;
        case "100k-150k":
          matchesSalary = job.salary > 100000 && job.salary <= 150000;
          break;
        case "150k+":
          matchesSalary = job.salary > 150000;
          break;
        default:
          matchesSalary = true;
      }
    }
    
    return matchesSearch && matchesType && matchesSalary;
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getSalaryRange = (salary) => {
    if (!salary) return "Not specified";
    if (salary < 50000) return `$${(salary/1000).toFixed(0)}k`;
    if (salary < 100000) return `$${(salary/1000).toFixed(0)}k`;
    return `$${Math.round(salary/1000)}k`;
  };

  const getJobTypeColor = (type) => {
    const colors = {
      "Full-time": "bg-emerald-100 text-emerald-700",
      "Part-time": "bg-blue-100 text-blue-700",
      "Contract": "bg-amber-100 text-amber-700",
      "Internship": "bg-purple-100 text-purple-700",
      "Remote": "bg-cyan-100 text-cyan-700"
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto px-4 py-12 text-center"
        >
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Connection Issue</h3>
            <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchJobs}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <Skeleton width={400} height={52} className="mx-auto mb-6 rounded-2xl" />
            <Skeleton width={500} height={28} className="mx-auto rounded-2xl" />
          </div>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                <Skeleton height={32} className="mb-4 rounded-xl" />
                <Skeleton width={140} height={24} className="mb-6 rounded-xl" />
                <Skeleton count={3} className="mb-2 rounded" />
                <Skeleton height={52} className="mt-6 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (filteredJobs.length === 0 && (searchTerm || selectedType !== "All" || salaryRange !== "All")) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto px-4 py-12 text-center"
        >
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">No Matching Jobs Found</h3>
            <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
              {searchTerm 
                ? `No jobs match "${searchTerm}"`
                : `No ${selectedType.toLowerCase()} jobs available with current filters`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("All");
                  setSalaryRange("All");
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setShowFilters(true)}
                className="bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-200 transition-all duration-300 font-semibold"
              >
                Adjust Filters
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto px-4 py-12 text-center"
        >
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">No Jobs Available</h3>
            <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
              We're currently updating our job listings. Please check back soon for new opportunities.
            </p>
            <button
              onClick={fetchJobs}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              Refresh Jobs
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-7xl mx-auto px-4 py-12"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Discover Your <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Next Opportunity</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Browse through our curated selection of premium job opportunities from top companies
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
          >
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by job title, company, or keywords..."
                  className="pl-12 w-full py-4 px-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-700 placeholder-slate-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  className="py-4 px-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-700 bg-white"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="All">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-slate-100 text-slate-700 py-4 px-6 rounded-2xl hover:bg-slate-200 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <FaFilter className="w-4 h-4" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-6 border-t border-slate-200"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <label className="text-slate-700 font-semibold">Salary Range:</label>
                  <select
                    className="py-3 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-700 bg-white flex-1"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                  >
                    <option value="All">All Salary Ranges</option>
                    <option value="0-50k">$0 - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k-150k">$100k - $150k</option>
                    <option value="150k+">$150k+</option>
                  </select>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between items-center mt-4">
              <div className="text-slate-600 font-medium">
                Showing <span className="text-amber-600 font-bold">{filteredJobs.length}</span> of{" "}
                <span className="text-slate-700 font-bold">{jobs.length}</span> opportunities
              </div>
              {(searchTerm || selectedType !== "All" || salaryRange !== "All") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("All");
                    setSalaryRange("All");
                  }}
                  className="text-amber-600 hover:text-amber-700 font-semibold text-sm"
                >
                  Clear all
                </button>
              )}
            </div>
          </motion.div>
          
          {/* Jobs Grid */}
          <motion.div 
            variants={container}
            className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full group"
              >
                <div className="p-8 flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      {job.logo && (
                        <img 
                          src={job.logo} 
                          alt={job.company} 
                          className="w-14 h-14 object-contain rounded-xl border border-slate-200 p-2 bg-white group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">{job.title}</h3>
                        <div className="flex items-center text-slate-600 font-medium">
                          <FaBuilding className="w-4 h-4 mr-2" />
                          {job.company}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getJobTypeColor(job.jobType)}`}>
                      {job.jobType}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">{job.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-700">
                      <FaMapMarkerAlt className="w-4 h-4 text-slate-500 mr-3" />
                      {job.location || "Remote"}
                    </div>
                    
                    <div className="flex items-center text-slate-700">
                      <FaBriefcase className="w-4 h-4 text-slate-500 mr-3" />
                      {job.jobType || "Full-time"}
                    </div>
                    
                    {job.salary && (
                      <div className="flex items-center text-slate-700">
                        <FaDollarSign className="w-4 h-4 text-slate-500 mr-3" />
                        {getSalaryRange(job.salary)} per year
                      </div>
                    )}

                    {job.postedAt && (
                      <div className="flex items-center text-slate-500 text-sm">
                        <FaClock className="w-4 h-4 mr-3" />
                        Posted {new Date(job.postedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="px-8 pb-8 pt-6 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onSelectJob(job._id);
                      navigate(`/jobs/${job._id}`);
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-6 rounded-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center group/btn"
                  >
                    <FaRocket className="w-4 h-4 mr-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    View Opportunity
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default JobsList;