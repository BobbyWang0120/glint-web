'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

// 模拟职位详情数据
const MOCK_JOB = {
  id: 1,
  title: 'Senior Software Engineer',
  company: 'Apple',
  companyLogo: 'apple.com',
  location: 'Cupertino, CA',
  salary: '$150,000 - $200,000',
  type: 'Full-time',
  description: `We are looking for a Senior Software Engineer to join our team...

  About the role:
  - Lead development of complex features
  - Mentor junior developers
  - Collaborate with product and design teams
  
  What you'll do:
  - Design and implement scalable solutions
  - Code review and technical documentation
  - Participate in architectural decisions`,
  requirements: `- 5+ years of experience in web development
  - Strong knowledge of JavaScript/TypeScript
  - Experience with React and Node.js
  - Bachelor's degree in Computer Science or related field
  - Excellent problem-solving skills`,
  benefits: `- Competitive salary and equity
  - Health, dental, and vision insurance
  - 401(k) with company match
  - Flexible work arrangements
  - Professional development budget`,
  postedAt: '2023-11-01',
}

export default function JobSeekerJobDetail() {
  const params = useParams()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto pt-32 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* 职位头部信息 */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src={`https://logo.clearbit.com/${MOCK_JOB.companyLogo}`}
                  alt={MOCK_JOB.company}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {MOCK_JOB.title}
                </h1>
                <div className="mt-2">
                  <span className="text-gray-600">{MOCK_JOB.company}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-600">{MOCK_JOB.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 职位详情 */}
          <div className="px-8 py-6 space-y-6">
            {/* 基本信息 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">薪资范围</h3>
                <p className="mt-1 text-base text-gray-900">{MOCK_JOB.salary}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">工作类型</h3>
                <p className="mt-1 text-base text-gray-900">{MOCK_JOB.type}</p>
              </div>
            </div>

            {/* 职位描述 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">职位描述</h2>
              <div className="mt-2 prose prose-sm text-gray-500">
                <pre className="whitespace-pre-wrap font-sans">
                  {MOCK_JOB.description}
                </pre>
              </div>
            </div>

            {/* 任职要求 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">任职要求</h2>
              <div className="mt-2 prose prose-sm text-gray-500">
                <pre className="whitespace-pre-wrap font-sans">
                  {MOCK_JOB.requirements}
                </pre>
              </div>
            </div>

            {/* 福利待遇 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">福利待遇</h2>
              <div className="mt-2 prose prose-sm text-gray-500">
                <pre className="whitespace-pre-wrap font-sans">
                  {MOCK_JOB.benefits}
                </pre>
              </div>
            </div>

            {/* 申请按钮 */}
            <div className="mt-8">
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                申请职位
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 