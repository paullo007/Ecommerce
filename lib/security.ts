import { NextRequest } from 'next/server'

// ─── CSRF: Origin Validation ─────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.NEXTAUTH_URL,
  'http://localhost:3000',
].filter(Boolean)

/**
 * Validates that a request originates from an allowed origin.
 * Checks the Origin header first, falls back to Referer.
 */
export function validateOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  const referer = req.headers.get('referer')

  // Origin header is most reliable
  if (origin) {
    return ALLOWED_ORIGINS.some((allowed) => origin === allowed)
  }

  // Fallback to referer
  if (referer) {
    return ALLOWED_ORIGINS.some((allowed) => allowed && referer.startsWith(allowed))
  }

  // No origin/referer — could be server-to-server; block by default for browser routes
  return false
}

// ─── Rate Limiting (in-memory, per-instance) ─────────────────────────────────

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now()
  rateLimitStore.forEach((entry, key) => {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key)
    }
  })
}, 60_000) // every 60s

/**
 * Simple in-memory rate limiter. Returns { allowed, remaining, retryAfterMs }.
 * For production at scale, replace with Redis/Upstash.
 *
 * @param key    - unique key (e.g., IP + route)
 * @param limit  - max requests per window
 * @param windowMs - time window in milliseconds
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, retryAfterMs: 0 }
  }

  entry.count++

  if (entry.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: entry.resetAt - now,
    }
  }

  return { allowed: true, remaining: limit - entry.count, retryAfterMs: 0 }
}

/**
 * Extract client IP from request for rate limiting.
 */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}
