"use client"
import React, { useState, useEffect } from 'react';
import { Clipboard, Check, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Calendar, GraduationCap, Briefcase, Code, Star, ChevronDown, Menu, X } from 'lucide-react';
import Image from "next/image";

type CopyTextProps = {
  text: string;
  className?: string;
};


export const CopyText: React.FC<CopyTextProps> = ({ text, className = "" }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e?: React.MouseEvent | React.KeyboardEvent) => {
    // prevent link navigation when inside <a>
    e?.preventDefault();
    e?.stopPropagation();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div
      className={`relative group mx-auto w-full max-w-[240px] ${className}`}
    >
      {/* Centered/truncated text - also copies on click */}
      <button
        onClick={handleCopy}
        className="block w-full text-gray-400 text-sm text-center truncate mx-auto select-none focus:outline-none"
        title={text}
      >
        {text}
      </button>

      {/* Overlay copy control; pointer-events enabled and stops nav */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center
                   opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                   transition-opacity"
      >
        <button
          onClick={handleCopy}
          className="pointer-events-auto rounded-full bg-black/40 backdrop-blur px-2 py-2
                     border border-white/10 focus:outline-none"
          aria-label="Copy"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Clipboard size={16} className="text-gray-200" />
          )}
        </button>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skills = {
    languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C/C++', 'SQL'],
    frameworks: ['Next.js', 'React.js', 'Node.js', 'FastAPI', 'Flask'],
    tools: ['Git', 'Docker', 'AWS', 'Azure', 'Vercel', 'Redis'],
    ai: ['LangChain', 'LangGraph', 'OpenAI', 'RAG', 'NLP', 'Scikit-learn', 'Pandas', 'NumPy']
  };

  const projects = [
    {
      title: 'Full-Stack AI RAG Chat App',
      date: 'June 2025',
      description: 'Production-grade RAG application with multimodal support for various file types.',
      tech: ['LangChain', 'OpenAI', 'Redis', 'AWS EC2'],
      link: 'https://www.harshalgunjal.in/',
      featured: true
    },
    {
      title: 'Payment Wallet Website',
      date: 'Jan 2025',
      description: 'Secure end-to-end payment wallet with robust architecture using MERN stack.',
      tech: ['MERN', 'Turborepo', 'Next Auth', 'Zod', 'AWS EC2'],
      link: 'https://github.com/HarshalGunjalOp/paytm-wallet-clone',
      featured: true
    },
    {
      title: 'P2P Video Conferencing Platform',
      date: 'Dec 2024 - Jan 2025',
      description: 'Omegle-like platform with real-time video communication and integrated chat.',
      tech: ['WebRTC', 'Socket.io', 'Vercel', 'Railway'],
      link: 'https://omegle-clone-frontend-umber.vercel.app/',
      featured: true
    },
    {
      title: 'Reddit Sentiment Analysis',
      date: 'Nov 2024',
      description: 'Real-time sentiment analysis and topic modeling of Reddit comments.',
      tech: ['Python', 'NLTK', 'BERTopic', 'SQLite'],
      link: '#',
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Harshal Gunjal
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-all duration-300 hover:text-blue-400 ${
                    activeSection === item.toLowerCase() ? 'text-blue-400 font-medium' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              {['Home', 'About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left py-2 px-4 transition-all duration-300 hover:text-blue-400 ${
                    activeSection === item.toLowerCase() ? 'text-blue-400 font-medium' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full p-[3px] bg-gradient-to-r from-blue-500 to-purple-500">
    <div className="w-full h-full rounded-full overflow-hidden">
      <Image
        src="/logo.png"
        alt="HG"
        width={128}
        height={128}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Harshal Gunjal
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
              Full Stack Developer & Data Science Student
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Building innovative AI-powered applications and scalable web solutions with modern technologies
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="mailto:23f2001627@ds.study.iitm.ac.in?subject=Hello Harshal&body=Hi Harshal,%0A%0AI came across your portfolio and would like to connect.%0A%0ABest regards" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300 border border-white/20">
              <Mail size={20} />
              Contact Me
            </a>
            <a href="https://github.com/HarshalGunjalOp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 px-6 py-3 rounded-full transition-all duration-300">
              <Github size={20} />
              GitHub
            </a>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">Full Stack Developer & AI Enthusiast</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a Data Science student at IIT Madras with hands-on experience in designing, building, and deploying end-to-end AI and full-stack applications. My expertise spans from developing advanced RAG systems to building scalable web applications.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Proficient in developing systems using Retrieval-Augmented Generation (RAG), Large Language Models (LLMs), and NLP techniques. I love creating solutions that bridge the gap between AI capabilities and real-world applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+919325891730" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <Phone size={18} />
                  +91 9325891730
                </a>
                <a href="https://linkedin.com/in/harshalgunjal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <span className="flex items-center gap-2 text-gray-400">
                  <MapPin size={18} />
                  Mumbai, Maharashtra
                </span>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h4 className="text-xl font-semibold mb-6 text-purple-400">Key Achievements</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="text-yellow-400 flex-shrink-0 mt-1" size={16} />
                  <span className="text-gray-300">Grew event management platform to 350+ active users</span>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="text-yellow-400 flex-shrink-0 mt-1" size={16} />
                  <span className="text-gray-300">Built production-grade AI applications with RAG</span>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="text-yellow-400 flex-shrink-0 mt-1" size={16} />
                  <span className="text-gray-300">Deployed scalable solutions on AWS and cloud platforms</span>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="text-yellow-400 flex-shrink-0 mt-1" size={16} />
                  <span className="text-gray-300">Maintained 8.73 CGPA at IIT Madras</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <GraduationCap className="text-blue-400" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400">Indian Institute of Technology, Madras</h3>
                    <p className="text-gray-300">Bachelor's in Data Science and Applications</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold text-lg">CGPA: 8.73</p>
                  <p className="text-gray-400 text-sm">May 2023 - Present</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Pursuing a comprehensive program in Data Science and Applications, focusing on machine learning, 
                statistical analysis, and AI applications. Active participant in student clubs and technical projects.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300 mt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <GraduationCap className="text-purple-400" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400">Atomic Energy Central School No.3</h3>
                    <p className="text-gray-300">Senior High School (12th Grade)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold text-lg">91%</p>
                  <p className="text-gray-400 text-sm">April 2011 - March 2024</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Completed senior secondary education with distinction, building a strong foundation in 
                mathematics and science that paved the way for higher studies in technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <Briefcase className="text-blue-400 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400">Full Stack Web Developer</h3>
                    <p className="text-gray-300">Solitary (IITM Student Club)</p>
                    <p className="text-gray-400 text-sm">Chennai, Tamil Nadu</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 font-semibold">March 2024 - September 2024</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 leading-relaxed">
                    Developed and launched a full-stack Event Management System using the MERN stack to centralize 
                    event registration and tracking for students
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 leading-relaxed">
                    Engineered a user-facing dashboard for seamless event registration and an admin panel for 
                    comprehensive event management, simplifying logistics for organizers
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 leading-relaxed">
                    Successfully grew the platform to support over <span className="text-green-400 font-semibold">350 active users</span> by 
                    addressing a key organizational challenge within the student community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 ${
                  project.featured ? 'lg:col-span-1' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="text-blue-400" size={20} />
                    <span className="text-sm text-gray-400">{project.date}</span>
                  </div>
                  {project.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-purple-400">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-blue-600/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                  >
                    <span>View Project</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
                <Code size={20} />
                Languages
              </h3>
              <div className="space-y-2">
                {skills.languages.map((skill, index) => (
                  <div key={index} className="text-gray-300 hover:text-white transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-purple-400 flex items-center gap-2">
                <Code size={20} />
                Frameworks
              </h3>
              <div className="space-y-2">
                {skills.frameworks.map((skill, index) => (
                  <div key={index} className="text-gray-300 hover:text-white transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-2">
                <Code size={20} />
                Tools & Cloud
              </h3>
              <div className="space-y-2">
                {skills.tools.map((skill, index) => (
                  <div key={index} className="text-gray-300 hover:text-white transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-pink-400 flex items-center gap-2">
                <Code size={20} />
                AI & Data Science
              </h3>
              <div className="space-y-2">
                {skills.ai.map((skill, index) => (
                  <div key={index} className="text-gray-300 hover:text-white transition-colors">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            I'm always interested in new opportunities and collaborations. Let's build something amazing together!
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           <a
  href="mailto:23f2001627@ds.study.iitm.ac.in?subject=Portfolio Contact&body=Hi Harshal,%0A%0AI found your portfolio and would like to discuss potential opportunities.%0A%0ABest regards"
  className="relative min-w-0 bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
>
  <Mail className="text-blue-400 mx-auto mb-4" size={32} />
  <h3 className="text-lg font-semibold mb-2">Email</h3>
  <CopyText
    text="23f2001627@ds.study.iitm.ac.in"
    className="min-w-0"
  />
</a> 

           <a
  href="tel:+919325891730"
  className="relative min-w-0 bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105"
>
  <Phone className="text-green-400 mx-auto mb-4" size={32} />
  <h3 className="text-lg font-semibold mb-2">Phone</h3>
  <CopyText text="+91 9325891730" className="min-w-0" />
</a> 

           <a
  href="https://linkedin.com/in/harshalgunjal"
  target="_blank"
  rel="noopener noreferrer"
  className="relative min-w-0 bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
>
  <Linkedin className="text-blue-400 mx-auto mb-4" size={32} />
  <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
  <CopyText text="linkedin.com/in/harshalgunjal" className="min-w-0" />
</a> 

            <a
  href="https://github.com/HarshalGunjalOp"
  target="_blank"
  rel="noopener noreferrer"
  className="relative min-w-0 bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105"
>
  <Github className="text-blue-400 mx-auto mb-4" size={32} />
  <h3 className="text-lg font-semibold mb-2">GitHub</h3>
  <CopyText text="github.com/HarshalGunjalOp" className="min-w-0" />
</a>          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Ready to collaborate?</h3>
            <p className="text-blue-100 mb-6">
              Whether it's a full-stack application, AI integration, or innovative web solution, I'm here to help bring your ideas to life.
            </p>
            <a
              href="mailto:23f2001627@ds.study.iitm.ac.in?subject=Collaboration Opportunity&body=Hi Harshal,%0A%0AI'd like to discuss a potential collaboration opportunity.%0A%0ABest regards"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              <Mail size={20} />
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-white/10">
        <p>&copy; 2025 Harshal Gunjal.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
