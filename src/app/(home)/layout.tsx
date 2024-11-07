// import { Footer } from "@/components/footer";
import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default function BooklyLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex h-screen w-full flex-col">
      {/* <Header /> */}
      <main className="m-8 flex-1 md:mx-16 md:my-10">{children}</main>
      {/* <Footer /> */}
    </main>
  )
}
