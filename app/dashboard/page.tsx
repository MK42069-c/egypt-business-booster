'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Egypt Business Booster
              </h1>
              <p className="text-gray-600">
                Welcome back, {user.user_metadata?.full_name || user.email}
              </p>
            </div>
            <Button
              onClick={() => {
                signOut()
                router.push('/')
              }}
              variant="outline"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Feature Cards */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Website Builder</h3>
                  <p className="text-blue-100">Create stunning websites with our AI-powered builder</p>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Content Studio</h3>
                  <p className="text-emerald-100">Generate engaging social media content</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                  <p className="text-orange-100">Track your business performance</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Account
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>User ID:</strong> {user.id}</p>
                  <p><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}