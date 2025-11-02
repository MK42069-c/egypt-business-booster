'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MorphingBlobProps {
  size?: number
  colors: string[]
  position?: { top?: string; left?: string; right?: string; bottom?: string }
  animationDuration?: number
  opacity?: number
  className?: string
}

export default function MorphingBlob({
  size = 300,
  colors,
  position = { top: '20%', right: '10%' },
  animationDuration = 8,
  opacity = 0.6,
  className = ''
}: MorphingBlobProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const blobVariants = {
    animate: {
      borderRadius: [
        '60% 40% 30% 70%/60% 30% 70% 40%',
        '30% 60% 70% 40%/50% 60% 30% 60%',
        '80% 20% 40% 60%/50% 40% 50% 50%',
        '60% 40% 30% 70%/40% 50% 60% 30%',
        '50% 60% 40% 50%/70% 30% 60% 40%',
        '60% 40% 30% 70%/60% 30% 70% 40%'
      ],
      background: [
        `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        `linear-gradient(225deg, ${colors[1]}, ${colors[2] || colors[0]})`,
        `linear-gradient(45deg, ${colors[2] || colors[0]}, ${colors[0]})`,
        `linear-gradient(315deg, ${colors[0]}, ${colors[1]})`
      ],
      scale: [1, 1.1, 0.9, 1.05, 1],
      rotate: [0, 90, 180, 270, 360]
    }
  }

  return (
    <motion.div
      className={`absolute pointer-events-none z-0 ${className}`}
      style={position}
      variants={blobVariants}
      animate="animate"
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <motion.div
        className="relative"
        style={{
          width: size,
          height: size,
          opacity: opacity,
          filter: 'blur(60px)'
        }}
      >
        {/* Main blob */}
        <motion.div
          className="absolute inset-0 rounded-full"
          variants={blobVariants}
          animate="animate"
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        {/* Additional floating elements */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: size * (0.3 + i * 0.2),
              height: size * (0.3 + i * 0.2),
              top: `${20 + i * 10}%`,
              left: `${10 + i * 15}%`,
              background: `linear-gradient(45deg, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})`,
              filter: 'blur(40px)'
            }}
            animate={{
              scale: [1, 1.2, 0.8, 1],
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: animationDuration * (1.5 + i * 0.5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}