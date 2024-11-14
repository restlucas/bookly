'use client'

import { ArrowLeft } from '@phosphor-icons/react'
import Link from 'next/link'

export function BackButton() {
  return (
    <Link
      href={'./'}
      className="flex items-center justify-center gap-2 rounded-md border-2 border-transparent px-3 py-1 duration-100 hover:border-vibrant-green-100 hover:text-vibrant-green-100"
    >
      <ArrowLeft size={28} weight="bold" className="fill-vibrant-green-100" />
      <span>Back to previous page</span>
    </Link>
  )
}
