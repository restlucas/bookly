declare module 'next-auth' {
  interface Session {
    user: {
      address: string
    } & DefaultSession['user']
  }
}
