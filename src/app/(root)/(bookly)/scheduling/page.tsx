"use client";

import { ArrowCircleRight } from "@phosphor-icons/react";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="space-y-8 rounded-md bg-background-200 p-8">
      <h1 className="text-center text-2xl font-bold">
        Selecione uma categoria para começar
      </h1>

      <div className="grid grid-cols-4 gap-8 p-8">
        <Link
          href="/professionals?category=health"
          className="flex cursor-pointer items-center justify-center rounded-md border-2 border-vibrant-green-100 bg-vibrant-green-100 p-8 duration-150 hover:bg-background-300"
        >
          <h2 className="text-center text-lg">Área médica e saúde</h2>
        </Link>
        <Link
          href="/professionals?category=beauty"
          className="flex cursor-pointer items-center justify-center rounded-md border-2 border-vibrant-green-100 bg-vibrant-green-100 p-8 duration-150 hover:bg-background-300"
        >
          <h2 className="text-center text-lg">Beleza e bem-estar</h2>
        </Link>
        <Link
          href="/professionals?category=domestic"
          className="flex cursor-pointer items-center justify-center rounded-md border-2 border-vibrant-green-100 bg-vibrant-green-100 p-8 duration-150 hover:bg-background-300"
        >
          <h2 className="text-center text-lg">Serviços domésticos</h2>
        </Link>
        <Link
          href="/professionals?category=education-consulting"
          className="flex cursor-pointer items-center justify-center rounded-md border-2 border-vibrant-green-100 bg-vibrant-green-100 p-8 duration-150 hover:bg-background-300"
        >
          <h2 className="text-center text-lg">Educação e consultoria</h2>
        </Link>
        <Link
          href="/professionals?category=automotive"
          className="flex cursor-pointer items-center justify-center rounded-md border-2 border-vibrant-green-100 bg-vibrant-green-100 p-8 duration-150 hover:bg-background-300"
        >
          <h2 className="text-center text-lg">Serviços automotivos</h2>
        </Link>
        <Link
          href="/professionals?category=events"
          className="flex cursor-pointer items-center justify-center rounded-md border-2 border-vibrant-green-100 bg-vibrant-green-100 p-8 duration-150 hover:bg-background-300"
        >
          <h2 className="text-center text-lg">Eventos e festas</h2>
        </Link>
        <Link
          href="/professionals?category=accounting-assistance"
          className="flex cursor-pointer items-center justify-center rounded-md border-2 border-vibrant-green-100 bg-vibrant-green-100 p-8 duration-150 hover:bg-background-300"
        >
          <h2 className="text-center text-lg">
            Assistência jurídica e contábil
          </h2>
        </Link>
      </div>

      <div className="space-y-6">
        <h2 className="text-center text-xl font-bold">
          Ou navegue por todas as opções
        </h2>

        <div className="flex items-center justify-center">
          <Link
            href="/professionals"
            className="flex w-1/4 items-center justify-center gap-4 rounded-md border-2 border-transparent bg-vibrant-green-100 p-4 font-bold hover:border-vibrant-green-100 hover:bg-background-300"
          >
            <span className="">Listar profissionais</span>
            <ArrowCircleRight size={28} />
          </Link>
        </div>
      </div>
    </div>
  );
}
