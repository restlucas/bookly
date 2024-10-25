"use client";

import Link from "next/link";
import { LoginButton } from "./button/login";
import { MapPin, SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { menus } from "@/utils/common-data";
import { usePathname } from "next/navigation";

export function Header() {
  const { user, isLoading } = useContext(UserContext);
  const pathname = usePathname();

  return (
    <div>
      <nav className="relative mx-16 flex items-center justify-between py-4">
        <h1 className="my-4 text-3xl font-bold text-vibrant-green-100">
          Bookly
        </h1>

        {user ? (
          <>
            <ul className="absolute left-1/2 flex -translate-x-1/2 transform space-x-4">
              {menus.map((menu) => {
                return (
                  menu.access.includes(user.role) && (
                    <li
                      key={menu.id}
                      className={`duration-100 hover:underline ${pathname.includes(menu.href) && "font-bold text-vibrant-green-100"}`}
                    >
                      <Link href={menu.href}>{menu.name}</Link>
                    </li>
                  )
                );
              })}
            </ul>
            <div className="flex items-center justify-center gap-4">
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

              <div className="group relative flex cursor-pointer items-center justify-center gap-2">
                <span className="duration-100 group-hover:underline">
                  {user.name}
                </span>
                <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-transparent bg-slate-400 duration-100 duration-150 group-hover:border-vibrant-green-100 group-hover:bg-vibrant-green-100">
                  <Image
                    className="duration-200"
                    alt={user.name}
                    src={user.image}
                    fill
                  />
                </div>

                <div className="absolute bottom-0 right-0 top-full hidden w-48 duration-300 group-hover:block">
                  <div className="flex flex-col rounded-md border-2 border-slate-700 bg-background-200">
                    <Link
                      href="/account"
                      className="cursor-pointer py-2 pl-4 pr-2 hover:bg-background-300"
                    >
                      Minha conta
                    </Link>
                    <Link
                      href="/favorites"
                      className="cursor-pointer py-2 pl-4 pr-2 hover:bg-background-300"
                    >
                      Favoritos
                    </Link>
                    {user.role === "professional" && (
                      <Link
                        href="/profile"
                        className="cursor-pointer py-2 pl-4 pr-2 hover:bg-background-300"
                      >
                        Perfil profissional
                      </Link>
                    )}
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="flex cursor-pointer items-center justify-between gap-4 py-2 pl-4 pr-2 hover:bg-background-300"
                    >
                      <span>Sair</span>
                      <SignOut
                        className="text-slate-400 group-hover:text-white"
                        size={22}
                        weight="regular"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <LoginButton />
        )}
      </nav>
    </div>
  );
}
