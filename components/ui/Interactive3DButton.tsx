'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Interactive3DButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'neon' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  ripple?: boolean
}

export default function Interactive3DButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ripple = true
}: Interactive3DButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const variants = {
    primary: {
      base: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500',
      hover: 'hover:from-blue-700 hover:to-purple-700 hover:border-blue-400',
      active: 'active:from-blue-800 active:to-purple-800'
    },
    secondary: {
      base: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500',
      hover: 'hover:from-emerald-700 hover:to-teal-700 hover:border-emerald-400',
      active: 'active:from-emerald-800 active:to-teal-800'
    },
    neon: {
      base: 'bg-transparent text-cyan-400 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]',
      hover: 'hover:text-cyan-300 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]',
      active: 'active:text-cyan-200 active:border-cyan-200'
    },
    glass: {
      base: 'glass text-white border-white/30',
      hover: 'hover:bg-white/20 hover:border-white/50',
      active: 'active:bg-white/30'
    }
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ripple || disabled) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    
    setRipples(prev => [...prev, { id, x, y }])
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id))
    }, 1000)
  }

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden border-2 font-semibold transition-all duration-300 ease-out',
        'transform-gpu perspective-1000 cursor-none',
        'active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/20',
        variants[variant].base,
        variants[variant].hover,
        variants[variant].active,
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      disabled={disabled}
      whileHover={{
        y: -4,
        transition: { type: 'spring', stiffness: 400, damping: 17 }
      }}
      whileTap={{
        y: 0,
        scale: 0.98,
        transition: { type: 'spring', stiffness: 600, damping: 20 }
      }}
    >
      {/* Background shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        whileHover={{
          translateX: '100%',
          transition: { duration: 0.6, ease: 'easeInOut' }
        }}
      />

      {/* 3D depth effect */}
      <div
        className="absolute inset-0 rounded-inherit"
        style={{
          transform: 'translateZ(-10px)',
          background: 'linear-gradient(135deg, rgba(0,0,0,0.2), transparent)',
        }}
      />

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Glow effect for neon variant */}
      {variant === 'neon' && (
        <motion.div
          className="absolute inset-0 rounded-inherit opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}