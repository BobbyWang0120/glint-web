'use client'

import { useState } from 'react'
import { US_STATES } from '@/constants/locations'
import Select from '@/components/ui/Select'
import FileUpload from '@/components/ui/FileUpload'

const EDUCATION_LEVELS = [
  { value: 'HIGH_SCHOOL', label: 'High School' },
  { value: 'ASSOCIATE', label: 'Associate Degree' },
  { value: 'BACHELOR', label: "Bachelor's Degree" },
  { value: 'MASTER', label: "Master's Degree" },
  { value: 'PHD', label: 'Ph.D.' },
  { value: 'OTHER', label: 'Other' }
]

const JOB_SEEKER_STATUS = [
  { value: 'ACTIVELY_LOOKING', label: 'Actively Looking' },
  { value: 'EMPLOYED_LOOKING', label: 'Employed but Open' },
  { value: 'NOT_LOOKING', label: 'Not Looking' }
]

const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' }
]

const LOCATION_OPTIONS = US_STATES.map(state => ({
  value: state.code,
  label: state.name,
}))

export default function JobSeekerProfileForm({ profile }: { profile: any }) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  // 在组件内部添加状态来管理表单值
  const [formValues, setFormValues] = useState({
    gender: profile?.gender || '',
    educationLevel: profile?.educationLevel || '',
    currentLocation: profile?.currentLocation || '',
    jobStatus: profile?.jobStatus || '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const data = {
      // 基本信息（只读）
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      industry: formData.get('industry'),
      
      // 可编辑的个人信息
      gender: formData.get('gender'),
      birthYear: parseInt(formData.get('birthYear') as string),
      educationLevel: formData.get('educationLevel'),
      yearsOfExp: parseInt(formData.get('yearsOfExp') as string),
      currentLocation: formData.get('currentLocation'),
      phone: formData.get('phone'),
      bio: formData.get('bio'),

      // 求职意向（可编辑）
      desiredPosition: formData.get('desiredPosition'),
      desiredLocation: formData.getAll('desiredLocation'),
      salaryMin: parseInt(formData.get('salaryMin') as string),
      salaryMax: parseInt(formData.get('salaryMax') as string),
      jobStatus: formData.get('jobStatus'),
    }

    try {
      const res = await fetch('/api/profile/jobseeker', {
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

      {/* Basic Information (Read-only) */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              defaultValue={profile?.firstName}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={profile?.lastName}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Industry</label>
            <input
              type="text"
              name="industry"
              defaultValue={profile?.industry}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-black focus:ring-black ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            id="gender"
            name="gender"
            label="Gender"
            value={formValues.gender}
            options={GENDER_OPTIONS}
            disabled={!isEditing}
            onChange={(value) => setFormValues(prev => ({ ...prev, gender: value }))}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Year</label>
            <input
              type="number"
              name="birthYear"
              defaultValue={profile?.birthYear}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <Select
            id="educationLevel"
            name="educationLevel"
            label="Education Level"
            value={formValues.educationLevel}
            options={EDUCATION_LEVELS}
            disabled={!isEditing}
            onChange={(value) => setFormValues(prev => ({ ...prev, educationLevel: value }))}
            className="!mb-0"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="number"
              name="yearsOfExp"
              defaultValue={profile?.yearsOfExp}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <Select
            id="currentLocation"
            name="currentLocation"
            label="Current Location"
            value={formValues.currentLocation}
            options={LOCATION_OPTIONS}
            disabled={!isEditing}
            onChange={(value) => setFormValues(prev => ({ ...prev, currentLocation: value }))}
            className="!mb-0"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              defaultValue={profile?.phone}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              rows={4}
              defaultValue={profile?.bio}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Job Preferences */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Desired Position</label>
            <input
              type="text"
              name="desiredPosition"
              defaultValue={profile?.desiredPosition}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <Select
            id="jobStatus"
            name="jobStatus"
            label="Job Status"
            value={formValues.jobStatus}
            options={JOB_SEEKER_STATUS}
            disabled={!isEditing}
            onChange={(value) => setFormValues(prev => ({ ...prev, jobStatus: value }))}
            className="!mb-0"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Salary</label>
            <input
              type="number"
              name="salaryMin"
              defaultValue={profile?.salaryMin}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maximum Salary</label>
            <input
              type="number"
              name="salaryMax"
              defaultValue={profile?.salaryMax}
              disabled={!isEditing}
              className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 ${
                !isEditing && 'bg-gray-100'
              }`}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Desired Locations</label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {US_STATES.map(state => (
                <div key={state.code} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`location-${state.code}`}
                    name="desiredLocation"
                    value={state.code}
                    defaultChecked={profile?.desiredLocation?.includes(state.code)}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`location-${state.code}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {state.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume</h2>
        <FileUpload
          onFileChange={setResumeFile}
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