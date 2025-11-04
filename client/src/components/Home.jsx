import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaRocket,
  FaShieldAlt,
  FaAward,
  FaLaptopCode,
  FaBullhorn,
  FaPalette,
  FaHandsHelping,
  FaMoneyBillWave,
  FaGraduationCap,
  FaHeartbeat,
  FaCogs,
  FaCheckCircle,
  FaUsers,
  FaBuilding,
  FaSearch,
  FaLinkedin,
  FaRegClock,
  FaChartLine,
  FaGlobeAmericas,
  FaUserTie,
  FaLightbulb
} from "react-icons/fa";
import Footer from "./footer";

const Home = () => {
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

  const features = [
    {
      icon: FaSearch,
      title: "Smart Job Matching",
      description: "Our AI-powered algorithm matches your skills and preferences with the perfect job opportunities from our extensive network of top companies.",
      stats: "94% Match Accuracy"
    },
    {
      icon: FaShieldAlt,
      title: "Verified Employers",
      description: "Every company on our platform is thoroughly vetted to ensure genuine opportunities and transparent hiring processes.",
      stats: "2,400+ Verified Companies"
    },
    {
      icon: FaChartLine,
      title: "Career Growth Tools",
      description: "Access personalized career coaching, resume optimization, and interview preparation to accelerate your professional development.",
      stats: "2.3x Career Growth"
    }
  ];

  const categories = [
    {
      icon: FaLaptopCode,
      name: "Technology",
      jobs: "3,247",
      description: "Software development, AI engineering, cloud architecture",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaBullhorn,
      name: "Marketing",
      jobs: "1,856",
      description: "Digital marketing, brand strategy, content creation",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FaPalette,
      name: "Design",
      jobs: "1,234",
      description: "UI/UX design, product design, creative direction",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: FaMoneyBillWave,
      name: "Finance",
      jobs: "2,189",
      description: "Investment banking, financial analysis, accounting",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: FaGraduationCap,
      name: "Education",
      jobs: "956",
      description: "Teaching, curriculum development, educational technology",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: FaHeartbeat,
      name: "Healthcare",
      jobs: "3,124",
      description: "Medical professionals, healthcare administration, research",
      color: "from-rose-500 to-red-500"
    },
    {
      icon: FaCogs,
      name: "Engineering",
      jobs: "2,867",
      description: "Mechanical, electrical, civil engineering roles",
      color: "from-slate-600 to-slate-700"
    },
    {
      icon: FaUserTie,
      name: "Business",
      jobs: "2,543",
      description: "Management, consulting, business development",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "85,000+", label: "Active Professionals", icon: FaUsers },
    { number: "12,400+", label: "Job Opportunities", icon: FaBuilding },
    { number: "3,200+", label: "Partner Companies", icon: FaGlobeAmericas },
    { number: "4.8/5", label: "User Satisfaction", icon: FaAward }
  ];

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              Find Your Next 
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                Career Move
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed"
            >
              Connect with top employers and discover opportunities that align with your skills, 
              ambitions, and career goals. Your next professional chapter starts here.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Link to="/jobs/all-jobs" className="w-full sm:w-auto">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                  <FaSearch className="text-lg" />
                  Explore Job Opportunities
                </button>
              </Link>
              <Link to="/register" className="w-full sm:w-auto">
                <button className="w-full bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-3">
                  <FaRocket className="text-lg" />
                  Start Your Journey
                </button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-slate-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We've built a comprehensive ecosystem designed to connect talented professionals 
              with meaningful career opportunities at leading companies worldwide.
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <FaCheckCircle className="w-5 h-5" />
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* JOB CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Explore Career Paths
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover opportunities across diverse industries and specializations. 
              Find your perfect fit among thousands of curated job listings.
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-300 group-hover:shadow-lg h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{category.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">{category.jobs} jobs</span>
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                      <FaRegClock className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/jobs/all-jobs">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-3">
                <FaSearch className="w-5 h-5" />
                View All Job Categories
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our streamlined process makes finding your next career opportunity simple and efficient
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Build a comprehensive profile showcasing your skills, experience, and career aspirations",
                icon: FaUserTie
              },
              {
                step: "02",
                title: "Discover Opportunities",
                description: "Browse curated job listings matched to your profile and preferences",
                icon: FaSearch
              },
              {
                step: "03",
                title: "Apply & Connect",
                description: "Submit applications and connect directly with hiring managers and recruiters",
                icon: FaHandsHelping
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <span className="text-white font-bold text-2xl">{step.step}</span>
                  <div className="absolute -inset-4 bg-blue-100 rounded-full -z-10"></div>
                </div>
                <step.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYER SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FaLightbulb className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Are You an Employer?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of companies who have found their perfect candidates through our platform. 
                Post jobs, access premium talent, and streamline your hiring process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/post-job">
                  <button className="bg-white text-blue-600 hover:bg-slate-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                    Post a Job Opening
                  </button>
                </Link>
                <Link to="/employer-register">
                  <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300">
                    Learn More for Employers
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Advance Your Career?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our community of professionals and take the next step in your career journey. 
              Create your free account and start exploring opportunities today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3">
                  <FaRocket className="w-5 h-5" />
                  Get Started - It's Free
                </button>
              </Link>
              <Link to="/about">
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300">
                  Learn More About Us
                </button>
              </Link>
            </div>
            <p className="text-slate-400 mt-6 text-sm">
              No credit card required • Setup takes 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;