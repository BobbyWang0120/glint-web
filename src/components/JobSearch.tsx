'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function JobSearch() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/jobs/search?keyword=${keyword}&location=${location}`)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex shadow-lg rounded-lg overflow-hidden">
          <div className="flex-1 border-r border-gray-200">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, keywords, or company"
              className="w-full px-6 py-4 text-lg focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or remote"
              className="w-full px-6 py-4 text-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
} 