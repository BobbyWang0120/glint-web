'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import JobCard from '@/components/JobCard'

// 生成固定的假数据
const MOCK_APPLIED_JOBS = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Google',
    companyLogo: 'google.com',
    location: 'CA',
    salary: '$180,000 - $250,000',
    type: 'Full-time',
    postedAt: '2023-11-01',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Apple',
    companyLogo: 'apple.com',
    location: 'CA',
    salary: '$160,000 - $220,000',
    type: 'Full-time',
    postedAt: '2023-11-02',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Meta',
    companyLogo: 'meta.com',
    location: 'WA',
    salary: '$170,000 - $230,000',
    type: 'Full-time',
    postedAt: '2023-11-03',
  },
]

// 生成固定的企业发布的职位
const generateCompanyJobs = (companyName: string) => [
  {
    id: 1,
    title: 'Frontend Developer',
    company: companyName,
    companyLogo: '',
    location: 'NY',
    salary: '$120,000 - $180,000',
    type: 'Full-time',
    postedAt: '2023-11-01',
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: companyName,
    companyLogo: '',
    location: 'CA',
    salary: '$130,000 - $190,000',
    type: 'Full-time',
    postedAt: '2023-11-02',
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: companyName,
    companyLogo: '',
    location: 'TX',
    salary: '$140,000 - $200,000',
    type: 'Full-time',
    postedAt: '2023-11-03',
  },
]

export default function Dashboard() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push('/auth/login')
    return null
  }

  const isCompany = session.user.role === 'COMPANY'
  const jobs = isCompany ? generateCompanyJobs('Your Company Name') : MOCK_APPLIED_JOBS

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isCompany ? 'Posted Jobs' : 'Applied Jobs'}
          </h1>
          {isCompany && (
            <Link
              href="/jobs/post"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Post New Job
            </Link>
          )}
        </div>

        <div className="space-y-6">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
} 