'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/constants/translations'

export default function JobSearch() {
  const router = useRouter()
  const { currentLanguage } = useLanguage()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const keyword = formData.get('keyword')
    const location = formData.get('location')
    
    router.push(`/jobs/search?keyword=${keyword || ''}&location=${location || ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 border-r border-gray-200">
          <input
            type="text"
            name="keyword"
            placeholder={getTranslation(currentLanguage, 'search.placeholder.keyword')}
            className="w-full px-6 py-4 text-lg focus:outline-none"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            name="location"
            placeholder={getTranslation(currentLanguage, 'search.placeholder.location')}
            className="w-full px-6 py-4 text-lg focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors"
        >
          {getTranslation(currentLanguage, 'search.button')}
        </button>
      </div>
    </form>
  )
} 