'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import CandidateList from '@/components/job/CandidateList'
import CandidateDetail from '@/components/job/CandidateDetail'
import ChatPanel from '@/components/job/ChatPanel'
import Loading from '@/components/ui/Loading'

// 模拟候选人数据
const MOCK_CANDIDATES = [
  {
    id: 1,
    name: 'John Smith',
    title: 'Senior Frontend Engineer',
    experience: '5 years',
    education: "Bachelor's Degree",
    location: 'San Francisco',
    status: 'PENDING',
    appliedAt: '2024-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    resumeUrl: '#',
  },
  {
    id: 2,
    name: 'Emily Johnson',
    title: 'Frontend Developer',
    experience: '3 years',
    education: "Master's Degree",
    location: 'New York',
    status: 'INTERVIEWING',
    appliedAt: '2024-01-14',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    resumeUrl: '#',
  },
]

export default function CompanyJobDetail() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState<any>(null)
  const [selectedCandidate, setSelectedCandidate] = useState(MOCK_CANDIDATES[0])

  useEffect(() => {
    const jobData = {
      id: params.id,
      title: searchParams.get('title'),
      company: searchParams.get('company'),
      location: searchParams.get('location'),
      type: searchParams.get('type'),
      salary: searchParams.get('salary'),
      postedAt: searchParams.get('postedAt'),
    }

    if (!jobData.title) {
      router.push('/dashboard')
      return
    }

    setJob(jobData)
    setLoading(false)
  }, [params.id, searchParams, router])

  if (loading || !job) {
    return <Loading fullScreen text="Loading candidates..." />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* 调整最大宽度为 1600px */}
      <div className="max-w-[1600px] mx-auto pt-32 px-4 sm:px-6 lg:px-8">
        {/* 顶部标题区域 */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="mr-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>
            <div className="text-sm text-gray-500 flex items-center">
              <span>{job.company}</span>
              <span className="mx-2">•</span>
              <span>{job.location}</span>
              <span className="mx-2">•</span>
              <span>{job.type}</span>
              <span className="mx-2">•</span>
              <span>{job.salary}</span>
              <span className="mx-2">•</span>
              <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* 三栏布局主体 - 调整列宽比例 */}
        <div className="flex gap-6 h-[calc(100vh-240px)]">
          {/* 左侧候选人列表 - 稍微减小宽度 */}
          <div className="w-[22%] bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Candidates</h2>
              <p className="text-sm text-gray-500 mt-1">
                {MOCK_CANDIDATES.length} applications
              </p>
            </div>
            <div className="overflow-y-auto h-[calc(100%-73px)]">
              <CandidateList
                candidates={MOCK_CANDIDATES}
                selectedId={selectedCandidate?.id}
                onSelect={setSelectedCandidate}
              />
            </div>
          </div>

          {/* 中间候选人详情 - 增加宽度 */}
          <div className="w-[45%] bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Candidate Details</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-73px)]">
              <CandidateDetail candidate={selectedCandidate} />
            </div>
          </div>

          {/* 右侧聊天面板 - 稍微减小宽度 */}
          <div className="w-[30%] bg-white rounded-lg shadow-sm overflow-hidden">
            <ChatPanel candidate={selectedCandidate} />
          </div>
        </div>
      </div>
    </div>
  )
} 