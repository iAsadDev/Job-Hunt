import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

  return (
    <div className="font-sans bg-gradient-to-b from-gray-50 to-indigo-50">
      {/* HERO SECTION */}
      <header className="bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Find Your <span className="text-yellow-400">Dream Job</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
          >
            Join thousands of professionals hiring or applying through our platform.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-6"
          >
            <Link to="/jobs/all-jobs">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                Explore Jobs
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-white/90 hover:bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                Sign Up Free
              </button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
              We provide the best platform to connect job seekers with top employers
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              { 
                title: "Verified Listings", 
                desc: "Only genuine employers and job posts.",
                icon: "🔍",
                color: "from-blue-500 to-blue-600"
              },
              { 
                title: "Easy Apply", 
                desc: "One-click apply to multiple jobs.",
                icon: "⚡",
                color: "from-purple-500 to-purple-600"
              },
              { 
                title: "Career Guidance", 
                desc: "Resources to grow your career.",
                icon: "📈",
                color: "from-pink-500 to-pink-600"
              },
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={item}
                className={`bg-gradient-to-br ${feature.color} text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
              >
                <div className="text-5xl mb-6 animate-bounce">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-white/90">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* JOB CATEGORIES */}
      <section className="py-24 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Browse by Category</h2>
            <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
              Find jobs in your field of expertise
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { name: "Tech", icon: "💻", color: "bg-blue-500/10 text-blue-600 border-blue-500" },
              { name: "Marketing", icon: "📢", color: "bg-purple-500/10 text-purple-600 border-purple-500" },
              { name: "Design", icon: "🎨", color: "bg-pink-500/10 text-pink-600 border-pink-500" },
              { name: "Support", icon: "🤝", color: "bg-green-500/10 text-green-600 border-green-500" },
              { name: "Finance", icon: "💰", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500" },
              { name: "Education", icon: "📚", color: "bg-amber-500/10 text-amber-600 border-amber-500" },
              { name: "Healthcare", icon: "🏥", color: "bg-red-500/10 text-red-600 border-red-500" },
              { name: "Engineering", icon: "⚙️", color: "bg-indigo-500/10 text-indigo-600 border-indigo-500" },
            ].map((category, i) => (
              <motion.div 
                key={i} 
                variants={item}
                whileHover={{ scale: 1.05 }}
                className={`${category.color} border-2 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h4 className="font-bold">{category.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to find your perfect job?</h2>
            <p className="text-2xl mb-10">Join thousands of professionals who found their dream jobs through us</p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="inline-block"
            >
              <Link to="/register">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl">
                  Get Started - It's Free!
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>  
      {/* FOOTER */}
      <Footer />
     
    </div>
  );
};

export default Home;