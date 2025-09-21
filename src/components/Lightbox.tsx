import React, { useEffect } from 'react'
import { X } from 'lucide-react'

type Image = { src: string; alt: string }
type Props = { open: boolean; onClose: () => void; image?: Image }

export default function Lightbox({ open, onClose, image }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || !image) return null
  return (
    <div
      className="fixed inset-0 z-[60] bg-black/70 p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Lightbox"
      onClick={onClose}
    >
      <button
        className="absolute right-6 top-6 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentBlue"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="Chiudi lightbox"
      >
        <X />
      </button>
      <div className="flex h-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} className="max-h-full max-w-full rounded-xl shadow-2xl" />
      </div>
    </div>
  )
}
