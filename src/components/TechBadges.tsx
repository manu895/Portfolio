import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface TechItem {
  name: string
  icon: string
  color: string
  bgColor: string
  description: string
  category: 'frontend' | 'backend' | 'tools' | 'database'
  proficiency: number // 1-5
}

const techStack: TechItem[] = [
  // Frontend
  { 
    name: 'React', 
    icon: '⚛️', 
    color: 'text-blue-400', 
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    description: 'Libreria per UI moderne e reattive',
    category: 'frontend',
    proficiency: 5
  },
  { 
    name: 'TypeScript', 
    icon: '📘', 
    color: 'text-blue-600', 
    bgColor: 'from-blue-600/20 to-indigo-600/20',
    description: 'JavaScript tipizzato per codice robusto',
    category: 'frontend',
    proficiency: 4
  },
  { 
    name: 'Vite', 
    icon: '⚡', 
    color: 'text-yellow-400', 
    bgColor: 'from-yellow-500/20 to-orange-500/20',
    description: 'Build tool velocissimo per sviluppo',
    category: 'tools',
    proficiency: 4
  },
  { 
    name: 'Tailwind CSS', 
    icon: '🎨', 
    color: 'text-cyan-400', 
    bgColor: 'from-cyan-500/20 to-teal-500/20',
    description: 'Framework CSS utility-first',
    category: 'frontend',
    proficiency: 5
  },
  { 
    name: 'Framer Motion', 
    icon: '🎭', 
    color: 'text-purple-400', 
    bgColor: 'from-purple-500/20 to-pink-500/20',
    description: 'Animazioni fluide e interattive',
    category: 'frontend',
    proficiency: 4
  },
  { 
    name: 'React Hook Form', 
    icon: '📝', 
    color: 'text-emerald-400', 
    bgColor: 'from-emerald-500/20 to-green-500/20',
    description: 'Gestione form performante',
    category: 'frontend',
    proficiency: 4
  },

  // Backend & Database
  { 
    name: 'Node.js', 
    icon: '🟢', 
    color: 'text-green-400', 
    bgColor: 'from-green-500/20 to-lime-500/20',
    description: 'Runtime JavaScript server-side',
    category: 'backend',
    proficiency: 4
  },
  { 
    name: 'JavaScript', 
    icon: '🟨', 
    color: 'text-yellow-500', 
    bgColor: 'from-yellow-500/20 to-amber-500/20',
    description: 'Linguaggio di programmazione versatile',
    category: 'frontend',
    proficiency: 5
  },
  { 
    name: 'MongoDB', 
    icon: '🍃', 
    color: 'text-green-500', 
    bgColor: 'from-green-600/20 to-emerald-600/20',
    description: 'Database NoSQL documentale',
    category: 'database',
    proficiency: 3
  },
  { 
    name: 'Node-RED', 
    icon: '🔴', 
    color: 'text-red-400', 
    bgColor: 'from-red-500/20 to-pink-500/20',
    description: 'Visual programming per IoT',
    category: 'tools',
    proficiency: 3
  }
]

const categories = {
  frontend: { name: 'Frontend', icon: '🎨', color: 'text-blue-400' },
  backend: { name: 'Backend', icon: '⚙️', color: 'text-green-400' },
  tools: { name: 'Tools', icon: '🛠️', color: 'text-purple-400' },
  database: { name: 'Database', icon: '🗄️', color: 'text-yellow-400' }
}

