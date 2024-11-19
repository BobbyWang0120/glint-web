'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useJob } from '@/contexts/JobContext'
import Navbar from '@/components/Navbar'
import CandidateList from '@/components/job/CandidateList'
import CandidateDetail from '@/components/job/CandidateDetail'
import ChatPanel from '@/components/job/ChatPanel'
import Loading from '@/components/ui/Loading'

// 更新模拟候选人数据，添加 aiScore
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
    aiScore: 95, // 添加 AI 评分
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
    aiScore: 88,
  },
  {
    id: 3,
    name: 'Michael Chen',
    title: 'Senior Full Stack Developer',
    experience: '7 years',
    education: "Master's Degree",
    location: 'Seattle',
    status: 'PENDING',
    appliedAt: '2024-01-13',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    resumeUrl: '#',
    aiScore: 92,
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    title: 'Frontend Engineer',
    experience: '4 years',
    education: "Bachelor's Degree",
    location: 'Austin',
    status: 'INTERVIEWING',
    appliedAt: '2024-01-12',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    resumeUrl: '#',
    aiScore: 85,
  },
  {
    id: 5,
    name: 'David Brown',
    title: 'Senior UI Developer',
    experience: '6 years',
    education: "Bachelor's Degree",
    location: 'Boston',
    status: 'PENDING',
    appliedAt: '2024-01-11',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    resumeUrl: '#',
    aiScore: 90,
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    title: 'Frontend Architect',
    experience: '8 years',
    education: "Master's Degree",
    location: 'Chicago',
    status: 'INTERVIEWING',
    appliedAt: '2024-01-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
    resumeUrl: '#',
    aiScore: 94,
  },
]

// 更新排序类型
type SortOption = 'dateDesc' | 'dateAsc' | 'scoreDesc' | 'scoreAsc'

export default function CompanyJobDetail() {
  const params = useParams()
  const router = useRouter()
  const { selectedJob, setSelectedJob } = useJob()
  const [loading, setLoading] = useState(true)
  const [selectedCandidate, setSelectedCandidate] = useState(MOCK_CANDIDATES[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('dateDesc')
  const [showSortMenu, setShowSortMenu] = useState(false)

  // 更新排序逻辑
  const filteredAndSortedCandidates = useMemo(() => {
    let result = [...MOCK_CANDIDATES]
    
    if (searchTerm) {
      result = result.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    result.sort((a, b) => {
      switch (sortBy) {
        case 'dateDesc':
          return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
        case 'dateAsc':
          return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime()
        case 'scoreDesc':
          return b.aiScore - a.aiScore
        case 'scoreAsc':
          return a.aiScore - b.aiScore
        default:
          return 0
      }
    })
    
    return result
  }, [searchTerm, sortBy])

  // 获取当前排序方式的显示文本
  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'dateDesc': return 'Latest Applied'
      case 'dateAsc': return 'Earliest Applied'
      case 'scoreDesc': return 'Highest Score'
      case 'scoreAsc': return 'Lowest Score'
    }
  }

  useEffect(() => {
    const initializeJob = async () => {
      // 如果没有 selectedJob，尝试从 localStorage 获取
      if (!selectedJob) {
        const savedJob = localStorage.getItem('selectedJob')
        if (savedJob) {
          const parsedJob = JSON.parse(savedJob)
          // 确保当前页面的 ID 与保存的职位 ID 匹配
          if (parsedJob.id.toString() === params.id) {
            setSelectedJob(parsedJob)
            setLoading(false)
            return
          }
        }
        // 如果没有匹配的职位信息，重定向到 dashboard
        router.push('/dashboard')
        return
      }
      
      // 确保当前页面的 ID 与选中的职位 ID 匹配
      if (selectedJob.id.toString() !== params.id) {
        router.push('/dashboard')
        return
      }

      setLoading(false)
    }

    initializeJob()
  }, [selectedJob, setSelectedJob, params.id, router])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showSortMenu && !(event.target as Element).closest('.sort-button')) {
        setShowSortMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSortMenu])

  if (loading) {
    return <Loading fullScreen text="Loading candidates..." />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
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
              {selectedJob.title}
            </h1>
            <div className="text-sm text-gray-500 flex items-center">
              <span>{selectedJob.company}</span>
              <span className="mx-2">•</span>
              <span>{selectedJob.location}</span>
              <span className="mx-2">•</span>
              <span>{selectedJob.type}</span>
              <span className="mx-2">•</span>
              <span>{selectedJob.salary}</span>
              <span className="mx-2">•</span>
              <span>Posted {new Date(selectedJob.postedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* 三栏布局主体 - 调整阴影和分割线 */}
        <div className="flex gap-6 h-[calc(100vh-240px)]">
          {/* 左侧候选人列表 */}
          <div className="w-[22%] bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Candidates</h2>
                <p className="text-sm text-gray-500">
                  ({filteredAndSortedCandidates.length})
                </p>
              </div>
            </div>
            
            {/* 搜索和排序移到分割线下方，并排放置 */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="relative w-[75%]">
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                  />
                  <svg
                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div className="relative w-[25%]">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-1 focus:ring-black focus:border-black flex items-center justify-center"
                  >
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>
                  </button>

                  {/* 排序下拉菜单 */}
                  {showSortMenu && (
                    <div className="absolute right-0 mt-1 w-48 rounded-lg bg-white shadow-lg border border-gray-200 py-1 z-10">
                      {(['dateDesc', 'dateAsc', 'scoreDesc', 'scoreAsc'] as SortOption[]).map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option)
                            setShowSortMenu(false)
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                            sortBy === option ? 'text-black font-medium' : 'text-gray-600'
                          }`}
                        >
                          {getSortLabel(option)}
                          {sortBy === option && (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 调整列表区域的高度 */}
            <div className="overflow-y-auto h-[calc(100%-140px)]">
              <CandidateList
                candidates={filteredAndSortedCandidates}
                selectedId={selectedCandidate?.id}
                onSelect={setSelectedCandidate}
              />
            </div>
          </div>

          {/* 中间候选人详情 */}
          <div className="w-[45%] bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 h-[60px] flex items-center">
              <h2 className="text-lg font-medium text-gray-900">Candidate Details</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              <CandidateDetail candidate={selectedCandidate} />
            </div>
          </div>

          {/* 右侧聊天面板 */}
          <div className="w-[30%] bg-white rounded-lg shadow-md overflow-hidden">
            <ChatPanel candidate={selectedCandidate} />
          </div>
        </div>
      </div>
    </div>
  )
} 