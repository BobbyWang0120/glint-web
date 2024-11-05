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

export default function JobDetail() {
  const params = useParams()
  const [hasApplied, setHasApplied] = useState(false)

  const handleApply = () => {
    setHasApplied(!hasApplied)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start">
            <Image
              src={`https://logo.clearbit.com/${MOCK_JOB.companyLogo}`}
              alt={`${MOCK_JOB.company} logo`}
              width={64}
              height={64}
              className="rounded-lg"
            />
            <div className="ml-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {MOCK_JOB.title}
                  </h1>
                  <p className="text-lg text-gray-600">{MOCK_JOB.company}</p>
                </div>
                <button
                  onClick={handleApply}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                    hasApplied
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {hasApplied ? 'Withdraw Application' : 'Apply Now'}
                </button>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <span className="inline-flex items-center">
                  <svg className="mr-1.5 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {MOCK_JOB.location}
                </span>
                <span className="mx-2">•</span>
                <span>{MOCK_JOB.type}</span>
                <span className="mx-2">•</span>
                <span>{MOCK_JOB.salary}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <div className="prose max-w-none">
              {MOCK_JOB.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {MOCK_JOB.requirements.split('\n').map((req, index) => (
                <li key={index}>{req.replace('- ', '')}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {MOCK_JOB.benefits.split('\n').map((benefit, index) => (
                <li key={index}>{benefit.replace('- ', '')}</li>
              ))}
            </ul>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Posted on {new Date(MOCK_JOB.postedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 