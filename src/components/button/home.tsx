'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SessionProps {
  user?: {
    name: string
    email: string
    image: string
  }
}

export function HomeButton({ session }: { session: SessionProps }) {
  const [button, setButton] = useState({
    href: '/login',
    text: 'Login',
  })

  useEffect(() => {
    if (session) {
      setButton({
        href: '/dashboard',
        text: 'Access the system',
      })
    }
  }, [session])

  return (
    <Link
      href={button.href}
      className="flex h-12 w-[200px] cursor-pointer items-center justify-center rounded-md bg-vibrant-green-100 font-bold text-background-200 duration-150 hover:bg-vibrant-green-200"
    >
      {button.text}
    </Link>
  )
}
