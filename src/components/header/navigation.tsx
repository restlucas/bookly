'use client'

import Link from 'next/link'
import { List, SignOut, X } from '@phosphor-icons/react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { menus } from '@/utils/common-data'
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'

export function HeaderNavigation({ session }: { session: Session }) {
  const { user } = session
  const router = useRouter()
  const pathname = usePathname()

  const [showMenu, setShowMenu] = useState(false)

  function handleMenu(menu) {
    setShowMenu(false)
    router.push(`${menu}`)
  }

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden lg:block">
        <ul className="left-1/2 hidden -translate-x-1/2 transform space-x-8 py-4 md:absolute md:flex">
          {menus.main.map((menu) => {
            return (
              menu.access.includes(user.role) && (
                <li
                  key={menu.id}
                  className={`duration-100 hover:underline ${pathname.includes(menu.href) && 'font-bold text-vibrant-green-100'}`}
                >
                  <Link href={menu.href}>{menu.name}</Link>
                </li>
              )
            )
          })}
        </ul>
        <div className="flex items-center justify-center gap-4">
          <div className="group relative flex cursor-pointer items-center justify-center gap-2">
            <span className="duration-100 group-hover:underline">
              {user.name}
            </span>
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-transparent bg-slate-400 duration-100 duration-150 group-hover:border-vibrant-green-100 group-hover:bg-vibrant-green-100">
              <Image
                className="duration-200"
                alt="User photo"
                src={user.image}
                fill
              />
            </div>

            <div className="absolute bottom-0 right-0 top-full hidden w-48 duration-300 group-hover:block">
              <div className="flex flex-col rounded-md border-2 border-slate-700 bg-background-200">
                {menus.aside.map((menu) => {
                  return (
                    menu.access.includes(user.role) && (
                      <Link
                        key={menu.id}
                        href={menu.href}
                        className="cursor-pointer py-2 pl-4 pr-2 hover:bg-background-300"
                      >
                        {menu.name}
                      </Link>
                    )
                  )
                })}
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="flex cursor-pointer items-center justify-between gap-4 py-2 pl-4 pr-2 hover:bg-background-300"
                >
                  <span>Logout</span>
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
      </div>

      {/* Mobile navigation */}
      <div className="block lg:hidden">
        {showMenu ? (
          <>
            <div
              className="absolute bottom-0 left-0 top-0 z-50 w-1/2 bg-black/50"
              onClick={() => setShowMenu(false)}
            />
            <div className="w-50 absolute bottom-0 right-0 top-0 z-50 w-1/2 bg-background-200 p-8">
              <div className="flex h-full w-full flex-col items-start gap-8">
                <div className="flex w-full items-center justify-end">
                  <button onClick={() => setShowMenu(false)}>
                    <X size={32} />
                  </button>
                </div>
                <ul className="flex w-full flex-col items-start justify-center gap-8">
                  {menus.main.map((menu) => {
                    return (
                      menu.access.includes(user.role) && (
                        <li
                          key={menu.id}
                          className={`text-lg duration-100 hover:underline ${pathname.includes(menu.href) && 'font-bold text-vibrant-green-100'}`}
                        >
                          <button onClick={() => handleMenu(menu.href)}>
                            {menu.name}
                          </button>
                        </li>
                      )
                    )
                  })}
                </ul>
                <div className="mt-auto flex w-full flex-col gap-4 border-t-[2px] border-background-300 pt-6 text-lg">
                  {menus.aside.map((menu) => {
                    return (
                      menu.access.includes(user.role) && (
                        <Link
                          key={menu.id}
                          href={menu.href}
                          className="cursor-pointer py-2 pl-4 pr-2 hover:bg-background-300"
                        >
                          {menu.name}
                        </Link>
                      )
                    )
                  })}

                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="flex cursor-pointer items-center justify-between gap-4 py-2 pl-4 pr-2 hover:bg-background-300"
                  >
                    <span>Logout</span>
                    <SignOut
                      className="text-slate-400 group-hover:text-white"
                      size={22}
                      weight="regular"
                    />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <button onClick={() => setShowMenu(!showMenu)}>
            <List size={48} weight="bold" />
          </button>
        )}
      </div>
    </>
  )
}
