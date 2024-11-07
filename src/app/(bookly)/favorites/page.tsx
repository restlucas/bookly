'use client'

import { UserContext } from '@/contexts/UserContext'
import { getUserFavorites } from '@/services/userService'
import { useContext, useEffect, useState } from 'react'
import { Card } from './card'
import { NextSeo } from 'next-seo'

interface FavoriteProps {
  id: string
  address: string
  image: string
  name: string
  professional: {
    bio?: string
    occupation: {
      name: string
    }
  }
}

export default function Favorites() {
  const { user } = useContext(UserContext)
  const [favorites, setFavorites] = useState<FavoriteProps[]>()

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await getUserFavorites(user.id)
      setFavorites(response)
    }

    if (user.id) {
      fetchFavorites()
    }
  }, [user])
  return (
    <>
      <NextSeo title="Favoritos | Bookly" noindex />
      <section className="mb-8 flex flex-col gap-6">
        <div className="w-full rounded-md bg-background-200 p-8">
          <h2 className="mb-8 text-2xl font-bold text-vibrant-green-100">
            Salvos
          </h2>
          <div className="grid-cols-auto-fill grid grid-cols-1 gap-4 xl:grid-cols-4">
            {favorites
              ? favorites.map((professional, index) => {
                  return <Card key={index} professional={professional} />
                })
              : Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="h-40 w-full animate-pulse cursor-pointer rounded-md border-2 border-slate-700 bg-background-300 p-4 shadow-md"
                    />
                  )
                })}
          </div>
        </div>
      </section>
    </>
  )
}
