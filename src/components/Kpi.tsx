import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Calendar, Code2, Star, Users, Zap } from 'lucide-react'

interface KpiItem {
  label: string
  value: number
  icon: React.ReactNode
  color: string
  bgColor: string
  suffix?: string
}

const items: KpiItem[] = [
  { 
    label: 'Anni di Esperienza', 
    value: 2, 
    icon: <Calendar size={24} />,
    color: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-cyan-500/20'
  },
  { 
    label: 'Progetti Consegnati', 
    value: 10, 
    icon: <Award size={24} />,
    color: 'text-purple-400', 
    bgColor: 'from-purple-500/20 to-pink-500/20'
  },
  { 
    label: 'Stack Principali', 
    value: 7, 
    icon: <Code2 size={24} />,
    color: 'text-emerald-400',
    bgColor: 'from-emerald-500/20 to-teal-500/20'
  }
]

export default function Kpi() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

  return (
    <section 
      aria-labelledby="kpi" 
      className="relative py-20 overflow-hidden"
    >
      <h2 id="kpi" className="sr-only">KPI</h2>
      
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
          className="absolute w-96 h-96 opacity-20 blur-3xl rounded-full pointer-events-none"
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

        {/* Floating particles */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-sm"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          className="grid gap-8 sm:grid-cols-3 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="group relative text-center p-8 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-500"
              whileHover={{ 
                y: -10,
                scale: 1.05,
                rotateY: 5
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <div className="relative z-10 flex justify-center mb-6">
                <motion.div 
                  className={`p-4 bg-gradient-to-r ${item.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={item.color}>
                    {item.icon}
                  </div>
                </motion.div>
              </div>

              {/* Value with counting animation */}
              <motion.div 
                className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.2 + idx * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <CountUpNumber target={item.value} delay={idx * 0.2} />+
              </motion.div>

              {/* Label */}
              <motion.div 
                className="text-lg font-medium text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
              >
                {item.label}
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star size={16} className="text-yellow-400" />
              </div>

              {/* Bottom accent line */}
              <motion.div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r ${item.bgColor} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional stats row */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-4">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users size={16} className="text-blue-400" />
                <div className="text-lg font-bold text-blue-400">100%</div>
              </div>
              <div className="text-xs text-gray-600">Clienti Soddisfatti</div>
            </motion.div>
            
            <div className="w-px h-8 bg-white/20" />
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap size={16} className="text-purple-400" />
                <div className="text-lg font-bold text-purple-400">24h</div>
              </div>
              <div className="text-xs text-gray-600">Tempo Risposta</div>
            </motion.div>
            
            <div className="w-px h-8 bg-white/20" />
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star size={16} className="text-cyan-400" />
                <div className="text-lg font-bold text-cyan-400">5⭐</div>
              </div>
              <div className="text-xs text-gray-600">Rating Medio</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// animazione conteggio numeri
function CountUpNumber({ target, delay = 0 }: { target: number; delay?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1000 
      const steps = 30
      const stepValue = target / steps
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        if (currentStep <= steps) {
          setCount(Math.round(stepValue * currentStep))
        } else {
          setCount(target)
          clearInterval(interval)
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [target, delay])

  return <span>{count}</span>
}