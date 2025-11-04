import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail,
  ArrowRight,
  Building,
  FileText,
  HelpCircle,
  BookOpen,
  Heart
} from 'lucide-react';

const Footer = () => {
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

  const socialIcons = [
    { icon: Smartphone, href: "#", label: "Mobile" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs/all-jobs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const resourceLinks = [
    { name: "Blog", path: "/blog" },
    { name: "Career Advice", path: "/career-advice" },
    { name: "FAQ", path: "/faq" },
    { name: "Help Center", path: "/help" }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-10 mb-16"
        >
          {/* Company Info */}
          <motion.div variants={item} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500 rounded-xl">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">
                <span className="text-white">Job</span>
                <span className="text-amber-400">Hunt</span>
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Connecting top talent with dream opportunities through intelligent matching and seamless experiences.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ icon: Icon, href, label }, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={href} 
                  className="p-3 bg-slate-800 hover:bg-amber-500 rounded-xl transition-all duration-300 group"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-slate-300 group-hover:text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={item}>
            <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-amber-400" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-slate-300 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Resources */}
          <motion.div variants={item}>
            <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-400" />
              Resources
            </h4>
            <ul className="space-y-4">
              {resourceLinks.map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-slate-300 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div variants={item}>
            <h4 className="font-bold text-xl mb-6 flex items-center gap-2">
              <Mail className="h-5 w-5 text-amber-400" />
              Stay Updated
            </h4>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Get the latest job alerts, career tips, and industry insights delivered to your inbox.
            </p>
            <div className="space-y-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-800 text-white px-4 py-3 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 w-full placeholder-slate-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 py-3 rounded-r-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-slate-400 text-xs">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-slate-700 pt-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Heart className="h-4 w-4 text-amber-400" />
              <p>© 2024 JobHunt. Crafted with passion for better career connections.</p>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link to="/privacy" className="hover:text-amber-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-amber-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-amber-400 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-slate-400 text-sm"
        >
          <p>Join thousands of professionals who found their dream jobs through JobHunt</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;