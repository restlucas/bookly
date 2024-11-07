import { getUserById, updateUserFavorites } from '@/services/userService'
import { useSession } from 'next-auth/react'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  image: string
  address?: string
  birth?: string
  phone?: string
  gender?: string
  favorites?: string[] | string
  userType: {
    slug: string
  }
}

interface UserContextType {
  user: User
  isLoading: boolean
  updateRole: (role: string) => void
  handleFavorite: (professionalId: string) => void
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState({} as User)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchUser = async () => {
      if (status === 'authenticated') {
        const user = await getUserById(session.user.id)

        if (user.favorites) {
          const favoritesArray = user.favorites.replace(/'/g, '"')
          const favoritesArrayFormatted = JSON.parse(favoritesArray)

          user.favorites = favoritesArrayFormatted
        }

        setUser(user)
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [session])

  function updateRole(role: string) {
    setUser((prevState) => ({
      ...prevState,
      userType: {
        slug: role,
      },
    }))
  }

  async function handleFavorite(professionalId: string) {
    let favoritesArray: string[] | string

    if (Array.isArray(user.favorites)) {
      const isFavorited = user.favorites.includes(professionalId)

      favoritesArray = isFavorited
        ? user.favorites.filter((item) => item !== professionalId)
        : [...user.favorites, professionalId]
    } else {
      favoritesArray = [professionalId]
    }

    setUser((prevState) => ({
      ...prevState,
      favorites: favoritesArray,
    }))

    await updateUserFavorites(user.id, JSON.stringify(favoritesArray))
  }

  return (
    <UserContext.Provider
      value={{ user, isLoading, updateRole, handleFavorite }}
    >
      {children}
    </UserContext.Provider>
  )
}
