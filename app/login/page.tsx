'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (res?.error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — Image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=85"
          alt="Maison Avant-Garde interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="eyebrow text-terracotta mb-3">Welcome Back</p>
          <h2 className="font-display text-4xl font-light text-white leading-tight">
            Your curated home<br />awaits.
          </h2>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center bg-cream-100 px-6 py-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="block mb-10">
            <span className="font-display text-xl font-medium text-charcoal">
              Maison<span className="font-light italic"> Avant-Garde</span>
            </span>
          </Link>

          <h1 className="font-display text-display-md font-light text-charcoal mb-2">
            Sign In
          </h1>
          <p className="text-charcoal-400 text-sm mb-8">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-terracotta hover:text-terracotta-dark font-medium">
              Create one
            </Link>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs text-charcoal-400">Password</label>
                <Link href="/forgot-password" className="text-xs text-terracotta hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field-box pr-11"
                  placeholder="••••••••"
                  autoComplete="current-password"
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

            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading} className="group mt-2">
              Sign In
              <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cream-300" />
            </div>
            <div className="relative flex justify-center text-xs text-charcoal-400 bg-cream-100 px-3">
              or continue with
            </div>
          </div>

          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 bg-white border border-cream-300 rounded-full py-3 text-sm font-medium text-charcoal hover:border-charcoal transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
