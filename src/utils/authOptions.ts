import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import GoogleProvider from 'next-auth/providers/google'

// Instanciando o Prisma Client
const prisma = new PrismaClient()

// Definindo as opções de configuração do NextAuth com tipos apropriados
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`
      }
      return url
    },
    async jwt({ token, user, account }) {
      if (account) {
        const userInfo = await prisma.user.findUnique({
          where: { email: user?.email ?? '' },
          select: {
            id: true,
            userType: {
              select: {
                slug: true,
              },
            },
          },
        })

        token.accessToken = account.access_token
        token.user_id = userInfo?.id
        token.role = userInfo?.userType?.slug
      }
      return token
    },
    async session({ session, token }) {
      if (token.user_id) {
        session.user = {
          ...session.user,
          id: token.user_id,
          role: token.role,
        }
      }
      return session
    },
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        let existingUser = await prisma.user.findUnique({
          where: {
            email: user?.email ?? '',
          },
        })

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email: user?.email ?? '',
              name: user?.name ?? '',
              image: user?.image ?? '',
            },
          })

          await prisma.account.create({
            data: {
              provider: account.provider,
              type: account.type,
              providerAccountId: account.providerAccountId,
              accessToken: account.access_token,
              userId: existingUser.id,
            },
          })
        }
      }
      return true
    },
  },
}
