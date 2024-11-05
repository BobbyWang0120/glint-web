import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { hash, compare } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { email, currentPassword, newPassword } = await req.json()

    // 获取当前用户
    const account = await prisma.account.findUnique({
      where: { id: session.user.id }
    })

    if (!account) {
      return new NextResponse('Account not found', { status: 404 })
    }

    // 验证当前密码
    if (currentPassword) {
      const isValid = await compare(currentPassword, account.password)
      if (!isValid) {
        return new NextResponse('Invalid current password', { status: 400 })
      }
    }

    // 更新账号信息
    await prisma.account.update({
      where: { id: session.user.id },
      data: {
        email: email,
        ...(newPassword ? { password: await hash(newPassword, 10) } : {})
      }
    })

    return new NextResponse('Account updated successfully', { status: 200 })
  } catch (error) {
    console.error('Failed to update account:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
} 