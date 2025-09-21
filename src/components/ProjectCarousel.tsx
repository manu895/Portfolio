import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Play } from 'lucide-react'

// Definisci il tipo Project
interface Project {
  id: string;
  title: string;
  summary: string;
  images: Array<{ src: string; alt?: string }>;
}

// Definisci le props del componente
interface ProjectCarouselProps {
  project?: Project;
  className?: string;
}

export default function ProjectCarousel({ project, className }: ProjectCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const slides = projects.map(project => ({
    image: project.images[0]?.src || '/images/projects/project-1.jpg',
    title: project.title,
    description: project.summary
  }))

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

  const getSlideTransform = (position: number) => {
    const radius = 45 // Aumentato da 35 a 45
    const angle = position * 47 + 141
    const scale = position === 0 ? 6 : (position === -1 || position === 1 ? 3.5 : 1.2) // Scale maggiori
    return `rotate(${angle}deg) translateY(${radius}rem) rotate(${-angle}deg) scale(${scale})`
  }

  const moveToSlide = (target: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    
    let diff = (target - currentSlide + slides.length) % slides.length
    if (diff === 0) {
      setIsAnimating(false)
      return
    }
    
    const step = diff > slides.length / 2 ? -1 : 1
    let current = currentSlide
    
    const animate = () => {
      current = (current + step + slides.length) % slides.length
      setCurrentSlide(current)
      
      if (current !== target) {
        setTimeout(animate, 300)
      } else {
        setIsAnimating(false)
      }
    }
    
    animate()
  }

  const goToPrevious = () => {
    moveToSlide((currentSlide - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    moveToSlide((currentSlide + 1) % slides.length)
  }

  const renderSlides = () => {
    const positions = [-2, -1, 0, 1, 2]
    
    return slides.map((slide, i) => {
      let offset = (i - currentSlide + slides.length) % slides.length
      if (offset > slides.length / 2) offset -= slides.length
      
      const isVisible = positions.includes(offset)
      const isCenter = offset === 0
      
      return (
        <motion.div
          key={i}
          className={`
            absolute rounded-2xl border-2 bg-cover bg-center cursor-pointer
            transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${isVisible ? 'block opacity-100' : 'hidden opacity-0'}
            ${isCenter 
              ? 'border-white/60 shadow-2xl shadow-white/20 w-32 h-32' 
              : 'border-white/30 shadow-lg w-28 h-28'
            }
          `}
          style={{
            backgroundImage: `url(${slide.image})`,
            transform: isVisible ? getSlideTransform(offset) : 'scale(0)'
          }}
          whileHover={{ scale: isCenter ? 1.1 : 1.05 }}
          onClick={() => !isCenter && moveToSlide(i)}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
          
          {/* Play icon for center slide */}
          {isCenter && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Play size={24} className="text-white fill-white ml-1" />
              </div>
            </motion.div>
          )}
        </motion.div>
      )
    })
  }

  return (
    <section aria-labelledby="carousel" className={`relative py-20 ${className || ''}`}>
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 opacity-60"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Mouse-following light */}
        <div 
          className="absolute w-96 h-96 opacity-20 blur-3xl rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)`,
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out'
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-full px-1">
        <div className="text-center mb-16">
          {/* Background per contrasto */}
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Alone luminoso dietro */}
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150" />
            
            {/* Sfondo glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 backdrop-blur-sm rounded-2xl border border-white/20" />
            
            <motion.h2 
              id="carousel" 
              className="relative text-4xl md:text-5xl font-bold px-8 py-4"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 25%, #dbeafe 50%, #bfdbfe 75%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Progetti in Evidenza
            </motion.h2>
            
            {/* Sparkles decorativi */}
            <motion.div
              className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
            />
          </motion.div>
        </div>
        
        <div className="relative">
          {/* Enhanced carousel styles */}
          <style>{`
            .circular-carousel {
              width: 100%;
              height: 85vh;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              transition: all 0.8s ease;
              position: relative;
              overflow: hidden;
              background-size: cover;
              background-position: center;
              padding: 0.5rem; /* Aumentato da 4rem */
              background-image: url(${slides[currentSlide]?.image});
              border-radius: 2rem; /* Più arrotondato */
              border: 2px solid rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              box-shadow: 
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            
            .info-panel {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding-left: 5rem; /* Aumentato */
              max-width: 40%; /* Aumentato da 35% */
              backdrop-filter: blur(20px);
              background: rgba(0, 0, 0, 0.3);
              border-radius: 1.5rem;
              padding: 3rem;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .info-title {
              font-size: 4rem; /* Aumentato da 3rem */
              font-weight: bold;
              margin-bottom: 1.5rem;
              color: white;
              text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
              background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .info-text {
              font-size: 1.6rem; /* Aumentato da 1.4rem */
              line-height: 1.6;
              color: rgba(255, 255, 255, 0.9);
              text-shadow: 1px 1px 4px rgba(0,0,0,0.8);
            }
            
            .carousel-container {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(25%, -7%);
            }
            
            .carousel {
              position: relative;
              width: 75rem; /* Aumentato da 60rem */
              height: 75rem; /* Aumentato da 60rem */
              border: 2px dashed rgba(238, 190, 151, 0.8); /* Più visibile */
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(5px);
              background: rgba(255, 255, 255, 0.05);
            }
            
            .arrow-controls {
              position: absolute;
              right: 3rem; /* Aumentato */
              top: 85%;
              transform: translateY(-50%);
              display: flex;
              flex-direction: row;
              gap: 1.5rem; /* Aumentato */
            }
            
            .arrow-btn {
              width: 4rem; /* Aumentato da 3rem */
              height: 4rem;
              border-radius: 50%;
              border: 2px solid rgba(255, 255, 255, 0.3);
              cursor: pointer;
              background: rgba(255,255,255,0.1);
              backdrop-filter: blur(10px);
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
              color: white;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            }
            
            .arrow-btn:hover {
              background: rgba(255,255,255,0.2);
              border-color: rgba(255, 255, 255, 0.6);
              transform: scale(1.1);
              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
            }
            
            .arrow-btn:disabled {
              opacity: 0.4;
              cursor: not-allowed;
              transform: scale(1);
            }

            /* Action buttons */
            .action-buttons {
              position: absolute;
              bottom: 2rem;
              left: 5rem;
              display: flex;
              gap: 1rem;
            }

            .action-btn {
              padding: 0.75rem 1.5rem;
              border-radius: 1rem;
              border: 1px solid rgba(255, 255, 255, 0.3);
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              color: white;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }

            .action-btn:hover {
              background: rgba(255, 255, 255, 0.2);
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            }
            
            @media (max-width: 768px) {
              .circular-carousel {
                height: 60vh;
                padding: 2rem;
              }
              .info-panel {
                max-width: 100%;
                padding: 2rem;
                padding-left: 2rem;
              }
              .info-title {
                font-size: 2.5rem;
              }
              .info-text {
                font-size: 1.3rem;
              }
              .carousel-container {
                transform: translate(0%, -7%);
              }
              .carousel {
                width: 50rem;
                height: 50rem;
              }
              .arrow-controls {
                right: 1.5rem;
                top: 90%;
              }
              .action-buttons {
                bottom: 1rem;
                left: 2rem;
              }
            }
          `}</style>
          
          <motion.div 
            className="circular-carousel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced info panel */}
            <motion.div 
              className="info-panel"
              key={currentSlide}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="info-title"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {slides[currentSlide]?.title}
              </motion.div>
              <motion.div 
                className="info-text"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {slides[currentSlide]?.description}
              </motion.div>
            </motion.div>
            
            <div className="carousel-container">
              <div className="carousel">
                {renderSlides()}
              </div>
            </div>

            {/* Action buttons */}
            <div className="action-buttons">
              <motion.button 
                className="action-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} />
                Demo Live
              </motion.button>
              <motion.button 
                className="action-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={16} />
                Codice
              </motion.button>
            </div>
            
            <div className="arrow-controls">
              <motion.button 
                className="arrow-btn" 
                onClick={goToPrevious}
                disabled={isAnimating}
                aria-label="Progetto precedente"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button 
                className="arrow-btn" 
                onClick={goToNext}
                disabled={isAnimating}
                aria-label="Progetto successivo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={28} />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        <motion.p 
          className="mt-8 text-center text-gray-300 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Usa le frecce per navigare tra i progetti • Clicca sulle anteprime per cambiare
        </motion.p>
      </div>
    </section>
  )
}