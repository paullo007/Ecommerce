'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed.')
        setLoading(false)
        return
      }

      // Auto sign-in after registration
      await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      })

      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const perks = [
    'Track orders and manage returns',
    'Save your wishlist across devices',
    'Exclusive member-only offers',
    'Early access to new collections',
  ]

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — Image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85"
          alt="Maison Avant-Garde design"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="eyebrow text-terracotta mb-4">Member Benefits</p>
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <CheckCircle2 size={14} className="text-terracotta flex-shrink-0" />
                <span className="text-white/90 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center bg-cream-100 px-6 py-16">
        <div className="w-full max-w-md">
          <Link href="/" className="block mb-10">
            <span className="font-display text-xl font-medium text-charcoal">
              Maison<span className="font-light italic"> Avant-Garde</span>
            </span>
          </Link>

          <h1 className="font-display text-display-md font-light text-charcoal mb-2">
            Create Account
          </h1>
          <p className="text-charcoal-400 text-sm mb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-terracotta hover:text-terracotta-dark font-medium">
              Sign in
            </Link>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-charcoal-400 mb-1.5 block">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field-box"
                placeholder="Jane Smith"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="text-xs text-charcoal-400 mb-1.5 block">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field-box"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-xs text-charcoal-400 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field-box pr-11"
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-charcoal-400 mb-1.5 block">Confirm Password</label>
              <input
                type="password"
                required
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="input-field-box"
                placeholder="Re-enter password"
                autoComplete="new-password"
              />
            </div>

            <p className="text-xs text-charcoal-400">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="underline hover:text-terracotta">Terms</Link> and{' '}
              <Link href="/privacy" className="underline hover:text-terracotta">Privacy Policy</Link>.
            </p>

            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading} className="group mt-2">
              Create Account
              <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
