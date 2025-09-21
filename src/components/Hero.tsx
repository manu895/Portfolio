import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue, useTransform, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Download, 
  Play, 
  Sparkles, 
  Code2, 
  Palette, 
  Zap,
  Star,
  Globe,
  Rocket
} from 'lucide-react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTyping, setIsTyping] = useState(true)
  const [currentRole, setCurrentRole] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const y3 = useTransform(scrollY, [0, 300], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const roles = [
    "Frontend Developer",
    "React Specialist", 
    "UI/UX Designer",
    "Tech Innovator"
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20
        })
      }
    }

    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(roleInterval)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const particleVariants = {
    animate: {
      y: [-30, 30],
      x: [-20, 20],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Generate floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    size: 4 + Math.random() * 8
  }))

  const techIcons = [
    { icon: Code2, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { icon: Palette, color: 'text-purple-400', bg: 'bg-purple-500/20' },
    { icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    { icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { icon: Star, color: 'text-pink-400', bg: 'bg-pink-500/20' },
    { icon: Rocket, color: 'text-cyan-400', bg: 'bg-cyan-500/20' }
  ]

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y: y1 }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 40% 90%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)
              `
            }}
          />
        </motion.div>
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          variants={particleVariants}
          animate="animate"
          transition={{
            delay: particle.delay,
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Tech icons floating */}
      {techIcons.map((tech, index) => (
        <motion.div
          key={index}
          className={`absolute p-3 ${tech.bg} backdrop-blur-sm rounded-xl border border-white/10`}
          style={{
            left: `${15 + (index * 15)}%`,
            top: `${20 + (index % 2) * 60}%`,
            x: mousePosition.x * (index % 2 === 0 ? 1 : -1),
            y: mousePosition.y * (index % 2 === 0 ? 1 : -1),
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: index * 0.5 }}
          whileHover={{ scale: 1.2, rotate: 360 }}
        >
          <tech.icon size={24} className={tech.color} />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 text-center text-white"
      >
        {/* Greeting */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Sparkles size={16} className="text-yellow-400" />
            Benvenuto nel mio mondo digitale
          </motion.span>
        </motion.div>

        {/* Main title */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block">Ciao, sono</span>
            <motion.span 
              className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
              }}
            >
              Manuel Bologna
            </motion.span>
          </h1>
          
          {/* Animated role */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold h-16 flex items-center justify-center">
            <motion.span
              key={currentRole}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {roles[currentRole]}
            </motion.span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Trasformo idee creative in{' '}
          <motion.span 
            className="text-blue-400 font-semibold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            esperienze digitali coinvolgenti
          </motion.span>
          {' '}usando tecnologie moderne e design innovativo per creare soluzioni web che fanno la differenza.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 -top-2 w-6 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              
              <span>Esplora i Progetti</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3">
              <Download size={20} />
              <span>Scarica CV</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: "50+", label: "Progetti Completati", icon: Code2 },
            { number: "3+", label: "Anni di Esperienza", icon: Star },
            { number: "100%", label: "Clienti Soddisfatti", icon: Rocket }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                  <stat.icon size={24} className="text-blue-400" />
                </div>
              </div>
              <motion.div 
                className="text-3xl font-bold text-white mb-2"
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}