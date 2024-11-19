'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import JobCard from '@/components/JobCard'
import Pagination from '@/components/Pagination'
import { generateMockJobs } from '@/utils/mockData'

export default function JobSearch() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword') || undefined
  const location = searchParams.get('location') || undefined
  const [currentPage, setCurrentPage] = useState(1)
  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    // 生成45个职位（3页，每页15个）
    const mockJobs = generateMockJobs(45, keyword, location)
    setJobs(mockJobs)
    setCurrentPage(1)
  }, [keyword, location])

  // 分页逻辑
  const jobsPerPage = 15
  const totalPages = Math.ceil(jobs.length / jobsPerPage)
  const currentJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        {/* Search Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {jobs.length} Jobs Found
            {keyword && ` for "${keyword}"`}
            {location && ` in ${location}`}
          </h1>
          <p className="mt-2 text-gray-600">
            Showing {(currentPage - 1) * jobsPerPage + 1} - {Math.min(currentPage * jobsPerPage, jobs.length)} of {jobs.length} results
          </p>
        </div>

        {/* Job List */}
        <div className="space-y-6 mb-8">
          {currentJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        <div className="py-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
} 