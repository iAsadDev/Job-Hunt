import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 

const Footer =() => {
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


    return(
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-10 mb-16"
          >
            <motion.div variants={item}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-white text-indigo-600 px-3 py-2 rounded-lg mr-2">Job</span>
                <span className="text-yellow-300">Hunt</span>
              </h3>
              <p className="text-gray-400 mb-4">The best platform for job seekers and employers.</p>
              <div className="flex space-x-4">
                {["📱", "📘", "🐦", "💼"].map((icon, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -3 }}
                    href="#" 
                    className="text-gray-400 hover:text-yellow-300 transition text-xl"
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={item}>
              <h4 className="font-semibold text-xl mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Jobs", "About", "Contact"].map((link, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 5 }}
                  >
                    <Link to={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-yellow-300 transition flex items-center">
                      <span className="mr-2">→</span> {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={item}>
              <h4 className="font-semibold text-xl mb-6">Resources</h4>
              <ul className="space-y-3">
                {["Blog", "Career Advice", "FAQ", "Help Center"].map((link, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 5 }}
                  >
                    <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-yellow-300 transition flex items-center">
                      <span className="mr-2">→</span> {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={item}>
              <h4 className="font-semibold text-xl mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get job alerts and career tips</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-700 text-white px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-r-lg transition"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-gray-700 pt-10 text-center text-gray-500"
          >
            <p>© 2025 JobHunt. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    )}

export default Footer;