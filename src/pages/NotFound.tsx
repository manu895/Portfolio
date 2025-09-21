import React from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '@/lib/seo'

export default function NotFound() {
  return (
    <div className="container-px mx-auto py-16 text-center">
      <Seo title="Pagina non trovata" />
      <h1 className="mb-2 text-3xl">404</h1>
      <p className="mb-6 text-slate-600 dark:text-slate-300">La pagina che cerchi non esiste.</p>
      <Link to="/" className="btn-primary">Torna alla home</Link>
    </div>
  )
}
