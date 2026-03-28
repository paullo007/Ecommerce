'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [once])

  const initialTransform = {
    up: 'translateY(32px)',
    down: 'translateY(-32px)',
    left: 'translateX(32px)',
    right: 'translateX(-32px)',
    none: 'none',
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : initialTransform[direction],
        transition: `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
}

export function StaggerContainer({
  children,
  className,
  stagger = 100,
  delay = 0,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  return (
    <div ref={ref} className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${delay + i * stagger}ms, transform 0.6s ease ${delay + i * stagger}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
