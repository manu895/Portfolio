import React, { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Import diretti per debug
import Header from './components/Header'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const state = location.state as { backgroundLocation?: Location } | undefined
  const background = state?.backgroundLocation

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes location={background ?? location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Modal route overlay - solo quando c'è background */}
        {background && (
          <Routes>
            <Route path="/projects/:slug" element={<ProjectModal />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  )
}