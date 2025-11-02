'use client'

import { useEffect, useState } from 'react'

interface CustomCursorProps {
  clickableItems?: string[]
}

export default function CustomCursor({ clickableItems = ['a', 'button', '[role="button"]'] }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', updateMousePosition)
    
    // Add event listeners for clickable elements
    clickableItems.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      
      clickableItems.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter)
          el.removeEventListener('mouseleave', handleMouseLeave)
        })
      })
    }
  }, [clickableItems])

  return (
    <>
      {/* Main cursor dot */}
      <div 
        className="cursor-dot"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          transform: isClicking ? 'scale(0.5)' : 'scale(1)',
          backgroundColor: isHovering ? '#ff0080' : '#00f5ff'
        }}
      />
      
      {/* Cursor ring */}
      <div 
        className={`cursor-ring ${isHovering ? 'hover' : ''}`}
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          transform: `scale(${isClicking ? 0.8 : 1})`,
          borderColor: isHovering ? '#ff0080' : '#00f5ff'
        }}
      />

      {/* Trail effect */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-[9997] rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20 blur-sm"
          style={{
            left: mousePosition.x - (i + 1) * 10,
            top: mousePosition.y - (i + 1) * 10,
            width: 8 + i * 4,
            height: 8 + i * 4,
            animationDelay: `${i * 0.05}s`,
            opacity: 1 - (i * 0.15),
          }}
        />
      ))}
    </>
  )
}