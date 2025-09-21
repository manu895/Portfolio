import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Seo } from '@/lib/seo'
import { 
  Code2, 
  Gauge, 
  Sparkles, 
  Wrench, 
  Rocket,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
  Target,
  Zap,
  Star,
  Quote,
  Mail,
  Calendar,
  Plus,
  Minus,
  ExternalLink,
  Database,
  Smartphone,
  Palette,
  Search,
  Shield
} from 'lucide-react'

interface Service {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  color: string
  bgColor: string
  price: string
  popular?: boolean
}

interface ProcessStep {
  number: string
  title: string
  description: string
  icon: React.ReactNode
  duration: string
}

interface FAQ {
  question: string
  answer: string
}

export default function Services() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeService, setActiveService] = useState(0)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const { scrollY } = useScroll()
  
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

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

  const services: Service[] = [
    { 
      title: 'Sviluppo Web', 
      description: 'Siti web moderni, performanti e completamente responsive. Dalle landing page ai portali complessi.',
      icon: <Code2 size={32} />,
      features: [
        'Design responsive per tutti i dispositivi',
        'Performance ottimizzate (Core Web Vitals)',
        'SEO-friendly e accessibile',
        'CMS personalizzati',
        'Integrazione API e database'
      ],
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      price: 'Da €2.500',
      popular: true
    },
    { 
      title: 'SPA React', 
      description: 'Single Page Applications scalabili con React, TypeScript e architetture moderne.',
      icon: <Sparkles size={32} />,
      features: [
        'Architettura component-based',
        'State management avanzato',
        'TypeScript per robustezza',
        'Testing automatizzato',
        'Deploy e CI/CD'
      ],
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      price: 'Da €3.500'
    },
    { 
      title: 'Performance & SEO', 
      description: 'Ottimizzazione velocità, Core Web Vitals e posizionamento sui motori di ricerca.',
      icon: <Gauge size={32} />,
      features: [
        'Audit completo performance',
        'Ottimizzazione Core Web Vitals',
        'SEO tecnico e content',
        'Monitoring e analytics',
        'Speed optimization'
      ],
      color: 'text-emerald-400',
      bgColor: 'from-emerald-500/20 to-teal-500/20',
      price: 'Da €1.500'
    },
    { 
      title: 'UX/UI Design', 
      description: 'Design systems, prototipazione e ottimizzazione dell\'esperienza utente.',
      icon: <Wrench size={32} />,
      features: [
        'Research e user personas',
        'Wireframing e prototyping',
        'Design system creation',
        'Usability testing',
        'Interface optimization'
      ],
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-red-500/20',
      price: 'Da €2.000'
    }
  ]

  const additionalServices = [
    { title: 'E-commerce', icon: <Database size={24} />, desc: 'Shop online completi' },
    { title: 'App Mobile', icon: <Smartphone size={24} />, desc: 'React Native apps' },
    { title: 'Brand Identity', icon: <Palette size={24} />, desc: 'Logo e visual identity' },
    { title: 'Digital Marketing', icon: <Search size={24} />, desc: 'SEO e advertising' },
    { title: 'Consulenza Tech', icon: <Shield size={24} />, desc: 'Architecture review' },
    { title: 'Maintenance', icon: <Wrench size={24} />, desc: 'Supporto continuativo' }
  ]

  const processSteps: ProcessStep[] = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'Analizziamo insieme i tuoi obiettivi, il target e i requisiti tecnici per definire la strategia ottimale.',
      icon: <Target size={28} />,
      duration: '1-2 settimane'
    },
    {
      number: '02',
      title: 'Design & Prototipazione',
      description: 'Creiamo wireframes, mockup e prototipi interattivi per validare l\'esperienza utente.',
      icon: <Palette size={28} />,
      duration: '2-3 settimane'
    },
    {
      number: '03',
      title: 'Sviluppo & Testing',
      description: 'Sviluppiamo il prodotto con metodologie agili, testing continuo e code review.',
      icon: <Code2 size={28} />,
      duration: '4-8 settimane'
    },
    {
      number: '04',
      title: 'Launch & Ottimizzazione',
      description: 'Deploy, monitoraggio performance e ottimizzazioni continue basate sui dati reali.',
      icon: <Rocket size={28} />,
      duration: 'Ongoing'
    }
  ]

  const faqs: FAQ[] = [
    {
      question: 'Quanto tempo richiede lo sviluppo di un sito web?',
      answer: 'I tempi variano in base alla complessità: una landing page richiede 2-3 settimane, un sito aziendale 4-6 settimane, mentre applicazioni complesse possono richiedere 2-4 mesi. Ogni progetto include fasi di planning, design, sviluppo e testing.'
    },
    {
      question: 'Fornisci anche hosting e manutenzione?',
      answer: 'Sì, offro soluzioni complete che includono hosting ottimizzato, backup automatici, aggiornamenti di sicurezza e manutenzione tecnica. Posso gestire tutto il ciclo di vita del tuo progetto digitale.'
    },
    {
      question: 'I siti sono ottimizzati per mobile?',
      answer: 'Assolutamente! Tutti i progetti sono sviluppati con approccio mobile-first, garantendo un\'esperienza perfetta su tutti i dispositivi. Testo performance e usabilità su diverse dimensioni di schermo.'
    },
    {
      question: 'Posso vedere esempi del tuo lavoro?',
      answer: 'Certamente! Nella sezione progetti puoi trovare case studies dettagliati con tecnologie utilizzate, sfide risolte e risultati ottenuti. Sono disponibile anche per mostrarti demo live.'
    },
    {
      question: 'Offri formazione per gestire il sito autonomamente?',
      answer: 'Sì, includo sempre sessioni di training per permetterti di gestire contenuti e funzionalità base in autonomia. Fornisco anche documentazione dettagliata e video tutorial personalizzati.'
    }
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
      <Seo title="Servizi" path="/services" />
      
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 40% 50%, rgba(6, 182, 212, 0.4) 0%, transparent 60%)',
              'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)'
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
              <Rocket size={16} />
              Servizi Professionali
            </motion.span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-8 text-blue-600"
          >
            <span className="block">Trasformo le Tue Idee in</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent pb-4">
              Soluzioni Digitali
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Offro servizi completi di sviluppo web, dalle landing page performanti 
            alle applicazioni complesse. Ogni progetto è pensato per massimizzare 
            il tuo ROI e creare valore per i tuoi utenti.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar size={20} />
              Prenota Consulenza Gratuita
            </motion.button>
            
            <motion.button
              className="px-8 py-4 bg-white/10 border border-white/20 text-blue-600 rounded-xl font-medium flex items-center gap-2 justify-center hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={20} />
              Vedi Portfolio
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Main Services */}
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
            Servizi Principali
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className={`
                  relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl 
                  hover:bg-white/10 transition-all duration-300 group cursor-pointer
                  ${service.popular ? 'ring-2 ring-blue-400/50' : ''}
                `}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setActiveService(index)}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium rounded-full">
                      Più Richiesto
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 bg-gradient-to-r ${service.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <div className={service.color}>
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">{service.title}</h3>
                    <div className="text-lg font-semibold text-gray-600">{service.price}</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-sm text-blue-400 font-medium">
                      +{service.features.length - 3} altre funzionalità
                    </li>
                  )}
                </ul>

                <motion.button
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Scopri di Più
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Additional Services */}
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
            Altri Servizi
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-blue-400">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-blue-600 text-sm mb-1">{service.title}</h3>
                <p className="text-xs text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process Section */}
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
            Come Lavoriamo Insieme
          </motion.h2>

          <div className="relative">
            {/* Process line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transform -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative text-center"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Step number */}
                  <div className="relative z-10 mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                        <div className="text-blue-400">
                          {step.icon}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-blue-600 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.description}</p>
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                      <Clock size={14} />
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
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
            Domande Frequenti
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-semibold text-blue-600">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openFAQ === index ? <Minus size={20} /> : <Plus size={20} />}
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

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
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Rocket size={48} className="text-blue-400" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
              Pronto a Iniziare il Tuo Progetto?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Trasformiamo insieme la tua visione in realtà digitale. 
              Contattami per una consulenza gratuita e scopri come posso aiutarti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Contattami Ora
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-white/10 border border-white/20 text-blue-600 rounded-xl font-medium flex items-center gap-2 justify-center hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar size={20} />
                Prenota Call Gratuita
              </motion.button>
            </div>

            {/* Trust indicators */}
            <div className="flex justify-center items-center gap-8 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">48h</div>
                <div className="text-sm text-gray-600">Risposta garantita</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-sm text-gray-600">Soddisfazione clienti</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">3+</div>
                <div className="text-sm text-gray-600">Anni esperienza</div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}