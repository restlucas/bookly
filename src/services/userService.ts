'use server'

import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

interface UserProps {
  name?: string
  email?: string
  phone?: string
  image?: string
  birth?: string
  gender?: string
  address?: string
}

interface ServiceResponse<T> {
  type: 'success' | 'error'
  data?: T
  message?: string
}

// Get user types
export async function getUserTypes() {
  return await prisma.userType.findMany()
}

// Get user by id
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      address: true,
      birth: true,
      phone: true,
      gender: true,
      favorites: true,
      userType: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  })
}

// Get user favorites
export async function getUserFavorites(id: string) {
  const { favorites } = await prisma.user.findUnique({
    where: { id },
    select: {
      favorites: true,
    },
  })

  if (favorites && typeof favorites === 'string') {
    const favoritesArray = favorites.replace(/'/g, '"')
    const favoritesArrayFormatted = JSON.parse(favoritesArray)

    const favoritedProfessionals = await Promise.all(
      favoritesArrayFormatted.map(async (favoritedId) => {
        return await prisma.user.findUnique({
          where: { id: favoritedId },
          select: {
            id: true,
            name: true,
            image: true,
            address: true,
            professional: {
              select: {
                bio: true,
                occupation: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        })
      }),
    )

    return favoritedProfessionals
  }

  return null
}

// Update user
export async function updateUser(
  id: string,
  data: UserProps,
): Promise<ServiceResponse<User>> {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    })

    return {
      type: 'success',
      message: 'Informações salvas com sucesso!',
      data: updatedUser,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao atualizar o usuário:', error)

      return {
        type: 'error',
        message: 'Erro ao atualizar o usuário',
      }
    } else {
      console.error('Erro desconhecido', error)
    }
  }
}

// Update user role
export async function updateUserRole(
  id: string,
  roleSlug: string,
): Promise<ServiceResponse<User>> {
  try {
    const { id: userTypeId } = await prisma.userType.findFirst({
      where: {
        slug: roleSlug,
      },
    })

    const updatedUserRole = await prisma.user.update({
      where: { id },
      data: {
        userTypeId,
      },
    })

    if (roleSlug === 'professional') {
      const newProfessional = await prisma.professional.create({
        data: {
          userId: id,
        },
      })

      await Promise.all(
        Array.from({ length: 7 }).map(async (_, index) => {
          await prisma.schedule.create({
            data: {
              professionalId: newProfessional.id,
              weekDay: index,
            },
          })
        }),
      )
    }

    return {
      type: 'success',
      message: 'Sucesso ao atualizar role do usuário!',
      data: updatedUserRole,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error on update user role:', error)

      return {
        type: 'error',
        message: 'Error ao atualizar usuário',
      }
    } else {
      console.error('Erro desconhecido', error)
    }
  }
}

// Update user favorites
export async function updateUserFavorites(
  id: string,
  favorites: string,
): Promise<ServiceResponse<User>> {
  try {
    const updateUserFavorites = await prisma.user.update({
      where: { id },
      data: {
        favorites,
      },
    })

    return {
      type: 'success',
      message: 'Favoritos salvos com sucesso!',
      data: updateUserFavorites,
    }
  } catch (error) {
    console.error('Error on favorites user field:', error)

    return {
      type: 'error',
      message: 'Erro ao atualizar usuário',
    }
  }
}

// Delete user
export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  })
}
