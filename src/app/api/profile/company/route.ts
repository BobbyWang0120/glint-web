import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'COMPANY') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const data = await req.json()

    const profile = await prisma.companyProfile.update({
      where: {
        accountId: session.user.id
      },
      data: {
        name: data.name,
        size: data.size,
        industry: data.industry,
        location: data.location,
        description: data.description,
        website: data.website,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Failed to update profile:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
} 