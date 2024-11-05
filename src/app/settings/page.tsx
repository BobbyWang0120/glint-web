'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

type SettingsForm = {
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function Settings() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState<SettingsForm>({
    email: session?.user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    try {
      const res = await fetch('/api/settings/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      })

      if (!res.ok) {
        const error = await res.text()
        throw new Error(error)
      }

      setSuccess('Account updated successfully')
      setIsEditing(false)
      // 重置密码字段
      setForm(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update account')
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch('/api/settings/delete', {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete account')
      }

      router.push('/auth/login')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete account')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto pt-32 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header with Back Button */}
          <div className="px-8 py-6 border-b border-gray-200 flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            {/* Account Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <p className="mt-1 text-sm text-gray-900">{session?.user?.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date().toLocaleDateString()} {/* 这里应该使用实际的注册日期 */}
                  </p>
                </div>
              </div>
            </div>

            {/* Update Form */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Email & Password</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {error && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleUpdateAccount} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={form.currentPassword}
                      onChange={e => setForm({ ...form, currentPassword: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={form.newPassword}
                      onChange={e => setForm({ ...form, newPassword: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={form.confirmPassword}
                      onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Update Account
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <p className="mt-1 text-sm text-gray-900">{session?.user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <p className="mt-1 text-sm text-gray-900">••••••••</p>
                  </div>
                </div>
              )}
            </div>

            {/* Delete Account */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Delete Account</h2>
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              {isDeleting ? (
                <div className="space-y-4">
                  <p className="text-sm text-red-600">
                    Are you sure you want to delete your account? This action cannot be undone.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Yes, delete my account
                    </button>
                    <button
                      onClick={() => setIsDeleting(false)}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsDeleting(true)}
                  className="text-red-600 hover:text-red-500 font-medium"
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 