import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  name: z.string().min(2, 'Inserisci almeno 2 caratteri'),
  email: z.string().email('Email non valida'),
  message: z.string().min(10, 'Scrivi almeno 10 caratteri'),
})
type FormData = z.infer<typeof FormSchema>

export default function ContactForm() {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(FormSchema) })

  async function onSubmit(data: FormData) {
    setToast(null)
    try {
      await new Promise((res) => setTimeout(res, 800))
      // success
      setToast({ type: 'success', msg: 'Messaggio inviato! Ti risponderò presto.' })
      reset()
    } catch {
      setToast({ type: 'error', msg: 'Si è verificato un errore. Riprova più tardi.' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-describedby="form-desc">
      <p id="form-desc" className="text-sm text-slate-600 dark:text-slate-300">
        Compila il form, ti risponderò entro 24-48 ore.
      </p>

      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 w-full rounded-lg border-slate-300 bg-white/70 dark:bg-white/10"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p role="alert" className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 w-full rounded-lg border-slate-300 bg-white/70 dark:bg-white/10"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p role="alert" className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Messaggio</label>
        <textarea
          rows={5}
          {...register('message')}
          className="mt-1 w-full rounded-lg border-slate-300 bg-white/70 dark:bg-white/10"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p role="alert" className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Invio…' : 'Invia'}
      </button>

      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 right-6 rounded-xl px-4 py-3 text-sm shadow-xl ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
        >
          {toast.msg}
        </div>
      )}
    </form>
  )
}