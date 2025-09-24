import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, Zap, Code2, Palette, LucideIcon } from 'lucide-react'

interface TechItem {
  name: string
  icon: LucideIcon
  color: string
  description: string
}

const techItems: TechItem[] = [
  {
    name: 'React',
    icon: Code2,
    color: 'from-blue-400 to-blue-600',
    description: 'Interfacce moderne e reattive'
  },
  {
    name: 'TypeScript',
    icon: Zap,
    color: 'from-blue-500 to-indigo-600',
    description: 'Codice type-safe e robusto'
  },
  {
    name: 'UI/UX',
    icon: Palette,
    color: 'from-purple-400 to-pink-600',
    description: 'Design coinvolgenti'
  },
  {
    name: 'Next.js',
    icon: Sparkles,
    color: 'from-emerald-400 to-cyan-600',
    description: 'Performance ottimali'
  }
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isTechMenuOpen, setIsTechMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const location = useLocation()

  // Helper per determinare se siamo nella Home
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Scroll to top quando cambia pagina
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Progetti', path: '/projects' },
    { name: 'Chi Sono', path: '/about' },
    { name: 'Servizi', path: '/services' },
    { name: 'Contatti', path: '/contact' }
  ]

  // Funzione per ottenere il colore del testo dei nav items
  const getNavItemColor = (itemPath: string) => {
    const isActive = location.pathname === itemPath

    // Se siamo nella Home
    if (isHomePage) {
      if (isActive) {
        return isScrolled 
          ? 'text-blue-600 dark:text-blue-400' // Attivo con scroll
          : 'text-white' // Attivo senza scroll (bianco su sfondo scuro)
      } else {
        return isScrolled
          ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' // Non attivo con scroll
          : 'text-white/90 hover:text-white' // Non attivo senza scroll (bianco su sfondo scuro)
      }
    } 
    // Nelle altre pagine
    else {
      return isActive
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
    }
  }

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  }

  const navVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      y: -2,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  }

  const techButtonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  }

  const overlayVariants = {
    hidden: {
      opacity: 0,
      backdropFilter: 'blur(0px)'
    },
    visible: {
      opacity: 1,
      backdropFilter: 'blur(20px)',
      transition: { duration: 0.3 }
    }
  }

  const techMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    }
  }

  const techItemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      x: 10,
      transition: { duration: 0.2 }
    }
  }

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
          ${isScrolled
            ? 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-3xl border-b border-white/30 dark:border-gray-700/40 shadow-2xl shadow-black/10'
            : 'bg-white/5 dark:bg-gray-900/5 backdrop-blur-2xl border-b border-white/20 dark:border-gray-700/30'
          }
        `}
        style={{
          background: isScrolled
            ? `
                linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%),
                radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
              `
            : `
                linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%),
                radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
              `,
          backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(16px) saturate(150%)',
          WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(16px) saturate(150%)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="relative"
            >
              <Link
                to="/"
                className="group text-2xl font-bold relative overflow-hidden no-underline"
              >
                <motion.span
                  className={`
                    bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-700
                    ${isHomePage && !isScrolled ? 'text-white' : ''}
                  `}
                  whileHover={{
                    backgroundPosition: "100% 0%"
                  }}
                  style={isHomePage && !isScrolled ? { 
                    background: 'white', 
                    WebkitBackgroundClip: 'text', 
                    backgroundClip: 'text',
                    color: 'white'
                  } : {}}
                >
                  Manuel Bologna
                </motion.span>

                {/* Sparkle effect */}
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              variants={navVariants}
              className="hidden md:flex items-center space-x-8"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  variants={navItemVariants}
                  whileHover="hover"
                >
                  <Link
                    to={item.path}
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-all duration-700 group no-underline
                      ${getNavItemColor(item.path)}
                    `}
                    style={{ textDecoration: 'none' }}
                  >
                    {item.name}

                    {/* Animated underline - solo per hover quando NON è attivo */}
                    {location.pathname !== item.path && (
                      <motion.div
                        className={`
                          absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-700
                          ${isHomePage && !isScrolled 
                            ? 'bg-white' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }
                        `}
                      />
                    )}

                    {/* Active indicator - solo per pagina attiva */}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeTab"
                        className={`
                          absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-700
                          ${isHomePage && !isScrolled 
                            ? 'bg-white' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }
                        `}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Tech Stack Button */}
            <motion.button
              variants={techButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setIsTechMenuOpen(!isTechMenuOpen)}
              className="relative group hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-200/20 dark:border-blue-700/30 rounded-full transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 -top-2 w-6 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />

              <Sparkles size={16} className={`
                transition-all duration-700
                ${isHomePage && !isScrolled 
                  ? 'text-white' 
                  : 'text-blue-600 dark:text-blue-400'
                }
              `} />
              <span className={`
                text-sm font-medium transition-all duration-700
                ${isHomePage && !isScrolled 
                  ? 'text-white' 
                  : 'text-gray-700 dark:text-gray-300'
                }
              `}>
                Tech Stack
              </span>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                md:hidden p-2 transition-colors
                ${isHomePage && !isScrolled
                  ? 'text-white hover:text-white/80'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Tech Stack Menu Overlay */}
      <AnimatePresence>
        {isTechMenuOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40"
              onClick={() => setIsTechMenuOpen(false)}
            />

            <motion.div
              variants={techMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-20 right-4 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl shadow-black/10 p-6 min-w-80"
            >
              <motion.h3
                className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Sparkles size={20} className="text-blue-500" />
                Tech Stack
              </motion.h3>

              <div className="space-y-3">
                {techItems.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    variants={techItemVariants}
                    whileHover="hover"
                    className="group flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200/20 dark:border-gray-600/20 cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${tech.color} shadow-lg`}>
                      <tech.icon size={20} className="text-white" />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {tech.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {tech.description}
                      </p>
                    </div>

                    <motion.div
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b border-white/20 dark:border-gray-700/30 md:hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 no-underline
                        ${location.pathname === item.path
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }
                      `}
                      style={{ textDecoration: 'none' }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}