import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import LinkedInProvider from 'next-auth/providers/linkedin'

const prisma = new PrismaClient()

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
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      issuer: 'https://www.linkedin.com/oauth',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      profile(profile) {
        const defaultImage =
          'https://cdn-icons-png.flaticon.com/512/174/174857.png'

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? defaultImage,
        }
      },
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
      if (account && user) {
        const userInfo = await prisma.user.findUnique({
          where: { email: user.email ?? '' },
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
      } else {
        const updatedUser = await prisma.user.findUnique({
          where: { id: token.user_id },
          select: {
            id: true,
            userType: {
              select: {
                slug: true,
              },
            },
          },
        })

        if (updatedUser) {
          token.user_id = updatedUser.id
          token.role = updatedUser.userType?.slug
        }
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

      return true
    },
  },
}
