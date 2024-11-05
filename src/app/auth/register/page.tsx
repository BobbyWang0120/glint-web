'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import type { CompanySize } from '@/types/prisma'
import { US_STATES } from '@/constants/locations'

type UserRole = 'COMPANY' | 'JOBSEEKER'

const INDUSTRY_OPTIONS = [
  'Technology/IT',
  'Finance/Investment',
  'Healthcare/Medical',
  'Education/Training',
  'Retail/E-commerce',
  'Manufacturing',
  'Real Estate/Construction',
  'Media/Entertainment',
  'Others'
]

const COMPANY_SIZE_OPTIONS: CompanySize[] = [
  'LESS_THAN_50',
  'FROM_50_TO_200',
  'FROM_200_TO_1000',
  'FROM_1000_TO_5000',
  'MORE_THAN_5000'
]

const COMPANY_SIZE_LABELS: Record<CompanySize, string> = {
  'LESS_THAN_50': 'Less than 50',
  'FROM_50_TO_200': '50-200',
  'FROM_200_TO_1000': '200-1,000',
  'FROM_1000_TO_5000': '1,000-5,000',
  'MORE_THAN_5000': 'More than 5,000'
}

export default function Register() {
  const router = useRouter()
  const [role, setRole] = useState<UserRole>('JOBSEEKER')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      role: role,
      ...(role === 'COMPANY' 
        ? {
            companyName: formData.get('companyName'),
            size: formData.get('size'),
            industry: formData.get('industry'),
            location: formData.get('location'),
          }
        : {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            industry: formData.get('industry'),
          }
      )
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.text()
        throw new Error(error)
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Login failed')
        return
      }

      router.push('/')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              role === 'JOBSEEKER' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setRole('JOBSEEKER')}
          >
            Job Seeker
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${
              role === 'COMPANY' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setRole('COMPANY')}
          >
            Company
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {role === 'COMPANY' ? (
              <>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                    Company Size
                  </label>
                  <select
                    id="size"
                    name="size"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select company size</option>
                    {COMPANY_SIZE_OPTIONS.map(size => (
                      <option key={size} value={size}>
                        {COMPANY_SIZE_LABELS[size]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select industry</option>
                    {INDUSTRY_OPTIONS.map(industry => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select state</option>
                    {US_STATES.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Preferred Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select industry</option>
                    {INDUSTRY_OPTIONS.map(industry => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
} 