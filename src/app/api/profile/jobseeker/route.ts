import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'JOBSEEKER') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await req.json()

    const profile = await prisma.jobSeekerProfile.update({
      where: {
        accountId: session.user.id
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        industry: data.industry,
        gender: data.gender,
        birthYear: data.birthYear,
        educationLevel: data.educationLevel,
        yearsOfExp: data.yearsOfExp,
        currentLocation: data.currentLocation,
        phone: data.phone,
        bio: data.bio,
        desiredPosition: data.desiredPosition,
        desiredLocation: data.desiredLocation,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        jobStatus: data.jobStatus,
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Failed to update profile:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
} 