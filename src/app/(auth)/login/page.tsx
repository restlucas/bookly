'use client'

import { signIn } from 'next-auth/react'
import { GithubLogo, GoogleLogo, LinkedinLogo } from '@phosphor-icons/react'
import { NextSeo } from 'next-seo'

export default function Login() {
  return (
    <>
      <NextSeo title="Login | Bookly" description="Página de login" />
      <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center bg-background-200">
          <div className="h-auto w-3/5 space-y-6">
            <h1 className="my-4 text-3xl font-bold text-vibrant-green-100">
              Bookly
            </h1>
            <h2 className="text-title text-2xl font-bold">
              Entre na sua conta
            </h2>
            <p className="font-thin text-slate-500">
              Bem-vindo de volta! Por favor, escolha o método de login
            </p>

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
          </div>
        </div>
      </div>
    </>
  )
}
