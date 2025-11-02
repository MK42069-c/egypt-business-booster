'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, MessageSquare, Target, Zap, Sparkles, Rocket, TrendingUp, Users } from 'lucide-react'
import CustomCursor from '@/components/ui/CustomCursor'
import ParticleBackground from '@/components/ui/ParticleBackground'
import Floating3DCard from '@/components/ui/Floating3DCard'
import MorphingBlob from '@/components/ui/MorphingBlob'
import Interactive3DButton from '@/components/ui/Interactive3DButton'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  const features = [
    {
      title: "Website Builder",
      description: "Create stunning websites with AI-powered drag-and-drop builder. Professional templates, custom domains, mobile-responsive design.",
      icon: <Globe className="w-6 h-6 text-white" />,
      gradient: "rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)",
      delay: 0.1
    },
    {
      title: "Content Studio",
      description: "Generate engaging social media content with advanced AI. Schedule posts across all platforms with smart automation.",
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      gradient: "rgba(16, 185, 129, 0.8), rgba(6, 182, 212, 0.8)",
      delay: 0.2
    },
    {
      title: "Ad Campaigns",
      description: "Launch and optimize high-converting ad campaigns. Multi-platform management with AI-powered performance insights.",
      icon: <Target className="w-6 h-6 text-white" />,
      gradient: "rgba(245, 101, 101, 0.8), rgba(239, 68, 68, 0.8)",
      delay: 0.3
    },
    {
      title: "Smart Analytics",
      description: "Real-time performance tracking with AI insights. Understand your audience, optimize campaigns, and boost ROI.",
      icon: <Zap className="w-6 h-6 text-white" />,
      gradient: "rgba(251, 191, 36, 0.8), rgba(245, 158, 11, 0.8)",
      delay: 0.4
    }
  ]

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "10,000+", label: "Happy Businesses" },
    { icon: <Rocket className="w-8 h-8" />, value: "500+", label: "Websites Created" },
    { icon: <Sparkles className="w-8 h-8" />, value: "50K+", label: "Content Generated" },
    { icon: <TrendingUp className="w-8 h-8" />, value: "95%", label: "Success Rate" }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Particle Background */}
      <ParticleBackground 
        particleCount={200}
        connectionDistance={100}
        particleColor="#00f5ff"
        connectionColor="rgba(0, 245, 255, 0.2)"
        speed={0.3}
      />

      {/* Morphing Blobs for Visual Appeal */}
      <MorphingBlob
        size={400}
        colors={['#00f5ff', '#ff0080', '#7c3aed']}
        position={{ top: '10%', left: '5%' }}
        opacity={0.4}
      />
      <MorphingBlob
        size={300}
        colors={['#ff0080', '#00f5ff', '#7c3aed']}
        position={{ bottom: '15%', right: '10%' }}
        opacity={0.3}
        animationDuration={10}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold holographic-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Egypt Business Booster
            </motion.div>
            <div className="flex gap-4">
              <Interactive3DButton 
                variant="glass" 
                size="sm"
                onClick={() => window.location.href = '/auth/login'}
              >
                Sign In
              </Interactive3DButton>
              <Interactive3DButton 
                variant="primary" 
                size="sm"
                onClick={() => window.location.href = '/auth/signup'}
              >
                Get Started
              </Interactive3DButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="block holographic-text">Boost Your</span>
              <span className="block neon-text">Digital Empire</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Complete AI-powered digital marketing platform for Egyptian SMEs. 
            Build websites, create content, manage campaigns, and grow your business with cutting-edge technology.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Interactive3DButton
              variant="neon"
              size="lg"
              className="text-xl px-8 py-4"
              onClick={() => window.location.href = '/auth/signup'}
            >
              Start Your Journey
              <Rocket className="ml-2 w-6 h-6" />
            </Interactive3DButton>
            <Interactive3DButton
              variant="glass"
              size="lg"
              className="text-xl px-8 py-4"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Features
            </Interactive3DButton>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-strong rounded-2xl p-6 text-center hover-lift"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="text-cyan-400 flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Mouse Trail */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/30 pointer-events-none"
            style={{
              left: mousePosition.x - i * 20,
              top: mousePosition.y - i * 20,
            }}
            animate={{
              scale: [1, 0.5, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="holographic-text">Everything You Need</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Powerful AI-driven tools to transform your business into a digital powerhouse
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Floating3DCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
                delay={feature.delay}
              >
                <Interactive3DButton variant="secondary" size="sm">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Interactive3DButton>
              </Floating3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="container mx-auto">
          <motion.div
            className="glass-strong rounded-3xl p-16 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 blur-2xl"></div>
            </div>

            <div className="relative z-10">
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="neon-text">Ready to Transform</span>
                <br />
                <span className="holographic-text">Your Business?</span>
              </motion.h2>

              <motion.p
                className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Join thousands of Egyptian businesses already growing with our revolutionary AI platform
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Interactive3DButton
                  variant="primary"
                  size="lg"
                  className="text-xl px-12 py-6"
                  onClick={() => window.location.href = '/auth/signup'}
                >
                  Start Free Trial
                  <Sparkles className="ml-3 w-6 h-6" />
                </Interactive3DButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <motion.p
            className="text-white/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            © 2025 Egypt Business Booster. Powered by MiniMax Agent. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}