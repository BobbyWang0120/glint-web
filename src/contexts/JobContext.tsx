'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Job {
  id: number
  title: string
  company: string
  location: string
  type: string
  salary: string
  postedAt: string
}

interface JobContextType {
  selectedJob: Job | null
  setSelectedJob: (job: Job | null) => void
}

const JobContext = createContext<JobContextType | undefined>(undefined)

export function JobProvider({ children }: { children: ReactNode }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  // 初始化时从 localStorage 读取数据
  useEffect(() => {
    const savedJob = localStorage.getItem('selectedJob')
    if (savedJob) {
      setSelectedJob(JSON.parse(savedJob))
    }
  }, [])

  // 当 selectedJob 改变时保存到 localStorage
  const handleSetSelectedJob = (job: Job | null) => {
    setSelectedJob(job)
    if (job) {
      localStorage.setItem('selectedJob', JSON.stringify(job))
    } else {
      localStorage.removeItem('selectedJob')
    }
  }

  return (
    <JobContext.Provider value={{ selectedJob, setSelectedJob: handleSetSelectedJob }}>
      {children}
    </JobContext.Provider>
  )
}

export function useJob() {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error('useJob must be used within a JobProvider')
  }
  return context
} 