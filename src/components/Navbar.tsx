'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/constants/translations'

export default function Navbar() {
  const { data: session } = useSession()
  const { currentLanguage } = useLanguage()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = (
    <>
      <Link href="/jobs/search" className="text-gray-600 hover:text-gray-900">
        {getTranslation(currentLanguage, 'nav.findJobs')}
      </Link>
      <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
        {getTranslation(currentLanguage, 'nav.dashboard')}
      </Link>
    </>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-semibold text-gray-900 mr-12">
              Glint
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Auth Buttons */}
            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <span>{session.user.email}</span>
                  <svg
                    className={`ml-2 h-5 w-5 transition-transform ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {getTranslation(currentLanguage, 'nav.profile')}
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {getTranslation(currentLanguage, 'nav.settings')}
                    </Link>
                    <button
                      onClick={() => signOut({ redirect: false })}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      {getTranslation(currentLanguage, 'nav.signOut')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  {getTranslation(currentLanguage, 'nav.signIn')}
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  {getTranslation(currentLanguage, 'nav.signUp')}
                </Link>
              </div>
            )}
            
            {/* Language Switcher */}
            <div className="ml-6 border-l border-gray-200 pl-6">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Right Section */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Language Switcher for Mobile */}
            <LanguageSwitcher />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-3 py-2">
              {navLinks}
            </div>
            
            {/* Auth Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {session ? (
                <div className="flex flex-col space-y-3">
                  <div className="text-gray-600">{session.user.email}</div>
                  <Link
                    href="/profile"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {getTranslation(currentLanguage, 'nav.profile')}
                  </Link>
                  <Link
                    href="/settings"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {getTranslation(currentLanguage, 'nav.settings')}
                  </Link>
                  <button
                    onClick={() => signOut({ redirect: false })}
                    className="text-red-600 hover:text-red-700 text-left"
                  >
                    {getTranslation(currentLanguage, 'nav.signOut')}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/auth/login"
                    className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    {getTranslation(currentLanguage, 'nav.signIn')}
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block w-full text-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    {getTranslation(currentLanguage, 'nav.signUp')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 