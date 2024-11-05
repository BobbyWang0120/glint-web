import { prisma } from '@/lib/prisma'
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const account = await prisma.account.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!account || !account.password) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, account.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: account.id,
          email: account.email,
          role: account.role,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as "ADMIN" | "COMPANY" | "JOBSEEKER"
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }