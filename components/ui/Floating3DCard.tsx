'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Floating3DCardProps {
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  delay?: number
  children?: React.ReactNode
}

export default function Floating3DCard({
  title,
  description,
  icon,
  gradient,
  delay = 0,
  children
}: Floating3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    setMousePosition({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: 45,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: delay
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative"
    >
      <div
        ref={cardRef}
        className="relative w-full h-80 perspective-1000 group cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Card */}
        <div
          className="absolute inset-0 glass-strong rounded-2xl p-6 transition-all duration-500 ease-out"
          style={{
            transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateZ(${isHovered ? '30px' : '0px'})`,
            transformStyle: 'preserve-3d',
            background: `linear-gradient(135deg, ${gradient.split(',')[0]}, ${gradient.split(',')[1]})`,
            boxShadow: isHovered ? 
              '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 245, 255, 0.3)' :
              '0 8px 32px rgba(31, 38, 135, 0.37)'
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-gradient-to-tr from-white/20 to-transparent blur-lg"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                {icon}
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 transform translate-z-10">
              {title}
            </h3>
            
            <p className="text-white/80 text-sm leading-relaxed flex-1 transform translate-z-5">
              {description}
            </p>

            <div className="mt-6 transform translate-z-0">
              {children || (
                <button className="w-full py-2 px-4 rounded-xl glass hover:bg-white/20 transition-all duration-300 text-white font-medium">
                  Explore
                </button>
              )}
            </div>
          </div>

          {/* Hover Glow Effect */}
          {isHovered && (
            <div 
              className="absolute inset-0 rounded-2xl opacity-50 blur-xl"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x > 0 ? '30%' : '70%'} ${mousePosition.y > 0 ? '30%' : '70%'}, ${gradient}, transparent)`
              }}
            />
          )}
        </div>

        {/* Shadow */}
        <div
          className="absolute inset-0 rounded-2xl bg-black/20 blur-xl transform translate-z-[-30px] scale-110 transition-all duration-500"
          style={{
            opacity: isHovered ? 0.4 : 0.2
          }}
        />

        {/* Floating Elements */}
        {isHovered && (
          <>
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/60 animate-pulse"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${10 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  )
}