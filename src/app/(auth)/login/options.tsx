'use client'

import { GithubLogo, GoogleLogo, LinkedinLogo } from '@phosphor-icons/react'
import { signIn } from 'next-auth/react'

export function LoginOptions() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-4">
      <button
        onClick={() => signIn('google')}
        className="text-title flex items-center justify-center gap-2 rounded-xl border-2 border-background-300 py-4 duration-150 hover:border-vibrant-green-200 hover:bg-background-100"
      >
        <GoogleLogo color="#E34133" weight="fill" size={26} />
        <span>Google</span>
      </button>
      <button
        onClick={() => signIn('github')}
        className="text-title flex items-center justify-center gap-2 rounded-xl border-2 border-background-300 py-4 duration-150 hover:border-vibrant-green-200 hover:bg-background-100"
      >
        <GithubLogo color="#0A78B5" weight="duotone" size={26} />
        <span>Github</span>
      </button>
      <button
        onClick={() => signIn('linkedin')}
        className="text-title flex w-full items-center justify-center gap-2 justify-self-center rounded-xl border-2 border-background-300 py-4 duration-150 hover:border-vibrant-green-200 hover:bg-background-100 lg:col-span-2 lg:w-[calc(50%_-_0.5rem)]"
      >
        <LinkedinLogo color="#0A78B5" weight="duotone" size={26} />
        <span>Linkedin</span>
      </button>
    </div>
  )
}