export default function TechBadges() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0, 
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

  const categoryVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const filteredTech = selectedCategory 
    ? techStack.filter(tech => tech.category === selectedCategory)
    : techStack

  console.log('Selected category:', selectedCategory)
  console.log('Filtered tech:', filteredTech)
  console.log('All tech stack:', techStack)

  const renderProficiencyStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        className={`text-xs ${i < level ? 'text-yellow-400' : 'text-gray-600'}`}
        animate={i < level ? { scale: [1, 1.2, 1] } : {}}
        transition={{ delay: i * 0.1, duration: 0.3 }}
      >
        ⭐
      </motion.span>
    ))
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Dynamic gradient background */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.3) 0%, transparent 60%)',
              'radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 60%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Mouse-following gradient */}
        <div 
          className="absolute w-[600px] h-[600px] opacity-20 blur-3xl rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, 
              rgba(59, 130, 246, 0.4) 0deg, 
              rgba(147, 51, 234, 0.4) 120deg, 
              rgba(6, 182, 212, 0.4) 240deg, 
              rgba(59, 130, 246, 0.4) 360deg)`,
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out'
          }}
        />

        {/* Animated shapes */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              background: `rgba(${100 + i * 30}, ${150 + i * 20}, ${200 + i * 10}, 0.1)`
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block relative mb-6"
            whileHover={{ scale: 1.05 }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl rounded-full scale-150" />
            
            {/* Glassmorphism container */}
            <div className="relative bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4">
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Tech Stack
                </span>
              </h2>
              
              {/* Animated dots */}
              <div className="absolute -top-2 -right-2 flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Le tecnologie moderne che utilizzo per creare esperienze digitali eccezionali e performanti
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.button
            key="all" 
            variants={categoryVariants}
            onClick={() => setSelectedCategory(null)}
            className={`
              px-6 py-3 rounded-2xl font-medium transition-all duration-300 border backdrop-blur-sm
              ${selectedCategory === null 
                ? 'bg-white/20 border-white/30 text-white shadow-lg' 
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
              }
            `}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            🌟 Tutte
          </motion.button>
          
          {Object.entries(categories).map(([key, category]) => (
            <motion.button
              key={key}
              variants={categoryVariants}
              onClick={() => setSelectedCategory(key)} 
              className={`
                px-6 py-3 rounded-2xl font-medium transition-all duration-300 border backdrop-blur-sm flex items-center gap-2
                ${selectedCategory === key 
                  ? 'bg-white/20 border-white/30 text-white shadow-lg' 
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                }
              `}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span className="text-xs opacity-60">
                ({techStack.filter(tech => tech.category === key).length})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          key={selectedCategory || 'all'} 
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="group relative"
              onHoverStart={() => setHoveredTech(tech.name)}
              onHoverEnd={() => setHoveredTech(null)}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                rotateX: 5,
                scale: 1.05
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              {/* Card */}
              <div className={`
                relative p-6 rounded-2xl border backdrop-blur-xl transition-all duration-500
                bg-gradient-to-br ${tech.bgColor}
                border-white/20 hover:border-white/40
                shadow-lg hover:shadow-2xl hover:shadow-current/20
              `}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon & Name */}
                <div className="relative z-10">
                  <motion.div 
                    className="text-4xl mb-4 transform-gpu"
                    animate={hoveredTech === tech.name ? { 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {tech.icon}
                  </motion.div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${tech.color}`}>
                    {tech.name}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {tech.description}
                  </p>
                  
                  {/* Proficiency */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {renderProficiencyStars(tech.proficiency)}
                    </div>
                    <motion.span 
                      className={`text-xs px-2 py-1 rounded-full bg-white/10 ${categories[tech.category].color}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {categories[tech.category].name}
                    </motion.span>
                  </div>
                </div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Floating particles on hover */}
              {hoveredTech === tech.name && (
                <>
                  {Array.from({ length: 3 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full pointer-events-none"
                      style={{
                        left: `${30 + i * 20}%`,
                        top: `${20 + i * 30}%`
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [-20, -60],
                        x: [0, Math.random() * 40 - 20]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-4">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl font-bold text-blue-400">{techStack.length}</div>
              <div className="text-sm text-gray-400">Tecnologie</div>
            </motion.div>
            <div className="w-px h-8 bg-white/20" />
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl font-bold text-purple-400">4</div>
              <div className="text-sm text-gray-400">Categorie</div>
            </motion.div>
            <div className="w-px h-8 bg-white/20" />
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl font-bold text-cyan-400">5+</div>
              <div className="text-sm text-gray-400">Anni exp</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}