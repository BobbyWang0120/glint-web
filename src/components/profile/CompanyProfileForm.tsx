'use client'

import { useState } from 'react'
import { US_STATES } from '@/constants/locations'
import Select from '@/components/ui/Select'
import FileUpload from '@/components/ui/FileUpload'
import type { CompanySize } from '@/types/prisma'

const COMPANY_SIZE_OPTIONS = [
  { value: 'LESS_THAN_50', label: 'Less than 50' },
  { value: 'FROM_50_TO_200', label: '50-200' },
  { value: 'FROM_200_TO_1000', label: '200-1,000' },
  { value: 'FROM_1000_TO_5000', label: '1,000-5,000' },
  { value: 'MORE_THAN_5000', label: 'More than 5,000' }
]

const INDUSTRY_OPTIONS = [
  { value: 'Technology/IT', label: 'Technology/IT' },
  { value: 'Finance/Investment', label: 'Finance/Investment' },
  { value: 'Healthcare/Medical', label: 'Healthcare/Medical' },
  { value: 'Education/Training', label: 'Education/Training' },
  { value: 'Retail/E-commerce', label: 'Retail/E-commerce' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Real Estate/Construction', label: 'Real Estate/Construction' },
  { value: 'Media/Entertainment', label: 'Media/Entertainment' },
  { value: 'Others', label: 'Others' }
]

const LOCATION_OPTIONS = US_STATES.map(state => ({
  value: state.code,
  label: state.name,
}))

export default function CompanyProfileForm({ profile }: { profile: any }) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  // 表单状态管理
  const [formValues, setFormValues] = useState({
    size: profile?.size || '',
    industry: profile?.industry || '',
    location: profile?.location || '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const data = {
      // 基本信息
      name: formData.get('name'),
      size: formData.get('size'),
      industry: formData.get('industry'),
      location: formData.get('location'),
      
      // 详细信息
      description: formData.get('description'),
      website: formData.get('website'),
      
      // 联系信息
      contactName: formData.get('contactName'),
      contactEmail: formData.get('contactEmail'),
      contactPhone: formData.get('contactPhone'),
    }

    try {
      const res = await fetch('/api/profile/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error(await res.text())
      setSuccess('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              name="name"
              defaultValue={profile?.name}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <Select
            id="size"
            name="size"
            label="Company Size"
            value={formValues.size}
            options={COMPANY_SIZE_OPTIONS}
            disabled={!isEditing}
            onChange={(value) => setFormValues(prev => ({ ...prev, size: value }))}
          />
          <Select
            id="industry"
            name="industry"
            label="Industry"
            value={formValues.industry}
            options={INDUSTRY_OPTIONS}
            disabled={!isEditing}
            onChange={(value) => setFormValues(prev => ({ ...prev, industry: value }))}
          />
          <Select
            id="location"
            name="location"
            label="Location"
            value={formValues.location}
            options={LOCATION_OPTIONS}
            disabled={!isEditing}
            onChange={(value) => setFormValues(prev => ({ ...prev, location: value }))}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              name="website"
              defaultValue={profile?.website}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Company Description</label>
            <textarea
              name="description"
              rows={4}
              defaultValue={profile?.description}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Name</label>
            <input
              type="text"
              name="contactName"
              defaultValue={profile?.contactName}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              defaultValue={profile?.contactEmail}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
            <input
              type="tel"
              name="contactPhone"
              defaultValue={profile?.contactPhone}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Company Logo */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Logo</h2>
        <FileUpload
          onFileChange={setLogoFile}
          disabled={!isEditing}
        />
      </div>

      {/* System Information */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Created At</label>
            <div className="mt-1 text-gray-900">
              {new Date(profile?.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Active</label>
            <div className="mt-1 text-gray-900">
              {new Date(profile?.lastActiveAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      )}
    </form>
  )
} 