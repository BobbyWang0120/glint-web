import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { CompanySize } from '@/types/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      email, 
      password, 
      role, 
      companyName, 
      size, 
      industry, 
      location,
      firstName,
      lastName
    } = body

    // 检查邮箱是否已存在
    const existingAccount = await prisma.account.findUnique({
      where: { email },
    })

    if (existingAccount) {
      return new NextResponse('Email already registered', { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

    // 创建账号
    const account = await prisma.account.create({
      data: {
        email,
        password: hashedPassword,
        role,
        status: 'ACTIVE',
      },
    })

    // 根据角色创建相应的档案
    if (role === 'COMPANY') {
      await prisma.companyProfile.create({
        data: {
          name: companyName,
          size: size as CompanySize,
          industry,
          location,
          description: '',
          contactEmail: email,
          accountId: account.id,
        },
      })
    } else {
      await prisma.jobSeekerProfile.create({
        data: {
          firstName,
          lastName,
          industry,
          accountId: account.id,
        },
      })
    }

    return new NextResponse('Registration successful', { status: 200 })
  } catch (error) {
    console.error('Registration failed:', error)
    return new NextResponse('Registration failed', { status: 500 })
  }
} 