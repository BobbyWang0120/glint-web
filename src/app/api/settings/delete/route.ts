import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // 删除账号（由于设置了级联删除，相关的 profile 和其他数据也会被删除）
    await prisma.account.delete({
      where: { id: session.user.id }
    })

    return new NextResponse('Account deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Failed to delete account:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
} 