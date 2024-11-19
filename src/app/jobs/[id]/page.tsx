'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import CompanyJobDetail from './company/page'
import JobSeekerJobDetail from './jobseeker/page'
import Loading from '@/components/ui/Loading'

export default function JobDetail() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <Loading fullScreen text="验证身份..." />
  }

  if (!session) {
    router.push('/auth/login')
    return null
  }

  if (session.user.role === 'COMPANY') {
    return <CompanyJobDetail />
  }

  return <JobSeekerJobDetail />
} 