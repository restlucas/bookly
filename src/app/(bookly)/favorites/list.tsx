'use client'

import { getUserFavorites } from '@/services/userService'
import { useCallback, useEffect, useState } from 'react'
import { Card } from './card'

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

export function FavoritesList({ userId }: { userId: string }) {
  const [favorites, setFavorites] = useState<FavoriteProps[]>()

  const fetchFavorites = useCallback(async () => {
    const response = await getUserFavorites(userId)
    setFavorites(response)
  }, [userId])

  useEffect(() => {
    fetchFavorites()
  }, [userId, fetchFavorites])

  return (
    <div className="grid-cols-auto-fill grid grid-cols-1 gap-4 xl:grid-cols-4">
      {userId ? (
        favorites ? (
          favorites.map((professional, index) => {
            return <Card key={index} professional={professional} />
          })
        ) : (
          <div className="col-span-full w-full text-center text-vibrant-green-100">
            No favorites found :({' '}
          </div>
        )
      ) : (
        Array.from({ length: 4 }).map((_, index) => {
          return (
            <div
              key={index}
              className="h-40 w-full animate-pulse cursor-pointer rounded-md border-2 border-slate-700 bg-background-300 p-4 shadow-md"
            />
          )
        })
      )}
    </div>
  )
}
