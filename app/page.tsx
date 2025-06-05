"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Portfolio() {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [showWork, setShowWork] = useState(false);

  // Helper to detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState({ type: "", message: "" })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Loading animation
    setTimeout(() => setIsLoading(false), 3000)

    // Intersection Observer for active section
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setFormStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." })
    // Reset form after 3 seconds
    setTimeout(() => {
      setContactForm({ name: "", email: "", message: "" })
      setFormStatus({ type: "", message: "" })
    }, 5000)
  }

  // Only show 4 skills on mobile unless expanded
  const visibleSkills = isMobile && !showAllSkills ? skills.slice(0, 4) : skills;

  const skills = [
    { name: "React", icon: "⚛️", color: "#61DAFB", level: 90 },
    { name: "Next.js", icon: "▲", color: "#000000", level: 85 },
    { name: "TypeScript", icon: "TS", color: "#3178C6", level: 80 },
    { name: "Python", icon: "🐍", color: "#3776AB", level: 95 },
    { name: "JavaScript", icon: "JS", color: "#F7DF1E", level: 90 },
    { name: "Node.js", icon: "📗", color: "#339933", level: 75 },
    { name: "MySQL", icon: "🗄️", color: "#4479A1", level: 85 },
    { name: "Git", icon: "🔀", color: "#F05032", level: 88 },
    { name: "HTML5", icon: "🌐", color: "#E34F26", level: 95 },
    { name: "CSS3", icon: "🎨", color: "#1572B6", level: 90 },
    { name: "OpenCV", icon: "👁️", color: "#5C3EE8", level: 80 },
    { name: "Excel", icon: "📊", color: "#217346", level: 92 },
  ]

  // Only show 4 projects on mobile unless expanded
  const visibleProjects = isMobile && !showAllProjects ? projects.slice(0, 4) : projects;

  const projects = [
    {
      title: "Weapon Detection & Alert System",
      description:
        "Advanced real-time weapon detection system using YOLOv5 and ONNX for enhanced security monitoring with instant alert capabilities.",
      tech: ["Python", "YOLOv5", "ONNX", "OpenCV", "Computer Vision"],
      github: "https://github.com/abhiii9vvv/WEPON-DETECTION-SYSTEM",
      image: "/projects/weapon-detection.png",
      featured: true,
      category: "AI/ML",
    },
    {
      title: "Sharda Alumni Portal",
      description:
        "Comprehensive full-stack platform connecting Sharda University alumni with advanced authentication, networking features, and event management.",
      tech: ["TypeScript", "React", "Node.js", "MongoDB", "Authentication"],
      github: "https://github.com/abhiii9vvv/SHARDA-ALUMNI-PORTAL",
      image: "/projects/alumni-portal.png",
      featured: true,
      category: "Full Stack",
    },
    {
      title: "Job Board Platform",
      description:
        "Modern job listing platform with glassmorphism UI, advanced filtering, and seamless user experience for the Indian tech ecosystem.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive Design"],
      github: "https://github.com/abhiii9vvv/Job_Board",
      image: "/projects/job-board.png",
      featured: true,
      category: "Web Development",
    },
    {
      title: "Price Tracker Website",
      description:
        "Smart price monitoring tool with real-time alerts, historical data visualization, and future price prediction graphs.",
      tech: ["JavaScript", "HTML5", "CSS3", "Web Scraping", "Charts.js"],
      github: "https://github.com/abhiii9vvv/Price-Tracker-Website",
      image: "/projects/price-tracker.png",
      featured: false,
      category: "Web Development",
    },
    {
      title: "VoiceVerse Assistant",
      description:
        "AI-powered voice assistant with natural language processing, system integration, and Windows automation capabilities.",
      tech: ["Python", "Speech Recognition", "NLP", "Windows API", "AI"],
      github: "https://github.com/abhiii9vvv/voice_verse",
      image: "/projects/voice-assistant.png",
      featured: false,
      category: "AI/ML",
    },
    {
      title: "Weather Application",
      description:
        "Beautiful weather app with real-time data, location-based forecasts, and intuitive user interface design.",
      tech: ["JavaScript", "OpenWeather API", "Responsive Design", "CSS3"],
      github: "https://github.com/abhiii9vvv/Weather_App",
      image: "/projects/weather-app.png",
      featured: false,
      category: "Web Development",
    },
    {
      title: "Animated To-Do App",
      description:
        "Modern task management application with smooth animations, filtering capabilities, and local storage persistence.",
      tech: ["JavaScript", "HTML5", "CSS3", "Local Storage", "Animations"],
      github: "https://github.com/abhiii9vvv/todo-list-by-abhinav",
      image: "/projects/todo-app.png",
      featured: false,
      category: "Web Development",
    },
  ]

  // Only show work experience if expanded on mobile
  const visibleWork = isMobile && !showWork ? workExperience.slice(0, 2) : workExperience;

  const workExperience = [
    {
      title: "Security & Surveillance",
      description:
        "Advanced AI-powered security solutions with real-time monitoring and threat detection capabilities.",
      icon: "/icons/security-icon.png",
    },
    {
      title: "Alumni Network Platform",
      description:
        "Comprehensive networking platform connecting university alumni with advanced features and authentication.",
      icon: "/icons/network-icon.png",
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile applications with modern UI/UX design and seamless user experience.",
      icon: "/icons/mobile-icon.png",
    },
    {
      title: "Web Development",
      description: "Full-stack web applications using modern frameworks and technologies for optimal performance.",
      icon: "/icons/web-icon.png",
    },
  ]

  // Only show certifications if expanded on mobile
  const visibleCerts = isMobile && !showCerts ? certifications.slice(0, 2) : certifications;

  const certifications = [
    {
      title: "React Mastery Workshop",
      issuer: "GitHub Club, Sharda University",
      date: "Feb 2025 - Mar 2025",
      description: "Advanced React.js training covering components, hooks, state management, and responsive design.",
    },
    {
      title: "Python Course For Beginners",
      issuer: "Scaler Topics",
      date: "Jan 2025 - Apr 2025",
      description: "Comprehensive Python programming with 121 tutorials, 16 modules, and 10 coding challenges.",
    },
    {
      title: "Front-End Web Development",
      issuer: "Udemy",
      date: "Apr 2024 - May 2024",
      description: "Complete web development course covering HTML, CSS, JavaScript, Bootstrap, and responsive design.",
    },
    {
      title: "Java Foundations",
      issuer: "Oracle Academy",
      date: "Oct 2024 - Nov 2024",
      description: "Core Java concepts including OOP, data structures, inheritance, and exception handling.",
    },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/abhiii9vvv",
      icon: "🔗",
      color: "from-gray-600 to-gray-800",
      username: "abhiii9vvv",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/abhinav-tiwary",
      icon: "💼",
      color: "from-blue-600 to-blue-800",
      username: "abhinav-tiwary",
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/Abhiii9vv",
      icon: "💻",
      color: "from-orange-600 to-orange-800",
      username: "Abhiii9vv",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/abhinavtiwary",
      icon: "🐦",
      color: "from-blue-400 to-blue-600",
      username: "@abhinavtiwary",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/abhinavtiwary",
      icon: "📸",
      color: "from-pink-500 to-purple-500",
      username: "@abhinavtiwary",
    },
  ]

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0118] via-[#1a0d2e] to-[#2d1b3d] flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-40 h-40 rounded-full border-4 border-purple-500/20 animate-pulse"></div>
          <div className="absolute inset-4 rounded-full border-4 border-purple-500/40 animate-ping"></div>
          <div className="absolute inset-8 rounded-full border-4 border-purple-500/60"></div>
          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <motion.span
              className="text-4xl font-bold text-white"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              A
            </motion.span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-32 text-center"
        >
          <h2 className="text-2xl font-light text-white mb-4">Welcome to my Portfolio</h2>
          <div className="w-64 h-1 bg-purple-500/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0d2e] to-[#2d1b3d] text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.015,
            y: mousePosition.y * 0.015,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      </div>

      {/* Modern Glass Navigation */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="relative rounded-full backdrop-blur-xl bg-[#0a0118]/40 border border-purple-500/20 shadow-lg shadow-purple-500/5 px-6 py-3 flex justify-between items-center">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute -inset-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-slow-spin"></div>
            </div>

            {/* Logo */}
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
              className="relative group cursor-pointer z-10"
              onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
            >
              <div className="relative flex items-center">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  AT
                </span>

                {/* Animated particles */}
                <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-1 h-1 rounded-full bg-pink-400 animate-pulse"></div>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-8 z-10">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(139, 92, 246, 0.8)",
                  }}
                  className="relative px-3 py-2 rounded-full transition-all duration-300"
                >
                  <span
                    className={`text-sm md:text-base relative z-10 ${
                      activeSection === item.id ? "text-white font-medium" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-pink-600/40 rounded-full backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center relative pt-24">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-8"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <span className="text-xl text-purple-400 font-medium inline-block bg-[#0a0118]/80 px-3 py-1 rounded-lg backdrop-blur-sm shadow-lg">
                Hello, I'm
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Abhinav</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tiwary</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl lg:text-3xl text-gray-300">Software Engineer & Developer</h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                B.Tech CSE student at Sharda University, passionate about creating innovative solutions in AI, web
                development, and software engineering. Currently seeking opportunities to join a cross-functional team
                that values accessible design.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border border-purple-500 rounded-full text-purple-400 hover:bg-purple-500/10 transition-all"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative">
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Profile Image */}
              <motion.div
                className="relative z-10 w-96 h-96 mx-auto rounded-full overflow-hidden border-4 border-purple-500/20 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Abhinav Tiwary"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full"
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center cursor-pointer"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-purple-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-purple-400">Passionate Developer & Problem Solver</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a B.Tech Computer Science Engineering student at Sharda University with a passion for creating
                innovative solutions. My journey in technology spans across AI/ML, web development, and software
                engineering.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With expertise in Python, React, and modern web technologies, I've built projects ranging from
                AI-powered weapon detection systems to full-stack web applications. I believe in writing clean,
                efficient code and creating user-centric solutions.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-purple-900/20 rounded-xl border border-purple-500/20"
                >
                  <div className="text-3xl font-bold text-purple-400">8.30</div>
                  <div className="text-sm text-gray-400">CGPA</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-purple-900/20 rounded-xl border border-purple-500/20"
                >
                  <div className="text-3xl font-bold text-purple-400">7+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-purple-900/20 rounded-xl border border-purple-500/20"
                >
                  <div className="text-3xl font-bold text-purple-400">300+</div>
                  <div className="text-sm text-gray-400">Students Taught</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-6">Education & Experience</h3>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-r from-purple-900/20 to-purple-800/10 rounded-xl border border-purple-500/20"
                >
                  <h4 className="text-xl font-bold text-purple-400">B.Tech Computer Science & Engineering</h4>
                  <p className="text-gray-300">Sharda University • 2023-2027</p>
                  <p className="text-gray-400 text-sm mt-2">CGPA: 8.30/10</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-r from-purple-900/20 to-purple-800/10 rounded-xl border border-purple-500/20"
                >
                  <h4 className="text-xl font-bold text-purple-400">GitHub Club Member</h4>
                  <p className="text-gray-300">Sharda University • 2023-Present</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Led workshops for 300+ students on Git, GitHub, and Web Development
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-r from-purple-900/20 to-purple-800/10 rounded-xl border border-purple-500/20"
                >
                  <h4 className="text-xl font-bold text-purple-400">Senior Secondary (XII)</h4>
                  <p className="text-gray-300">Sant Tulsi Das Inter College • 2023</p>
                  <p className="text-gray-400 text-sm mt-2">Percentage: 66.00%</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Work Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-center mb-12">Areas of Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workExperience.map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-[#1a0e3d]/50 rounded-3xl p-8 border border-purple-500/20 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 relative">
                      <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"></div>
                      <div className="relative z-10 w-full h-full rounded-full bg-[#1a0e3d] flex items-center justify-center overflow-hidden">
                        <Image
                          src={work.icon || "/placeholder.svg"}
                          alt={work.title}
                          width={80}
                          height={80}
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{work.title}</h3>
                      <p className="text-gray-300 mb-4">{work.description}</p>
                      <button className="px-6 py-2 border border-purple-500 rounded-full text-sm hover:bg-purple-500/20 transition-colors">
                        LEARN MORE
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 },
                }}
                className="group relative"
              >
                <div className="relative p-6 bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl border border-purple-500/20 backdrop-blur-sm overflow-hidden">
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  {/* Skill Icon */}
                  <motion.div
                    className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${skill.color}20` }}
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.6 },
                    }}
                  >
                    <span style={{ color: skill.color }}>{skill.icon}</span>
                  </motion.div>

                  {/* Skill Name */}
                  <h3 className="relative z-10 text-lg font-bold text-center mb-3 group-hover:text-purple-400 transition-colors">
                    {skill.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="relative z-10 w-full bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    />
                  </div>
                  <p className="relative z-10 text-center text-sm text-gray-400">{skill.level}%</p>

                  {/* Floating Particles */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-center mb-12">Certifications & Training</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl border border-purple-500/20"
                >
                  <h4 className="text-xl font-bold text-purple-400 mb-2">{cert.title}</h4>
                  <p className="text-gray-300 mb-1">{cert.issuer}</p>
                  <p className="text-gray-400 text-sm mb-3">{cert.date}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my technical skills through innovative projects spanning AI, web development, and software
              engineering
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {projects
              .filter((project) => project.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.02, y: -10 }}
                  className="group relative bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-3xl overflow-hidden border border-purple-500/20 backdrop-blur-sm"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs font-medium">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-medium text-center hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                      >
                        View Code
                      </motion.a>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 border border-purple-500 rounded-full text-purple-400 text-sm font-medium hover:bg-purple-500/10 transition-all"
                      >
                        Live Demo
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Other Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-purple-900/20 rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="h-32 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">{project.description.slice(0, 80)}...</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.slice(0, 2).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                    >
                      View Code →
                    </a>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="min-h-screen py-20 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Let's Connect</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to collaborate on exciting projects? I'm always open to discussing new opportunities and innovative
              ideas. Let's build something amazing together!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-md"></div>
              <div className="relative bg-[#0a0118]/80 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Send Me a Message
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                        className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500"
                        placeholder="John Doe"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-50">
                        <span className="text-gray-400"></span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                        className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500"
                        placeholder="john@example.com"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-50">
                        <span className="text-gray-400"></span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500"
                      placeholder="I'd like to discuss a project opportunity..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center"
                  >
                    <span>Send Message</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>

                  {formStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg text-center ${
                        formStatus.type === "success"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {formStatus.message}
                    </motion.div>
                  )}
                </form>

                <div className="mt-8 pt-6 border-t border-purple-500/20">
                  <p className="text-gray-400 text-sm text-center">
                    I typically respond within 24 hours. You can also reach me directly via email or phone.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "📧",
                    title: "Email",
                    value: "abhinavv8975@gmail.com",
                    href: "mailto:abhinavv8975@gmail.com",
                    description: "Drop me a line anytime",
                  },
                  {
                    icon: "📱",
                    title: "Phone",
                    value: "+91 6207363626",
                    href: "tel:+916207363626",
                    description: "Let's have a conversation",
                  },
                  {
                    icon: "📍",
                    title: "Location",
                    value: "Greater Noida, India",
                    href: null,
                    description: "Available for remote work",
                  },
                  {
                    icon: "🌐",
                    title: "Website",
                    value: "abhinavtiwary.com",
                    href: "https://abhinavtiwary.com",
                    description: "Check out my portfolio",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-[#0a0118]/60 backdrop-blur-md p-5 rounded-xl border border-purple-500/20">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
                          {contact.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{contact.title}</h4>
                          {contact.href ? (
                            <a
                              href={contact.href}
                              className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <p className="text-purple-400 text-sm">{contact.value}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="bg-[#0a0118]/60 backdrop-blur-md p-8 rounded-3xl border border-purple-500/20 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Connect With Me
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ x: 5 }}
                      className="group flex items-center p-3 rounded-xl hover:bg-purple-500/10 transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center mr-4 shadow-md`}
                      >
                        <span className="text-lg">{social.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{social.name}</h4>
                        <p className="text-gray-400 text-sm group-hover:text-purple-400 transition-colors">
                          {social.username}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500 group-hover:text-purple-400 transition-colors"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-purple-500/20">
                  <h4 className="text-lg font-semibold mb-3">Availability</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-gray-300">Available for freelance projects and full-time opportunities</p>
                  </div>
                </div>
              </div>

              {/* Resume Download */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-1 rounded-2xl"
              >
                <div className="bg-[#0a0118]/80 backdrop-blur-md p-6 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Download My Resume</h4>
                    <p className="text-gray-400 text-sm">Get a complete overview of my skills and experience</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center"
                  >
                    <span>Resume</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2025 Abhinav Tiwary. Crafted with ❤️ and lots of ☕</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Made by Abhinav</span>
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/abhiii9vvv"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-gray-500/25 transition-all"
                >
                  🔗
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/abhinav-tiwary"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                >
                  💼
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
