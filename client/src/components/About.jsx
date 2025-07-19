import React from 'react';
import { Linkedin, Github, Globe, Code, Coffee, Terminal, Rocket, Cpu, Palette } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdfa] to-[#ecfdf5] flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-100/50 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-rose-100/50 blur-xl"></div>
        
        <div className="relative bg-white rounded-[2rem] shadow-lg overflow-hidden border border-gray-100/50">
          {/* Header section */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Asad Qayyum</h1>
                <p className="text-xl text-teal-100">Full Stack Developer & UI Enthusiast</p>
              </div>
              <div className="flex gap-4">
                <a href="https://asadqayyum.netlify.app/" target="_blank" rel="noopener noreferrer" 
                   className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all hover:scale-110">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="https://github.com/iAsadDev" target="_blank" rel="noopener noreferrer" 
                   className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all hover:scale-110">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/asad-qayyum-2646ba251" target="_blank" rel="noopener noreferrer" 
                   className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-12">
            {/* Left column - Image placeholder */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative w-64 h-64 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Terminal className="h-24 w-24 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/20 p-4 backdrop-blur-sm">
                  <p className="text-white font-medium text-center">Crafting digital experiences</p>
                </div>
              </div>
            </div>

            {/* Middle column - About text */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Rocket className="text-teal-600 h-6 w-6" />
                  My Journey
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  I'm a passionate developer with expertise in React, Node.js, and modern web technologies. 
                  My journey began when I built my first website at 16, sparking a lifelong love for creating 
                  digital experiences that are both beautiful and functional.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Cpu className="text-teal-600 h-6 w-6" />
                  Technical Skills
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  I specialize in full-stack JavaScript development, with a focus on creating performant, 
                  accessible applications. My toolkit includes React, Next.js, Node.js, Express, MongoDB, 
                  and modern CSS frameworks like Tailwind.
                </p>
              </div>
            </div>

            {/* Right column - Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-teal-50/60 p-6 rounded-xl border border-teal-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Code className="text-teal-600 h-5 w-5" />
                  <h3 className="font-bold text-gray-800">This Project</h3>
                </div>
                <p className="text-gray-700">
                  A showcase of modern React development with clean state management, responsive design, 
                  and seamless API integration for job posting functionality.
                </p>
              </div>

              <div className="bg-rose-50/60 p-6 rounded-xl border border-rose-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Palette className="text-rose-600 h-5 w-5" />
                  <h3 className="font-bold text-gray-800">Design Philosophy</h3>
                </div>
                <p className="text-gray-700">
                  I believe in interfaces that are intuitive, accessible, and delightful to use. 
                  Every pixel should serve a purpose while creating emotional connections.
                </p>
              </div>

              <div className="bg-amber-50/60 p-6 rounded-xl border border-amber-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Coffee className="text-amber-600 h-5 w-5" />
                  <h3 className="font-bold text-gray-800">Let's Connect</h3>
                </div>
                <p className="text-gray-700">
                  Open for collaborations, freelance projects, or tech discussions. 
                  Reach out via any of my social profiles—I'd love to hear from you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;