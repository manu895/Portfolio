import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Seo } from '@/lib/seo'
import {
  Code2,
  Palette,
  Zap,
  Heart,
  Coffee,
  Lightbulb,
  Target,
  Users,
  Award,
  Calendar,
  MapPin,
  Mail,
  Download,
  ExternalLink,
  Sparkles,
  Star,
  Quote
} from 'lucide-react'

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentWord, setCurrentWord] = useState(0)
  const { scrollY } = useScroll()

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const rotate = useTransform(scrollY, [0, 300], [0, 10])

  const words = ['Sviluppatore', 'Creativo', 'Innovatore', 'Problem Solver']

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(wordInterval)
    }
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

  const skills = [
    {
      name: 'Frontend Development',
      level: 95,
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
    },
    {
      name: 'UI/UX Design',
      level: 85,
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      tech: ['Figma', 'Adobe XD', 'Framer', 'Design Systems']
    },
    {
      name: 'Backend Development',
      level: 80,
      icon: Zap,
      color: 'from-emerald-500 to-teal-500',
      tech: ['Node.js', 'Express', 'APIs', 'Database']
    }
  ]

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovazione',
      description: 'Sempre alla ricerca di nuove tecnologie e approcci per creare soluzioni migliori.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Users,
      title: 'Collaborazione',
      description: 'Credo nel potere del lavoro di squadra e nella condivisione delle conoscenze.',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Target,
      title: 'Eccellenza',
      description: 'Ogni progetto è un\'opportunità per superare le aspettative e creare valore.',
      color: 'from-emerald-400 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Passione',
      description: 'Il codice è  arte, ogni riga viene scritta con cura e dedizione.',
      color: 'from-pink-400 to-rose-500'
    }
  ]

  const stats = [
    { number: '50+', label: 'Progetti Completati', icon: Award },
    { number: '3+', label: 'Anni Esperienza', icon: Calendar },
    { number: '100%', label: 'Clienti Soddisfatti', icon: Star },
    { number: '24/7', label: 'Passione per il Codice', icon: Coffee }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Seo title="Chi Sono" path="/about" />

      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 20% 70%, rgba(6, 182, 212, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

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

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-2 mb-32"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative order-2 lg:order-1"
            style={{ y: y1 }}
          >
            <motion.div
              className="relative mx-auto w-80 h-80"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated background blob */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-[40%_60%_60%_40%/60%_40%_60%_40%]"
                animate={{
                  borderRadius: [
                    "40% 60% 60% 40% / 60% 40% 60% 40%",
                    "60% 40% 40% 60% / 40% 60% 40% 60%",
                    "40% 60% 60% 40% / 60% 40% 60% 40%"
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-[40%_60%_60%_40%/60%_40%_60%_40%] blur-xl scale-110" />

              {/* Main image */}
              <motion.img
                src="/images/projects/fotomanu.jpg"
                alt="Manuel Bologna - Frontend Developer"
                className="absolute left-6 top-6 h-72 w-72 rounded-[40%_60%_60%_40%/60%_40%_60%_40%] object-cover border-2 border-white/20 shadow-2xl"
                style={{ rotate }}
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  borderColor: "rgba(255, 255, 255, 0.4)"
                }}
              />

              {/* Floating icons */}
              {[Code2, Palette, Zap, Heart].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center"
                  style={{
                    left: `${20 + (index * 70)}%`,
                    top: `${10 + (index % 2) * 80}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Icon size={20} className="text-blue-400" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Content */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <motion.div className="mb-6">
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-blue-300"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles size={16} />
                Ciao, sono Manuel! 👋
              </motion.span>
            </motion.div>

            <h1 className="mb-6 text-4xl md:text-6xl font-bold leading-tight pb-3">
              <span className="block text-blue-600 pb-3">Full-stack</span>
              <motion.span
                key={currentWord}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent pb-4"
              >
                {words[currentWord]}
              </motion.span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sono un web developer specializzato in <strong className="text-blue-300">React</strong> e UI moderne,
              con forte attenzione a <strong className="text-purple-300">performance</strong>,
              <strong className="text-cyan-300"> accessibilità</strong> e developer experience.
              Trasformo idee creative in esperienze digitali coinvolgenti.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <motion.a
                href="/assets/cv/cv.pdf"
                download="Manuel_Bologna_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300 inline-flex no-underline"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                Scarica CV
              </motion.a>
              
              <motion.button
                className="px-6 py-3 bg-black/40 backdrop-blur-md border border-white/30 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-black/50 transition-all duration-300 shadow-lg"
                style={{
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Contattami
              </motion.button>
            </div>

            {/* Quick info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Piazza Armerina, Italia
              </div>
              <div className="flex items-center gap-2">
                <Coffee size={16} />
                Disponibile per progetti
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                    <stat.icon size={24} className="text-blue-400" />
                  </div>
                </div>
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-600"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Le Mie Competenze
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 bg-gradient-to-r ${skill.color} rounded-xl`}>
                    <skill.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-600 text-lg">{skill.name}</h3>
                    <div className="text-sm text-gray-600">{skill.level}% competenza</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      className={`h-3 bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-600"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            I Miei Valori
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-4 bg-gradient-to-r ${value.color} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon size={28} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Quote size={48} className="text-blue-400" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
              Pronto per il prossimo progetto?
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Sono sempre interessato a nuove sfide e collaborazioni.
              Parliamo di come posso aiutarti a realizzare le tue idee!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Iniziamo a Collaborare
              </motion.button>

              <motion.button
                className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-medium flex items-center gap-2 justify-center hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                Vedi i Progetti
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}