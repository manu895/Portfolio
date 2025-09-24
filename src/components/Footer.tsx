import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Heart,
  Code2,
  Palette,
  Zap,
  Star,
  ArrowUp
} from 'lucide-react'

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/manu895',
      color: 'hover:text-gray-900 dark:hover:text-white',
      bgColor: 'hover:bg-gray-100 dark:hover:bg-gray-700'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/manuel-alfredo-bologna-67975118a/',
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:manuelbologna92@gmail.com',
      color: 'hover:text-emerald-600',
      bgColor: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
    }
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Progetti', href: '/projects' },
    { name: 'Chi Sono', href: '/about' },
    { name: 'Servizi', href: '/services' },
    { name: 'Contatti', href: '/contact' }
  ]

  const services = [
    { name: 'Sviluppo Web', icon: Code2 },
    { name: 'UI/UX Design', icon: Palette },
    { name: 'Consulenza Tech', icon: Zap }
  ]

  return (
    <>
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className={`
          fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg
          transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        animate={showScrollTop ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      >
        <ArrowUp size={20} />
      </motion.button>

      <footer
        ref={ref}
        className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 90%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)
            `
          }} />
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 right-40 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 container mx-auto px-4 py-20"
        >
          {/* Main content - now centered and better spaced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">

            {/* Brand Section - Now takes full width on smaller screens */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <motion.div
                className="mb-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Manuel Bologna
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Sviluppatore Full-stack specializzato in React, Next.js e TypeScript.
                  Creo esperienze digitali moderne, performanti e coinvolgenti che
                  trasformano idee in realtà.
                </p>
              </motion.div>

              {/* Contact Info */}
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                    <MapPin size={16} />
                  </div>
                  <span>Piazza Armerina, Italia</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-emerald-600/20 rounded-lg group-hover:bg-emerald-600/30 transition-colors">
                    <Phone size={16} />
                  </div>
                  <span>+39 3208475452</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                    <Mail size={16} />
                  </div>
                  <span>manuelbologna92@gmail.com</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-8 flex items-center gap-2 text-yellow-400">
                <Star size={20} className="text-yellow-400" />
                Link Rapidi
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <motion.li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    >
                      <motion.div
                        className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                        layoutId={`dot-${index}`}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-8 flex items-center gap-2 text-blue-400">
                <Zap size={20} className="text-blue-400" />
                Servizi
              </h4>
              <ul className="space-y-5">
                {services.map((service) => (
                  <motion.li
                    key={service.name}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300">
                      <service.icon size={16} />
                    </div>
                    <span>{service.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social & Copyright - Enhanced spacing and layout */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10"
          >
            <div className="flex items-center gap-6 mb-8 md:mb-0">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl
                    transition-all duration-300 ${social.color} ${social.bgColor}
                    hover:border-white/30 hover:shadow-lg hover:shadow-current/20
                  `}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-300 flex items-center gap-2 justify-center md:justify-end text-lg">
                © 2024 Manuel Bologna.
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Heart size={16} className="text-red-400" />
                </motion.span>
                Fatto con passione
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Tutti i diritti riservati
              </p>
            </div>
          </motion.div>
        </motion.div>
      </footer>
    </>
  )
}