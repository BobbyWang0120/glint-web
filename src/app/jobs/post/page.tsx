'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Select from '@/components/ui/Select'
import { US_STATES } from '@/constants/locations'

const JOB_TYPE_OPTIONS = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'INTERNSHIP', label: 'Internship' }
]

const LOCATION_OPTIONS = US_STATES.map(state => ({
  value: state.code,
  label: state.name,
}))

export default function PostJob() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState({
    type: '',
    location: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 这里是假的提交，什么也不做
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto pt-32 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center">
              {/* Company Logo Placeholder */}
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Job Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black px-4 py-3"
                />
              </div>

              <Select
                id="type"
                name="type"
                label="Job Type"
                value={formValues.type}
                options={JOB_TYPE_OPTIONS}
                onChange={(value) => setFormValues(prev => ({ ...prev, type: value }))}
                required
              />

              <Select
                id="location"
                name="location"
                label="Location"
                value={formValues.location}
                options={LOCATION_OPTIONS}
                onChange={(value) => setFormValues(prev => ({ ...prev, location: value }))}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary Min</label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="salaryMin"
                      className="pl-7 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black px-4 py-3"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary Max</label>
                  <div className="mt-1 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="salaryMax"
                      className="pl-7 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black px-4 py-3"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Job Description</label>
                <textarea
                  name="description"
                  rows={5}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <textarea
                  name="requirements"
                  rows={5}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black px-4 py-3"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 