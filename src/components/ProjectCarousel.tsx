import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Play, ArrowRight } from 'lucide-react'

interface Project {
  id: string;
  title: string;
  summary: string;
  images: Array<{ src: string; alt?: string }>;
  stack?: string[];
  demoUrl?: string;
  repoUrl?: string;
}

interface ProjectCarouselProps {
  project?: Project;
  className?: string;
}

export default function ProjectCarousel({ project, className }: ProjectCarouselProps) {
  const [currentProject, setCurrentProject] = useState(0)
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

  const goToPrevious = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToNext = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const currentProjectData = projects[currentProject]

  return (
    <section aria-labelledby="projects-showcase" className={`relative py-20 overflow-hidden ${className || ''}`}>
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 60%)',
              'radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 60%)',
              'radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.3) 0%, transparent 60%)',
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 60%)'
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div
          className="absolute w-96 h-96 opacity-20 blur-3xl rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)`,
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
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${15 + (i * 15)}%`,
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
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="inline-block relative mb-6">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150" />
            <div className="relative bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6 mb-2">
              <h2 id="projects-showcase" className="text-4xl md:text-5xl font-bold text-blue-400 mb-4 pb-1 leading-normal">
                Progetti in Evidenza
              </h2>
            </div>
          </motion.div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scopri i miei lavori più significativi, dalle applicazioni web moderne ai progetti innovativi
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Project Info - Left Side */}
              <motion.div
                className="space-y-6"
                key={currentProject}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Project Counter */}
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                    <span className="text-blue-300 font-medium text-sm">
                      {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
                </div>

                {/* Project Title */}
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-blue-600 leading-tight"
                  layoutId={`title-${currentProject}`}
                >
                  {currentProjectData.title}
                </motion.h3>

                {/* Project Description */}
                <motion.p
                  className="text-lg text-gray-600 leading-relaxed"
                  layoutId={`description-${currentProject}`}
                >
                  {currentProjectData.summary}
                </motion.p>

                {/* Tech Stack */}
                {currentProjectData.stack && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      Tecnologie Utilizzate
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProjectData.stack.slice(0, 6).map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-gray-300 hover:bg-white/20 transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {currentProjectData.demoUrl && (
                    <motion.a
                      href={currentProjectData.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={18} />
                      Demo Live
                    </motion.a>
                  )}

                  {currentProjectData.repoUrl && (
                    <motion.a
                      href={currentProjectData.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                      Codice
                    </motion.a>
                  )}

                  <motion.button
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={18} />
                    Dettagli
                  </motion.button>
                </div>
              </motion.div>

              {/* Project Image & Controls - Right Side */}
              <div className="relative">
                {/* Main Project Image */}
                <motion.div
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 aspect-[4/3]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentProject}
                      src={currentProjectData.images[0]?.src || '/images/projects/project-1.jpg'}
                      alt={currentProjectData.images[0]?.alt || currentProjectData.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Navigation Arrows */}
                  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={goToPrevious}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={20} />
                    </motion.button>

                    <motion.button
                      onClick={goToNext}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={20} />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Project Thumbnails */}
                <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                  {projects.map((proj, index) => (
                    <motion.button
                      key={proj.id}
                      onClick={() => setCurrentProject(index)}
                      className={`
                        relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300
                        ${index === currentProject
                          ? 'border-blue-400 shadow-lg shadow-blue-400/25'
                          : 'border-white/20 hover:border-white/40'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={proj.images[0]?.src || '/images/projects/project-1.jpg'}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`
                        absolute inset-0 transition-opacity duration-300
                        ${index === currentProject ? 'bg-blue-500/20' : 'bg-black/20 hover:bg-black/10'}
                      `} />
                    </motion.button>
                  ))}
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {projects.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${index === currentProject ? 'w-8 bg-blue-400' : 'w-2 bg-white/30'
                        }`}
                      onClick={() => setCurrentProject(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link to="/projects">
              <motion.button
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Vedi Tutti i Progetti
                <ArrowRight size={18} />
              </motion.button>
            </Link>

            <p className="text-gray-600 mt-4">
              Naviga tra i progetti usando le frecce o cliccando sulle anteprime
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}