'use client'

import { useSession } from 'next-auth/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/constants/translations'
import Navbar from '@/components/Navbar'
import JobSearch from '@/components/JobSearch'
import Link from 'next/link'
import Image from 'next/image'
import { PLATFORMS } from '@/constants/platforms'
import LogoImage from '@/components/ui/LogoImage'

export default function Home() {
  const { data: session } = useSession()
  const { currentLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - 白色背景 */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {getTranslation(currentLanguage, 'hero.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {getTranslation(currentLanguage, 'hero.subtitle')}
          </p>
          <JobSearch />
        </div>
      </section>

      {/* Platform Integration - 灰色背景 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslation(currentLanguage, 'platform.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {getTranslation(currentLanguage, 'platform.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {PLATFORMS.map(platform => (
              <div key={platform.name} className="flex flex-col items-center">
                <LogoImage
                  src={platform.logo}
                  alt={platform.name}
                  size={80}
                />
                <span className="mt-4 text-gray-600">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Matching - 白色背景 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {getTranslation(currentLanguage, 'ai.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {getTranslation(currentLanguage, 'ai.feature1.title')}
                    </h3>
                    <p className="text-gray-600">
                      {getTranslation(currentLanguage, 'ai.feature1.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {getTranslation(currentLanguage, 'ai.feature2.title')}
                    </h3>
                    <p className="text-gray-600">
                      {getTranslation(currentLanguage, 'ai.feature2.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
                    <div>
                      <div className="font-medium">
                        {getTranslation(currentLanguage, 'ai.candidate.a.title')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getTranslation(currentLanguage, 'ai.candidate.a.position')}
                      </div>
                    </div>
                  </div>
                  <div className="text-green-600 font-semibold">
                    95% {getTranslation(currentLanguage, 'ai.match.rate')}
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full"></div>
                    <div>
                      <div className="font-medium">
                        {getTranslation(currentLanguage, 'ai.candidate.b.title')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getTranslation(currentLanguage, 'ai.candidate.b.position')}
                      </div>
                    </div>
                  </div>
                  <div className="text-blue-600 font-semibold">
                    85% {getTranslation(currentLanguage, 'ai.match.rate')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Translation Feature - 灰色背景 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslation(currentLanguage, 'translation.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {getTranslation(currentLanguage, 'translation.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {getTranslation(currentLanguage, 'translation.resume.title')}
              </h3>
              <p className="text-gray-600">
                {getTranslation(currentLanguage, 'translation.resume.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {getTranslation(currentLanguage, 'translation.message.title')}
              </h3>
              <p className="text-gray-600">
                {getTranslation(currentLanguage, 'translation.message.description')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {getTranslation(currentLanguage, 'translation.interview.title')}
              </h3>
              <p className="text-gray-600">
                {getTranslation(currentLanguage, 'translation.interview.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Saving - 白色背景 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="space-y-8">
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {getTranslation(currentLanguage, 'cost.title')}
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                          {getTranslation(currentLanguage, 'cost.saving.title')}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div className="w-2/3 bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {getTranslation(currentLanguage, 'cost.time.title')}
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                          {getTranslation(currentLanguage, 'cost.time.title')}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div className="w-1/2 bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {getTranslation(currentLanguage, 'cost.subtitle')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {getTranslation(currentLanguage, 'cost.saving.title')}
                    </h3>
                    <p className="text-gray-600">
                      {getTranslation(currentLanguage, 'cost.saving.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {getTranslation(currentLanguage, 'cost.time.title')}
                    </h3>
                    <p className="text-gray-600">
                      {getTranslation(currentLanguage, 'cost.time.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - 白色背景 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {getTranslation(currentLanguage, 'cta.title')}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors">
              {getTranslation(currentLanguage, 'cta.try')}
            </button>
            <button className="border-2 border-black text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
              {getTranslation(currentLanguage, 'cta.contact')}
            </button>
          </div>
        </div>
      </section>

      {/* 分隔区域 */}
      <div className="h-20 bg-white"></div>

      {/* Footer */}
      <footer className="bg-black w-full">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-8">
              {getTranslation(currentLanguage, 'footer.slogan')}
            </p>
            <div className="text-sm text-gray-500">
              <p>{getTranslation(currentLanguage, 'footer.contact')}</p>
              <p className="mt-4">© 2023 Glint. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
