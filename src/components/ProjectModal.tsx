import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { projects } from '@/data/projects'
import { X } from 'lucide-react'
import Lightbox from './Lightbox'

export default function ProjectModal() {
  const { slug } = useParams()
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug])
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const [lbIdx, setLbIdx] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate(-1) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  useEffect(() => {
    ref.current?.focus()
  }, [])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 p-4 sm:p-8"
      onClick={() => navigate(-1)}
      role="dialog"
      aria-modal="true"
      aria-label={`Dettagli progetto: ${project.title}`}
    >
      <div
        className="mx-auto max-w-4xl rounded-2xl bg-primary p-4 shadow-2xl outline-none dark:bg-darkNavy sm:p-6"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        ref={ref}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl">{project.title}</h3>
          <button
            onClick={() => navigate(-1)}
            className="rounded-md p-2 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentBlue"
            aria-label="Chiudi modale progetto"
          >
            <X />
          </button>
        </div>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{project.summary}</p>

        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <h4 className="text-lg">Obiettivi</h4>
            <ul className="mt-2 list-disc pl-4 text-sm text-slate-700 dark:text-slate-300">
              {project.goals.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-lg">Processo</h4>
            <ul className="mt-2 list-disc pl-4 text-sm text-slate-700 dark:text-slate-300">
              {project.process.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-lg">Risultati</h4>
            <ul className="mt-2 list-disc pl-4 text-sm text-slate-700 dark:text-slate-300">
              {project.results.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.images.map((img, idx) => (
            <button
              key={img.src}
              onClick={() => setLbIdx(idx)}
              className="overflow-hidden rounded-xl"
              aria-label={`Apri immagine: ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} className="aspect-video w-full object-cover transition-transform hover:scale-[1.02]" />
            </button>
          ))}
        </div>

        <Lightbox open={lbIdx !== null} onClose={() => setLbIdx(null)} image={lbIdx !== null ? project.images[lbIdx] : undefined} />
      </div>
    </div>
  )
}
