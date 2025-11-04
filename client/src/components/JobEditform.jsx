import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  FileText,
  UserCheck,
  Target,
  Award,
  ArrowLeft,
  Save,
  Loader,
  Sparkles,
  Zap,
  Globe,
  Clock,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const JobEditForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    requirements: '',
    responsibilities: '',
    contact: '',
    jobType: 'Full-time',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(false);
  const [characterCounts, setCharacterCounts] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://job-hunt-backend-production.up.railway.app'
    : 'http://localhost:4000';

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/jobs/${id}`, {
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
          responsibilities: jobData.responsibilities || '',
          contact: jobData.contact || '',
          jobType: jobData.jobType || 'Full-time',
        });

      } catch (err) {
        console.error("Failed to fetch job for editing", err);
        setError('Failed to load job details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, token]);

  useEffect(() => {
    setCharacterCounts({
      description: formData.description.length,
      requirements: formData.requirements.length,
      responsibilities: formData.responsibilities.length,
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    
    try {
      await axios.put(`${API_BASE_URL}/api/jobs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      setTimeout(() => navigate("/my-jobs"), 2000);
    } catch (err) {
      console.error("Failed to update job", err);
      setError(err.response?.data?.message || 'Failed to update job. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const getProgressColor = (count, max) => {
    const percentage = (count / max) * 100;
    if (percentage < 50) return 'text-amber-500';
    if (percentage < 80) return 'text-blue-500';
    return 'text-green-500';
  };

  const jobTypes = [
    { value: 'Full-time', icon: Clock, color: 'bg-emerald-500' },
    { value: 'Part-time', icon: Zap, color: 'bg-blue-500' },
    { value: 'Contract', icon: Briefcase, color: 'bg-amber-500' },
    { value: 'Internship', icon: Award, color: 'bg-purple-500' },
    { value: 'Remote', icon: Globe, color: 'bg-cyan-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 pt-20">
        <div className="max-w-6xl mx-auto p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Loader className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="text-slate-300 text-lg">Loading opportunity details...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-8 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/my-jobs")}
            className="flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 font-semibold group bg-white/5 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10 hover:border-amber-400/30"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Dashboard
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Edit <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">Opportunity</span>
            </h1>
            <p className="text-slate-400">Refine your job posting for better candidate matches</p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10 hover:border-amber-400/30"
          >
            {preview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            {preview ? 'Edit Mode' : 'Preview'}
          </motion.button>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-2xl border border-green-400/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <h3 className="font-bold text-lg">Opportunity Updated Successfully!</h3>
                  <p className="text-green-100">Redirecting to your jobs dashboard...</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Form */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="p-8 md:p-12">
                {/* Form Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Opportunity Details</h2>
                    <p className="text-slate-400">Update your job posting information</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        label: 'Job Title', 
                        name: 'title', 
                        icon: Briefcase,
                        placeholder: 'Senior React Developer...',
                        required: true
                      },
                      { 
                        label: 'Company', 
                        name: 'company', 
                        icon: Building,
                        placeholder: 'Your company name',
                        required: true
                      },
                      { 
                        label: 'Location', 
                        name: 'location', 
                        icon: MapPin,
                        placeholder: 'Remote, Hybrid, or City',
                        required: true
                      },
                      { 
                        label: 'Salary', 
                        name: 'salary', 
                        icon: DollarSign,
                        type: 'number',
                        placeholder: 'Annual salary in USD',
                        required: true
                      },
                    ].map(({ label, name, icon: Icon, type = 'text', placeholder, required }) => (
                      <div key={name} className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-300">
                          {label} {required && <span className="text-amber-400">*</span>}
                        </label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-amber-400 transition-colors duration-300">
                            <Icon className="w-5 h-5" />
                          </div>
                          <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            required={required}
                            placeholder={placeholder}
                            className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Job Type Selection */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-300">
                      Job Type <span className="text-amber-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {jobTypes.map(({ value, icon: Icon, color }) => (
                        <motion.button
                          key={value}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFormData(prev => ({ ...prev, jobType: value }))}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                            formData.jobType === value
                              ? `${color} border-${color.split('-')[1]}-400 text-white shadow-lg`
                              : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto mb-2" />
                          <span className="text-xs font-medium">{value}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-300">
                      Contact Email <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-amber-400 transition-colors duration-300">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        placeholder="careers@company.com"
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Rich Text Areas */}
                  {[
                    {
                      label: 'Job Description',
                      name: 'description',
                      icon: FileText,
                      rows: 4,
                      maxLength: 1500,
                      placeholder: 'Describe the role, team culture, and impact...'
                    },
                    {
                      label: 'Requirements',
                      name: 'requirements',
                      icon: Target,
                      rows: 4,
                      maxLength: 1000,
                      placeholder: 'List required skills and qualifications...'
                    },
                    {
                      label: 'Responsibilities',
                      name: 'responsibilities',
                      icon: Award,
                      rows: 4,
                      maxLength: 1000,
                      placeholder: 'Key responsibilities and daily tasks...'
                    },
                  ].map(({ label, name, icon: Icon, rows, maxLength, placeholder }) => (
                    <div key={name} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-semibold text-slate-300">
                          {label} <span className="text-amber-400">*</span>
                        </label>
                        <span className={`text-xs ${getProgressColor(characterCounts[name] || 0, maxLength)}`}>
                          {(characterCounts[name] || 0).toLocaleString()} / {maxLength.toLocaleString()}
                        </span>
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-amber-400 transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <textarea
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          required
                          rows={rows}
                          maxLength={maxLength}
                          placeholder={placeholder}
                          className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm resize-none"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl text-red-200"
                      >
                        <XCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={updating}
                    whileHover={{ scale: updating ? 1 : 1.02 }}
                    whileTap={{ scale: updating ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    {updating ? (
                      <span className="flex items-center justify-center gap-3 relative z-10">
                        <Loader className="w-5 h-5 animate-spin" />
                        Updating Opportunity...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3 relative z-10">
                        <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        Save Changes & Publish
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Preview & Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Preview Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-400" />
                Quick Preview
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-300 text-sm">Job Title</h4>
                  <p className="text-white truncate">{formData.title || 'Not set'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-300 text-sm">Company</h4>
                  <p className="text-white">{formData.company || 'Not set'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-300 text-sm">Location</h4>
                  <p className="text-white">{formData.location || 'Not set'}</p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                Content Quality
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Description', value: characterCounts.description || 0, target: 200 },
                  { label: 'Requirements', value: characterCounts.requirements || 0, target: 150 },
                  { label: 'Responsibilities', value: characterCounts.responsibilities || 0, target: 150 },
                ].map(({ label, value, target }) => (
                  <div key={label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{label}</span>
                      <span className={value >= target ? 'text-green-400' : 'text-amber-400'}>
                        {value}/{target}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          value >= target ? 'bg-green-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min((value / target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Pro Tips
              </h3>
              <div className="space-y-3 text-sm text-slate-400">
                <p>• Use specific job titles for better matching</p>
                <p>• Include salary ranges to attract more candidates</p>
                <p>• Highlight unique company benefits</p>
                <p>• Be clear about remote work options</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobEditForm;