'use client'

import { useState, useRef, useEffect } from 'react'
import { LANGUAGES } from '@/constants/languages'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguageInfo = LANGUAGES.find(lang => lang.code === currentLanguage)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span className="text-xl">{currentLanguageInfo?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
          {LANGUAGES.map(language => (
            <button
              key={language.code}
              onClick={() => {
                setLanguage(language.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-3 ${
                currentLanguage === language.code ? 'bg-gray-50' : ''
              }`}
            >
              <span className="text-xl">{language.flag}</span>
              <span className="text-gray-700">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 