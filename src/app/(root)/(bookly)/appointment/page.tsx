'use client'

import { ArrowCircleRight } from '@phosphor-icons/react'
import Link from 'next/link'

export default function Categories() {
  return (
    <div className="bg-background-200 p-8 rounded-md space-y-8">
      <h1 className="font-bold text-2xl text-center">
        Selecione uma categoria para começar
      </h1>

      <div className="p-8 grid grid-cols-4 gap-8">
        <Link
          href="/appointment/professionals?category=health"
          className="bg-vibrant-green-100 rounded-md p-8 flex items-center justify-center cursor-pointer border-2 hover:bg-background-300 border-vibrant-green-100 duration-150"
        >
          <h2 className="text-center text-lg">Área médica e saúde</h2>
        </Link>
        <Link
          href="/appointment/professionals?category=beauty"
          className="bg-vibrant-green-100 rounded-md p-8 flex items-center justify-center cursor-pointer border-2 hover:bg-background-300 border-vibrant-green-100 duration-150"
        >
          <h2 className="text-center text-lg">Beleza e bem-estar</h2>
        </Link>
        <Link
          href="/appointment/professionals?category=domestic"
          className="bg-vibrant-green-100 rounded-md p-8 flex items-center justify-center cursor-pointer border-2 hover:bg-background-300 border-vibrant-green-100 duration-150"
        >
          <h2 className="text-center text-lg">Serviços domésticos</h2>
        </Link>
        <Link
          href="/appointment/professionals?category=education-consulting"
          className="bg-vibrant-green-100 rounded-md p-8 flex items-center justify-center cursor-pointer border-2 hover:bg-background-300 border-vibrant-green-100 duration-150"
        >
          <h2 className="text-center text-lg">Educação e consultoria</h2>
        </Link>
        <Link
          href="/appointment/professionals?category=automotive"
          className="bg-vibrant-green-100 rounded-md p-8 flex items-center justify-center cursor-pointer border-2 hover:bg-background-300 border-vibrant-green-100 duration-150"
        >
          <h2 className="text-center text-lg">Serviços automotivos</h2>
        </Link>
        <Link
          href="/appointment/professionals?category=events"
          className="bg-vibrant-green-100 rounded-md p-8 flex items-center justify-center cursor-pointer border-2 hover:bg-background-300 border-vibrant-green-100 duration-150"
        >
          <h2 className="text-center text-lg">Eventos e festas</h2>
        </Link>
        <Link
          href="/appointment/professionals?category=accounting-assistance"
          className="bg-vibrant-green-100 rounded-md p-8 flex items-center justify-center cursor-pointer border-2 hover:bg-background-300 border-vibrant-green-100 duration-150"
        >
          <h2 className="text-center text-lg">
            Assistência jurídica e contábil
          </h2>
        </Link>
      </div>

      <div className="space-y-6">
        <h2 className="font-bold text-xl text-center">
          Ou navegue por todas as opções
        </h2>

        <div className="flex items-center justify-center">
          <Link
            href="/appointment/professionals"
            className="p-4 w-1/4 rounded-md bg-vibrant-green-100 font-bold flex items-center justify-center gap-4 border-2 border-transparent hover:bg-background-300 hover:border-vibrant-green-100"
          >
            <span className="">Listar profissionais</span>
            <ArrowCircleRight size={28} />
          </Link>
        </div>
      </div>
    </div>
  )
}
