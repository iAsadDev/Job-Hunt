import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import { Briefcase, MapPin, DollarSign, Mail, UserCheck, ChevronDown, Check } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto p-6 my-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Post Your Dream Job
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Reach top talent with our platform. Fill in the details below and find your perfect candidate!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { label: 'Job Title*', name: 'title', icon: <Briefcase className="h-5 w-5" />, placeholder: 'e.g. Senior React Developer' },
          { label: 'Company Name*', name: 'company', icon: <UserCheck className="h-5 w-5" />, placeholder: 'Your company name' },
          { label: 'Location*', name: 'location', icon: <MapPin className="h-5 w-5" />, placeholder: 'e.g. New York, Remote' },
          { label: 'Salary Range*', name: 'salary', type: 'text', icon: <DollarSign className="h-5 w-5" />, placeholder: 'e.g. $80,000 - $100,000' },
          { label: 'Contact Email*', name: 'contact', icon: <Mail className="h-5 w-5" />, placeholder: 'hr@yourcompany.com' },
        ].map(({ label, name, type = 'text', icon, placeholder }) => (
          <div key={name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-400">
                {icon}
              </div>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        ))}

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Job Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe the role, team, and company culture..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Responsibilities*</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            required
            rows={4}
            placeholder="List key responsibilities (bullet points work well)..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Requirements*</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
            rows={4}
            placeholder="List required skills and qualifications..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Job Type*</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center pl-4 pr-3 py-3 border border-gray-300 rounded-xl bg-white text-left"
            >
              <span>{formData.jobType}</span>
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {jobTypes.map((type) => (
                  <div
                    key={type}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                    onClick={() => {
                      setFormData({...formData, jobType: type});
                      setIsDropdownOpen(false);
                    }}
                  >
                    {type}
                    {formData.jobType === type && <Check className="ml-auto h-4 w-4 text-blue-600" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting Job...
              </span>
            ) : (
              '🌟 Post Job Opportunity'
            )}
          </button>
        </div>

        {message && (
          <div className={`md:col-span-2 text-center p-3 rounded-lg ${message.includes('log in') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
      </form>

      
    </div>
  );
};

export default JobCreateForm;