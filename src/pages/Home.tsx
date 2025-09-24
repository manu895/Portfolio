import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Hero from '@/components/Hero'
import Kpi from '@/components/Kpi'
import ProjectCarousel from '@/components/ProjectCarousel'
import TechBadges from '@/components/TechBadges'
import { Seo } from '@/lib/seo'
import { projects } from '@/data/projects'

// animazioni container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

// animazioni sezioni 
const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 60, 
    scale: 0.98 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2, 
      ease: [0.25, 0.4, 0.25, 1],
      type: "spring",
      stiffness: 80,
      damping: 25 
    }
  }
}

// animazione floating 
const floatingVariants = {
  animate: {
    y: [-15, 15, -15],
    rotate: [-3, 3, -3],
    transition: {
      duration: 15, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// animazione parallax per background
const parallaxVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 0.1,
    transition: {
      duration: 9, 
      ease: "easeOut"
    }
  }
}

export default function Home() {
  const location = useLocation()

  // Scroll to top quando si cambia pagina
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }

    // Piccolo delay per assicurarsi che la navigazione sia completata
    const timer = setTimeout(scrollToTop, 100)
    
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      <Seo title="Home" path="/" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden"
      >
        {/* Elementi decorativi floating - persistenti e più visibili */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-36 h-36 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-2xl -z-10"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-96 right-20 w-52 h-52 bg-gradient-to-br from-emerald-400/30 to-cyan-600/30 rounded-full blur-2xl -z-10"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute bottom-20 left-1/4 w-44 h-44 bg-gradient-to-br from-orange-400/30 to-pink-600/30 rounded-full blur-2xl -z-10"
        />
        
        {/* Elementi aggiuntivi per continuità durante scroll */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute top-1/2 right-10 w-28 h-28 bg-gradient-to-br from-indigo-400/25 to-purple-500/25 rounded-full blur-xl -z-10"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
          className="absolute bottom-1/3 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/25 to-blue-500/25 rounded-full blur-xl -z-10"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '5s' }}
          className="absolute top-2/3 left-1/2 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl -z-10"
        />

        {/* Hero Section */}
        <motion.div variants={sectionVariants}>
          <Hero />
        </motion.div>

        {/* KPI Section con effetto reveal */}
        <motion.div
          variants={sectionVariants}
          className="relative"
        >
          <motion.div
            variants={parallaxVariants}
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-5"
          />
          <Kpi />
        </motion.div>
        
        {/* Sezione Progetti */}
        <motion.section 
          variants={sectionVariants}
          className="py-24 relative overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(59, 130, 246, 0.05) 0%, 
                rgba(147, 51, 234, 0.05) 50%, 
                rgba(6, 182, 212, 0.05) 100%
              )
            `
          }}
        >
          {/* Texture pattern overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)
              `
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ duration: 0.8 }} 
            >
              <motion.div
                className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full border border-blue-200/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ✨ Progetti in Evidenza
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }} 
                transition={{ delay: 0.2, duration: 0.8 }} 
              >
                Innovazione che Ispira
              </motion.h2>
              
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Esplora i progetti che combinano creatività, tecnologia avanzata e design cutting-edge per creare esperienze digitali memorabili.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }} 
              transition={{ 
                duration: 1,
                ease: [0.25, 0.4, 0.25, 1]
              }}
            >
              {projects[0] && (
                <motion.div
                  className="relative"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-60" />
                  
                  <ProjectCarousel 
                    project={projects[0]} 
                    className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl"
                  />
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Animated shapes - durata e persistenza migliorate */}
          <motion.div
            className="absolute top-1/4 left-0 w-3 h-40 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-70"
            animate={{
              scaleY: [1, 1.8, 1],
              opacity: [0.7, 1, 0.7],
              height: [160, 200, 160]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-0 w-3 h-32 bg-gradient-to-t from-purple-500 to-transparent rounded-full opacity-70"
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
              height: [128, 160, 128]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 left-2 w-2 h-24 bg-gradient-to-b from-cyan-500 to-transparent rounded-full opacity-60"
            animate={{
              scaleY: [1, 1.4, 1],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.section>

        {/* Tech Badges Section */}
        <motion.div variants={sectionVariants}>
          <TechBadges />
        </motion.div>
      </motion.div>
    </>
  )
}