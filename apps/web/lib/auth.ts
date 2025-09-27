import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [
        GitHubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        })
      ] : []),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
