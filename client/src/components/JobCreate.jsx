import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Mail, 
  UserCheck, 
  ChevronDown, 
  Check,
  FileText,
  Target,
  Award,
  Building,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobCreateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    responsibilities: '',
    requirements: '',
    contact: '',
    jobType: 'Full-time',
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = getToken();

    if (!token) {
      setMessage('Please log in to post a job');
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(`http://localhost:4000/api/jobs/create`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/all-jobs');
    } catch (err) {
      console.error("Error response:", err.response);
      setMessage(err.response?.data?.message || 'Failed to create job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            Post Your <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Dream Opportunity</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with top-tier talent and find the perfect candidate for your team. 
            Our platform reaches thousands of qualified professionals.
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Information Section */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Building className="w-6 h-6 text-amber-600" />
                  Basic Information
                </h2>
              </div>

              {[
                { 
                  label: 'Job Title*', 
                  name: 'title', 
                  icon: <Briefcase className="h-5 w-5" />, 
                  placeholder: 'e.g. Senior React Developer, Product Manager...',
                  colSpan: 'md:col-span-2'
                },
                { 
                  label: 'Company Name*', 
                  name: 'company', 
                  icon: <UserCheck className="h-5 w-5" />, 
                  placeholder: 'Your company name',
                  colSpan: 'md:col-span-1'
                },
                { 
                  label: 'Job Type*', 
                  name: 'jobType', 
                  icon: <Target className="h-5 w-5" />, 
                  placeholder: 'Select job type',
                  colSpan: 'md:col-span-1',
                  custom: true
                },
                { 
                  label: 'Location*', 
                  name: 'location', 
                  icon: <MapPin className="h-5 w-5" />, 
                  placeholder: 'e.g. New York, Remote, Hybrid',
                  colSpan: 'md:col-span-1'
                },
                { 
                  label: 'Salary Range*', 
                  name: 'salary', 
                  type: 'text', 
                  icon: <DollarSign className="h-5 w-5" />, 
                  placeholder: 'e.g. $80,000 - $100,000',
                  colSpan: 'md:col-span-1'
                },
                { 
                  label: 'Contact Email*', 
                  name: 'contact', 
                  icon: <Mail className="h-5 w-5" />, 
                  placeholder: 'hr@yourcompany.com',
                  colSpan: 'md:col-span-2'
                },
              ].map(({ label, name, type = 'text', icon, placeholder, colSpan, custom }) => (
                <div key={name} className={`${colSpan} space-y-3`}>
                  <label className="block text-sm font-semibold text-slate-700">{label}</label>
                  
                  {custom ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex justify-between items-center pl-11 pr-4 py-4 border border-slate-300 rounded-2xl bg-white text-left hover:border-slate-400 transition-colors duration-200"
                      >
                        <span className="text-slate-700">{formData.jobType}</span>
                        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                        {icon}
                      </div>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
                          >
                            {jobTypes.map((type) => (
                              <div
                                key={type}
                                className="px-4 py-3 hover:bg-amber-50 cursor-pointer flex items-center transition-colors duration-150"
                                onClick={() => {
                                  setFormData({...formData, jobType: type});
                                  setIsDropdownOpen(false);
                                }}
                              >
                                <span className="text-slate-700">{type}</span>
                                {formData.jobType === type && <Check className="ml-auto h-4 w-4 text-amber-600" />}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-slate-400">
                        {icon}
                      </div>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                        placeholder={placeholder}
                        className="w-full pl-11 pr-4 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white text-slate-700 placeholder-slate-500"
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Detailed Information Section */}
              <div className="md:col-span-2 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-amber-600" />
                  Role Details
                </h2>
              </div>

              {[
                {
                  label: 'Job Description*',
                  name: 'description',
                  placeholder: 'Describe the role, team dynamics, company culture, and what makes this opportunity special...',
                  icon: <FileText className="h-5 w-5" />,
                  rows: 4
                },
                {
                  label: 'Key Responsibilities*',
                  name: 'responsibilities',
                  placeholder: 'List primary responsibilities and daily tasks. Use bullet points for better readability...',
                  icon: <Target className="h-5 w-5" />,
                  rows: 4
                },
                {
                  label: 'Requirements & Qualifications*',
                  name: 'requirements',
                  placeholder: 'List required skills, experience, education, and nice-to-have qualifications...',
                  icon: <Award className="h-5 w-5" />,
                  rows: 4
                },
              ].map(({ label, name, placeholder, icon, rows }) => (
                <div key={name} className="md:col-span-2 space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">{label}</label>
                  <div className="relative">
                    <div className="absolute left-4 top-4 text-slate-400">
                      {icon}
                    </div>
                    <textarea
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      rows={rows}
                      placeholder={placeholder}
                      className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white text-slate-700 placeholder-slate-500 resize-none"
                    />
                  </div>
                </div>
              ))}

              {/* Submit Button */}
              <div className="md:col-span-2 pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Opportunity...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      Launch Your Job Opportunity
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Message Display */}
              {message && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`md:col-span-2 text-center p-4 rounded-2xl ${
                    message.includes('log in') 
                      ? 'bg-red-100 text-red-700 border border-red-200' 
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </form>
          </div>

          {/* Footer Note */}
          <div className="bg-slate-50 border-t border-slate-200 px-8 py-6">
            <p className="text-center text-slate-600 text-sm">
              💫 Your job posting will be reviewed and typically goes live within 2-4 hours. 
              Need help? Contact our support team.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JobCreateForm;