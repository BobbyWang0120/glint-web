import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    role: "ADMIN" | "COMPANY" | "JOBSEEKER"
  }

  interface Session {
    user: User & {
      id: string
      role: "ADMIN" | "COMPANY" | "JOBSEEKER"
    }
  }
} 