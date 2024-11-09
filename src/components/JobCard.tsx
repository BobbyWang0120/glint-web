'use client'

import Link from 'next/link'
import LogoImage from '@/components/ui/LogoImage'

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    companyLogo: string
    location: string
    salary: string
    type: string
    postedAt: string
  }
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link 
      href={`/jobs/${job.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-start">
          <LogoImage
            src={`https://logo.clearbit.com/${job.companyLogo}`}
            alt={job.company}
            size={48}
          />
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.company}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {job.type}
              </span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="mr-1.5 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {job.location}
              <span className="mx-2">•</span>
              {job.salary}
              <span className="mx-2">•</span>
              Posted {new Date(job.postedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
} 