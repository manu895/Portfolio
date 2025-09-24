import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, type Project } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '@/lib/seo'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc, 
  Calendar,
  Code2,
  FolderOpen,
  Sparkles,
  X
} from 'lucide-react'

type Filters = {
  category?: Project['category'] | 'All'
  year?: number | 'All'
  stack?: string | 'All'
  mode?: 'AND' | 'OR'
}

type ViewMode = 'grid' | 'list'
type SortBy = 'date' | 'name' | 'category'
type SortOrder = 'asc' | 'desc'

const unique = <T,>(arr: T[]) => Array.from(new Set(arr))

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState<Filters>({
    category: (params.get('category') as Filters['category']) || 'All',
    year: (params.get('year') ? Number(params.get('year')) : 'All') as Filters['year'],
    stack: (params.get('stack') as Filters['stack']) || 'All',
    mode: (params.get('mode') as Filters['mode']) || 'AND',
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortBy>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [showFilters, setShowFilters] = useState(false)
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

  const categories = useMemo(
    () => ['All', ...unique(projects.map((p) => p.category))] as const,
    [],
  )
  const years = useMemo(
    () => (['All', ...unique(projects.map((p) => p.year))] as const),
    [],
  )
  const stacks = useMemo(
    () => ['All', ...unique(projects.flatMap((p) => p.stack))] as const,
    [],
  )

  function updateParams(next: Partial<Filters>) {
    const f = { ...filters, ...next }
    setFilters(f)
    const nextParams = new URLSearchParams()
    if (f.category && f.category !== 'All') nextParams.set('category', String(f.category))
    if (f.year && f.year !== 'All') nextParams.set('year', String(f.year))
    if (f.stack && f.stack !== 'All') nextParams.set('stack', String(f.stack))
    if (f.mode) nextParams.set('mode', f.mode)
    setParams(nextParams, { replace: true })
  }

  const filtered = projects.filter((p) => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        p.title.toLowerCase().includes(searchLower) ||
        p.summary.toLowerCase().includes(searchLower) ||
        p.stack.some(tech => tech.toLowerCase().includes(searchLower))
      if (!matchesSearch) return false
    }

    // Other filters
    const checks: boolean[] = []
    if (filters.category && filters.category !== 'All') checks.push(p.category === filters.category)
    if (filters.year && filters.year !== 'All') checks.push(p.year === filters.year)
    if (filters.stack && filters.stack !== 'All') checks.push(p.stack.includes(filters.stack))
    if (checks.length === 0) return true
    return filters.mode === 'AND' ? checks.every(Boolean) : checks.some(Boolean)
  })

  // Sort filtered results
  const sortedAndFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'date':
          comparison = a.year - b.year
          break
        case 'name':
          comparison = a.title.localeCompare(b.title)
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [filtered, sortBy, sortOrder])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1]
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  }

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
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
      <Seo title="Progetti" path="/projects" />
      
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10">
        {/* Dynamic gradient background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
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

        {/* Mouse-following light */}
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

        {/* Grid pattern */}
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
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block relative mb-6"
            whileHover={{ scale: 1.02 }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl rounded-full scale-150" />
            
            {/* Title container */}
            <div className="relative bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  I Miei Progetti
                </span>
              </h1>
              
              {/* Sparkles */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={24} className="text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Una collezione curata dei miei lavori più significativi, 
            dove creatività e tecnologia si uniscono per creare esperienze digitali memorabili.
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="flex justify-center gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { number: projects.length, label: 'Progetti Totali', icon: FolderOpen },
              { number: categories.length - 1, label: 'Categorie', icon: Grid3X3 },
              { number: stacks.length - 1, label: 'Tecnologie', icon: Code2 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="flex justify-center mb-2">
                  <stat.icon size={20} className="text-blue-400" />
                </div>
                <motion.div 
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca progetti, tecnologie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-400 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  style={{color: 'rgb(75, 85, 99)' }}
                />

                {searchTerm && (
                  <motion.button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {/* View Mode Toggle */}
                <div className="flex bg-white/10 rounded-xl p-1">
                  {[
                    { mode: 'grid' as ViewMode, icon: Grid3X3, label: 'Griglia' },
                    { mode: 'list' as ViewMode, icon: List, label: 'Lista' }
                  ].map(({ mode, icon: Icon, label }) => (
                    <motion.button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`
                        px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
                        ${viewMode === mode 
                          ? 'bg-blue-500 text-white shadow-lg' 
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={label}
                    >
                      <Icon size={16} />
                    </motion.button>
                  ))}
                </div>

                {/* Sort Controls */}
                <div className="flex bg-white/10 rounded-xl p-1">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="bg-white border border-gray-400 text-blue-400 text-sm px-4 py-2 rounded-xl focus:outline-none"
                  >
                    <option value="date" className="bg-white text-blue-400">Data</option>
                    <option value="name" className="bg-white text-blue-400">Nome</option>
                    <option value="category" className="bg-white text-blue-400">Categoria</option>
                  </select>
                  
                  <motion.button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                  </motion.button>
                </div>

                {/* Filters Toggle */}
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`
                    px-4 py-2 rounded-xl border transition-all duration-300 flex items-center gap-2
                    ${showFilters 
                      ? 'bg-blue-500 border-blue-400 text-white' 
                      : 'bg-white/10 border-gray-400 text-blue-400 hover:border-gray-300'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter size={16} />
                  Filtri
                </motion.button>
              </div>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-white/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
                        <FolderOpen size={16} />
                        Categoria
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-white border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={filters.category}
                        onChange={(e) => updateParams({ category: e.target.value as Filters['category'] })}
                      >
                        {categories.map((c) => (
                          <option key={c} value={c} className="bg-white text-gray-800">{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Year Filter */}
                    <div>
                      <label className="block text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
                        <Calendar size={16} />
                        Anno
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-white border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={String(filters.year)}
                        onChange={(e) => updateParams({ year: e.target.value === 'All' ? 'All' : Number(e.target.value) })}
                      >
                        {years.map((y) => (
                          <option key={String(y)} value={String(y)} className="bg-white text-gray-800">{String(y)}</option>
                        ))}
                      </select>
                    </div>

                    {/* Stack Filter */}
                    <div>
                      <label className="block text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
                        <Code2 size={16} />
                        Tecnologia
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-white border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={filters.stack}
                        onChange={(e) => updateParams({ stack: e.target.value as Filters['stack'] })}
                      >
                        {stacks.map((s) => (
                          <option key={s} value={s} className="bg-white text-gray-800">{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Mode Filter */}
                    <div>
                      <label className="block text-sm font-medium text-blue-400 mb-2">
                        Combinazione
                      </label>
                      <select
                        className="w-full px-3 py-2 bg-white border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={filters.mode}
                        onChange={(e) => updateParams({ mode: e.target.value as Filters['mode'] })}
                      >
                        <option value="AND" className="bg-white text-gray-800">AND (tutti)</option>
                        <option value="OR" className="bg-white text-gray-800">OR (almeno uno)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6 text-center"
        >
          <span className="text-gray-400">
            {sortedAndFiltered.length === projects.length 
              ? `Tutti i ${projects.length} progetti`
              : `${sortedAndFiltered.length} di ${projects.length} progetti`
            }
          </span>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${searchTerm}-${JSON.stringify(filters)}-${sortBy}-${sortOrder}-${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              grid gap-6 
              ${viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-4xl mx-auto'
              }
            `}
          >
            {sortedAndFiltered.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {sortedAndFiltered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
              >
                <Search size={48} className="text-gray-400 mx-auto" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Nessun progetto trovato
              </h3>
              <p className="text-gray-400 mb-4">
                Prova a modificare i filtri o il termine di ricerca
              </p>
              <motion.button
                onClick={() => {
                  setSearchTerm('')
                  setFilters({
                    category: 'All',
                    year: 'All',
                    stack: 'All',
                    mode: 'AND'
                  })
                  setParams(new URLSearchParams(), { replace: true })
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resetta filtri
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}