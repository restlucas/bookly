'use client'

import { GoogleLogo, LinkedinLogo } from '@phosphor-icons/react'
import Link from 'next/link'

export default function Login() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-background-200 flex items-center justify-center">
        <div className="w-3/5 h-auto space-y-4">
          <h1 className="my-4 text-3xl font-bold text-vibrant-green-100">
            Bookly
          </h1>
          <h2 className="text-title text-2xl font-bold">Entre na sua conta</h2>
          <p className="text-slate-500 font-thin">
            Bem-vindo de volta! Por favor, escolha um método de login
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button className="border-2 border-background-300 rounded-xl py-4 text-title flex items-center justify-center gap-2 hover:bg-background-100 duration-150 hover:border-vibrant-green-200">
              <GoogleLogo color="#E34133" weight="fill" size={26} />
              <span>Google</span>
            </button>
            <button className="border-2 border-background-300 rounded-xl py-4 text-title flex items-center justify-center gap-2 hover:bg-background-100 duration-150 hover:border-vibrant-green-200">
              <LinkedinLogo color="#0A78B5" weight="duotone" size={26} />
              <span>Linkedin</span>
            </button>
          </div>

          <div className="py-3 flex items-center text-sm text-gray-500 before:flex-1 before:border-t before:border-background-300 before:me-6 after:flex-1 after:border-t after:border-background-300 after:ms-6">
            or
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-title" htmlFor="email">
                E-mail
              </label>
              <input
                className="py-3 px-5 bg-background-300 rounded-lg outline-vibrant-green-100"
                type="email"
                id="email"
                name="email"
                placeholder="seuemail@email.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-title" htmlFor="password">
                Senha
              </label>
              <input
                className="py-3 px-5 bg-background-300 rounded-lg outline-vibrant-green-100"
                type="password"
                id="password"
                name="password"
                placeholder="********"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start gap-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  value="remember-me"
                />
                <label className="text-title" htmlFor="remember-me">
                  Lembre de mim
                </label>
              </div>
              <Link
                href=""
                className="text-primary hover:text-vibrant-green-100"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-vibrant-green-100 rounded-xl text-background-300 font-semibold my-5 hover:bg-vibrant-green-200 duration-150"
            >
              Entrar
            </button>
          </form>

          <div className="flex items-center justify-center">
            <span className="text-slate-500">Não tem uma conta?</span>
            <Link
              href=""
              className="text-primary hover:text-vibrant-green-100 ml-1"
            >
              Crie uma conta!
            </Link>
          </div>
        </div>
      </div>
      {/* <aside className="bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat" /> */}
    </div>
  )
}
