import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Seo } from '@/lib/seo'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Calendar,
  CheckCircle,
  Star,
  Globe,
  Github,
  Linkedin,
  Coffee,
  Zap,
  Heart,
  Award,
  Users,
  Rocket,
  Shield,
  Target
} from 'lucide-react'

interface ContactMethod {
  icon: React.ReactNode
  title: string
  description: string
  value: string
  color: string
  bgColor: string
  action: string
  href: string
}

interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  color: string
  description: string
}

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  // Funzione per scrollare alle card contatti
  const scrollToContactMethods = () => {
    const contactSection = document.getElementById('contact-methods')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  }

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

  const contactMethods: ContactMethod[] = [
    {
      icon: <Mail size={28} />,
      title: 'Email',
      description: 'Scrivimi per qualsiasi domanda o proposta di collaborazione',
      value: 'manuelbologna92@gmail.com',
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      action: 'Invia Email',
      href: 'mailto:manuelbologna92@gmail.com'
    },
    {
      icon: <Phone size={28} />,
      title: 'Telefono',
      description: 'Chiamami per discussioni rapide e consulenze immediate',
      value: '+39 3208475452',
      color: 'text-emerald-400',
      bgColor: 'from-emerald-500/20 to-teal-500/20',
      action: 'Chiama Ora',
      href: 'tel:+393208475452'
    },
    {
      icon: <Calendar size={28} />,
      title: 'Meeting',
      description: 'Prenota una call gratuita di 30 minuti per il tuo progetto',
      value: 'Google Meet / Zoom',
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      action: 'Prenota Call',
      href: 'mailto:manuelbologna92@gmail.com?subject=Richiesta Call Gratuita&body=Ciao Manuel,%0D%0A%0D%0AVorrei prenotare una call gratuita per discutere del mio progetto.%0D%0A%0D%0ADisponibilità preferita:%0D%0ADescrizione progetto:%0D%0A%0D%0AGrazie!'
    },
    {
      icon: <MessageCircle size={28} />,
      title: 'WhatsApp',
      description: 'Contattami su WhatsApp per comunicazioni veloci',
      value: '+39 3208475452',
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-lime-500/20',
      action: 'Apri Chat',
      href: 'https://wa.me/393208475452'
    }
  ]

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      icon: <Github size={24} />,
      url: 'https://github.com/manuel-bologna',
      color: 'hover:text-gray-700 dark:hover:text-white',
      description: 'Codice e progetti open source'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      url: 'https://www.linkedin.com/in/manuel-alfredo-bologna-67975118a/',
      color: 'hover:text-blue-600',
      description: 'Profilo professionale e network'
    }
  ]

  const quickFacts = [
    { icon: <Clock size={20} />, text: 'Risposta in 24h', color: 'text-blue-400' },
    { icon: <Shield size={20} />, text: 'Consulenza gratuita', color: 'text-emerald-400' },
    { icon: <Target size={20} />, text: 'Progetti su misura', color: 'text-purple-400' },
    { icon: <Award size={20} />, text: '100% soddisfazione', color: 'text-orange-400' }
  ]

  const availability = [
    { day: 'Lunedì - Venerdì', hours: '9:00 - 18:00', available: true },
    { day: 'Weekend', hours: 'Solo urgenze', available: false },
    { day: 'Festivi', hours: 'Non disponibile', available: false }
  ]

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Seo title="Contatti" path="/contact" />
      
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 50% 25%, rgba(6, 182, 212, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)'
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
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-32"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-blue-300"
              whileHover={{ scale: 1.05 }}
            >
              <Send size={16} />
              Iniziamo a Collaborare
            </motion.span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-8 text-blue-600 pb-6"
          >
            Come Contattarmi
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Hai un'idea brillante che vuoi trasformare in realtà digitale? 
            Sono qui per ascoltarti e aiutarti a realizzare progetti che fanno la differenza. 
            Scegli il metodo di contatto che preferisci!
          </motion.p>

          {/* Quick Facts */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {quickFacts.map((fact, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={fact.color}>
                  {fact.icon}
                </div>
                <span className="text-gray-600 font-medium">{fact.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contact Methods */}
        <motion.section
          id="contact-methods"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="flex justify-center mb-6">
                  <div className={`p-4 bg-gradient-to-r ${method.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <div className={method.color}>
                      {method.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-blue-600 mb-3">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{method.description}</p>
                <div className="text-lg font-semibold text-gray-600 mb-6">{method.value}</div>

                <motion.a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : '_self'}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`block w-full px-4 py-3 bg-gradient-to-r ${method.bgColor} border border-white/20 rounded-xl font-medium transition-all duration-300 hover:shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={method.color}>{method.action}</span>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Info Grid - Centrato e ottimizzato */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto mb-32">
          {/* Location & Hours */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl">
                <MapPin size={24} className="text-emerald-400" />
              </div>
              <h4 className="text-xl font-bold text-blue-600">Informazioni</h4>
            </div>

            <div className="space-y-6">
              <div>
                <div className="font-medium text-blue-600 mb-2">Ubicazione</div>
                <div className="text-gray-600">Piazza Armerina, Italia</div>
                <div className="text-sm text-gray-600">Disponibile per progetti remoti</div>
              </div>

              <div>
                <div className="font-medium text-blue-600 mb-3">Disponibilità</div>
                <div className="space-y-3">
                  {availability.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-600 font-medium">{slot.day}</span>
                      <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                        slot.available 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-500'
                      }`}>
                        {slot.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links & Response Time */}
          <motion.div
            className="space-y-8"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                  <Globe size={24} className="text-purple-400" />
                </div>
                <h4 className="text-xl font-bold text-blue-600">Social & Portfolio</h4>
              </div>

              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className={`transition-colors duration-300 ${social.color}`}>
                      {social.icon}
                    </div>
                    <div>
                      <div className="font-medium text-blue-600">{social.name}</div>
                      <div className="text-sm text-gray-600">{social.description}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response Time Promise */}
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <CheckCircle size={32} className="text-green-400" />
              </motion.div>
              
              <h4 className="text-xl font-bold text-blue-600 mb-3">Garanzia di Risposta</h4>
              <p className="text-gray-600 text-sm mb-6">
                Ti garantisco una risposta entro 24 ore per ogni richiesta. 
                Per urgenze, contattami direttamente via WhatsApp.
              </p>
              
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">24h</div>
                  <div className="text-xs text-gray-600">Email</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">2h</div>
                  <div className="text-xs text-gray-600">WhatsApp</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">30min</div>
                  <div className="text-xs text-gray-600">Call</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <motion.div
              className="flex justify-center gap-4 mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket size={24} className="text-blue-400" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Star size={24} className="text-purple-400" />
              </motion.div>
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Heart size={24} className="text-pink-400" />
              </motion.div>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
              Pronto a Dare Vita al Tuo Progetto?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Non aspettare che l'ispirazione svanisca. Contattami oggi stesso 
              e iniziamo a trasformare la tua visione in una realtà digitale di successo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                onClick={scrollToContactMethods}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Inizia il Progetto
              </motion.button>
              
              <motion.a
                href="https://wa.me/393208475452"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 border border-white/20 text-blue-600 rounded-xl font-medium flex items-center gap-2 justify-center hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Coffee size={20} />
                Prenota un Caffè Virtuale
              </motion.a>
            </div>

            {/* Final Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} className="text-green-400" />
                Consulenza gratuita
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} className="text-blue-400" />
                15+ progetti completati
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award size={16} className="text-purple-400" />
                2+ anni esperienza
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap size={16} className="text-yellow-400" />
                Delivery veloce
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}