import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // 根据用户角色获取不同的 profile
    if (session.user.role === 'JOBSEEKER') {
      const profile = await prisma.jobSeekerProfile.findUnique({
        where: {
          accountId: session.user.id
        }
      })
      return NextResponse.json(profile)
    } else if (session.user.role === 'COMPANY') {
      const profile = await prisma.companyProfile.findUnique({
        where: {
          accountId: session.user.id
        }
      })
      return NextResponse.json(profile)
    }

    return new NextResponse('Invalid user role', { status: 400 })
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
} 