"use client";

import Link from "next/link";
import { LoginButton } from "./button/login";
import { CaretLeft, MapPin } from "@phosphor-icons/react";
import Image from "next/image";

export function Header() {
  return (
    <div>
      <nav className="relative mx-16 flex items-center justify-between py-4">
        <h1 className="my-4 text-3xl font-bold text-vibrant-green-100">
          Bookly
        </h1>
        <ul className="absolute left-1/2 flex -translate-x-1/2 transform space-x-4">
          {/* Logged */}
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/appointment">Agendamento</Link>
          </li>
          {/* <li>My appointments</li> */}
        </ul>
        <div className="flex items-center justify-center gap-8">
          {/* Unlogged */}
          {/* <LoginButton /> */}

          {/* Logged */}
          <div className="group flex cursor-pointer items-center justify-end gap-2">
            <MapPin
              className="fill-slate-400 duration-100 group-hover:fill-white"
              weight="bold"
              size={24}
            />
            <span className="text-slate-400 duration-100 hover:text-white group-hover:text-white">
              Telêmaco Borba
            </span>
          </div>
          <Link
            href="/profile"
            className="group flex cursor-pointer items-center justify-center gap-2"
          >
            <span className="duration-100 group-hover:underline">
              Lucas Souza
            </span>
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-400 duration-150 group-hover:bg-vibrant-green-100">
              <Image
                className="absolute transition-opacity duration-300 group-hover:opacity-0"
                alt="Photo"
                src="/lucas.jpg"
                fill
              />
              <CaretLeft
                className="absolute -rotate-90 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                size={20}
                weight="bold"
              />
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}
