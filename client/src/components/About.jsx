import React from 'react';
import { Linkedin, Github, Globe, Code, Coffee, Terminal, Rocket, Cpu, Palette, Building, Award, Users, Target, Heart, Mail, MapPin, Calendar, Zap, Shield, Star, TrendingUp, Lightbulb, GitBranch, Database, Cloud, Smartphone, Globe2 } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Decorative background elements */}
        <div className="fixed top-20 left-10 w-32 h-32 rounded-full bg-amber-100/50 blur-xl"></div>
        <div className="fixed bottom-20 right-10 w-40 h-40 rounded-full bg-blue-100/50 blur-xl"></div>
        <div className="fixed top-1/2 left-1/4 w-24 h-24 rounded-full bg-green-100/30 blur-xl"></div>
        
        {/* Main Container */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 backdrop-blur-sm">
          
          {/* Hero Header Section */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 p-8 md:p-12 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl transform translate-x-40 -translate-y-40"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl transform -translate-x-40 translate-y-40"></div>
            <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-purple-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-amber-400/20 rounded-2xl backdrop-blur-sm">
                      <Building className="h-8 w-8 text-amber-400" />
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                        JobHunt
                      </h1>
                      <p className="text-slate-300 text-lg mt-2">Revolutionizing Career Connections</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold">Asad Qayyum</h2>
                    <p className="text-xl text-slate-300">Founder & Chief Executive Officer</p>
                    <p className="text-slate-400 max-w-2xl">Full Stack Architect • Product Visionary • Tech Entrepreneur</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {[
                    { href: "https://asadqayyum.netlify.app/", icon: Globe, label: "Portfolio" },
                    { href: "https://github.com/iAsadDev", icon: Github, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/asad-qayyum-2646ba251", icon: Linkedin, label: "LinkedIn" },
                  ].map(({ href, icon: Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" 
                       className="group p-4 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20">
                      <Icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="p-8 md:p-12 space-y-12">
            
            {/* CEO Introduction & Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* CEO Profile Card */}
              <div className="lg:col-span-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-2xl shadow-2xl text-center">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Terminal className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Asad Qayyum</h3>
                    <p className="text-amber-100 font-medium">Founder & CEO</p>
                    <p className="text-amber-200 text-sm mt-2">Leading Digital Transformation</p>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-center gap-2 text-amber-100 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>Pakistan</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-amber-100 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Founded 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 rounded-2xl">
                      <Rocket className="h-6 w-6 text-amber-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    At <strong className="text-amber-600">JobHunt</strong>, we're on a mission to transform the way professionals connect with career opportunities. 
                    We believe that finding the perfect job should be an empowering, efficient, and enjoyable experience—not 
                    the frustrating and time-consuming process it often is today.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Under my leadership as Founder and CEO, we're building an intelligent platform that goes beyond traditional 
                    job boards. We're creating a dynamic ecosystem where cutting-edge technology meets human ambition, fostering 
                    meaningful connections that drive career growth and business success.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Lightning-Fast Matching</h4>
                      <p className="text-slate-600 text-sm">AI-powered algorithms that connect talent with opportunities in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Verified Opportunities</h4>
                      <p className="text-slate-600 text-sm">Every listing is thoroughly vetted to ensure quality and authenticity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Values & Stats */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Why JobHunt Stands Out</h2>
                <p className="text-slate-600 max-w-3xl mx-auto">
                  We've reimagined every aspect of the job search experience to create a platform that truly serves both job seekers and employers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Target, title: "Precision Matching", desc: "Advanced AI algorithms that understand your skills, preferences, and career goals", color: "blue" },
                  { icon: TrendingUp, title: "Career Growth", desc: "Tools and insights to help you plan and achieve your long-term career objectives", color: "green" },
                  { icon: Users, title: "Vibrant Community", desc: "Connect with professionals, mentors, and companies in your industry", color: "purple" },
                  { icon: Lightbulb, title: "Smart Insights", desc: "Data-driven recommendations and market trends to inform your career decisions", color: "amber" },
                ].map(({ icon: Icon, title, desc, color }) => (
                  <div key={title} className={`bg-${color}-50 p-6 rounded-2xl border border-${color}-100 hover:shadow-lg transition-all duration-300 group`}>
                    <div className={`p-3 bg-${color}-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 text-${color}-600`} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-3 text-lg">{title}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Excellence */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-slate-900 rounded-2xl">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Technical Excellence</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-800">My Development Journey</h3>
                  <p className="text-slate-700 leading-relaxed">
                    My passion for technology ignited when I built my first website at 16. What started as curiosity 
                    evolved into a deep expertise in full-stack JavaScript development. Over the years, I've mastered 
                    modern technologies including React, Next.js, Node.js, and cloud infrastructure.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    I've dedicated countless hours to honing my craft, building performant, scalable, and accessible 
                    applications that solve real-world problems. This technical foundation enables me to lead JobHunt 
                    with both visionary thinking and practical execution.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: GitBranch, tech: "React & Next.js" },
                      { icon: Database, tech: "Node.js & MongoDB" },
                      { icon: Cloud, tech: "Cloud Architecture" },
                      { icon: Smartphone, tech: "Mobile First" },
                    ].map(({ icon: Icon, tech }) => (
                      <div key={tech} className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-amber-600" />
                        <span className="text-slate-700 text-sm font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-800">Building JobHunt</h3>
                  <p className="text-slate-700 leading-relaxed">
                    JobHunt represents the culmination of my technical expertise and entrepreneurial vision. 
                    We're not just building another job platform—we're engineering a comprehensive ecosystem 
                    that transforms how careers are built and opportunities are discovered.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    As CEO, I'm deeply involved in every aspect of our technology stack, from database architecture 
                    to user interface design. This hands-on approach ensures we maintain our commitment to excellence 
                    while rapidly innovating to serve our growing community.
                  </p>
                  
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Globe2 className="h-4 w-4 text-amber-600" />
                      <span>Serving users worldwide with cutting-edge technology</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Philosophy */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership Philosophy</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Heart, title: "User-Centric", desc: "Every decision starts with how it benefits our users", color: "rose" },
                  { icon: Zap, title: "Innovation Driven", desc: "Constantly pushing boundaries to deliver exceptional experiences", color: "amber" },
                  { icon: Shield, title: "Integrity First", desc: "Building trust through transparency and reliability", color: "blue" },
                ].map(({ icon: Icon, title, desc, color }) => (
                  <div key={title} className="text-center p-6">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-${color}-100 rounded-2xl flex items-center justify-center`}>
                      <Icon className={`h-8 w-8 text-${color}-600`} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-3 text-lg">{title}</h3>
                    <p className="text-slate-600 text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Ready to Transform Careers Together?</h3>
                  <p className="text-amber-100 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                    Whether you're seeking your next career opportunity, looking to hire exceptional talent, 
                    or interested in collaborating on the future of career technology—let's connect and create 
                    something remarkable.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <a href="https://www.linkedin.com/in/asad-qayyum-2646ba251" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="bg-white text-amber-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-3">
                      <Linkedin className="h-5 w-5" />
                      Connect on LinkedIn
                    </a>
                    <a href="https://github.com/iAsadDev" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-3">
                      <Github className="h-5 w-5" />
                      Explore Code
                    </a>
                    <a href="https://asadqayyum.netlify.app/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-3">
                      <Globe className="h-5 w-5" />
                      Visit Portfolio
                    </a>
                  </div>
                  <p className="text-amber-200 text-sm mt-8">
                    Let's build the future of careers, together. 💫
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;