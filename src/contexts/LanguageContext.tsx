'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { LanguageCode } from '@/constants/languages'

interface LanguageContextType {
  currentLanguage: LanguageCode
  setLanguage: (language: LanguageCode) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en')

  useEffect(() => {
    // 从 localStorage 读取语言设置
    const savedLanguage = localStorage.getItem('language') as LanguageCode
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    } else {
      // 如果没有保存的语言设置，尝试使用浏览器语言
      const browserLanguage = navigator.language
      const supportedLanguage = browserLanguage.startsWith('zh') 
        ? browserLanguage === 'zh-TW' ? 'zh-TW' : 'zh-CN'
        : browserLanguage.startsWith('es') ? 'es'
        : browserLanguage.startsWith('ja') ? 'ja'
        : 'en'
      setCurrentLanguage(supportedLanguage as LanguageCode)
    }
  }, [])

  const setLanguage = (language: LanguageCode) => {
    setCurrentLanguage(language)
    localStorage.setItem('language', language)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 