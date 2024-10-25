"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

interface UserProps {
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
  birth?: string;
  gender?: string;
  address?: string;
  role?: string;
}

interface ServiceResponse<T> {
  type: "success" | "error";
  data?: T;
  error?: string;
  message?: string;
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
      role: true,
      address: true,
      birth: true,
      phone: true,
      gender: true,
    },
  });
}

// Get user favorites
export async function getUserFavorites(id: string) {
  const { favorites } = await prisma.user.findUnique({
    where: { id },
    select: {
      favorites: true,
    },
  });

  if (favorites && typeof favorites === "string") {
    const favoritesArray = favorites.replace(/'/g, '"');
    const favoritesArrayFormatted = JSON.parse(favoritesArray);

    const favoritedProfessionals = await Promise.all(
      favoritesArrayFormatted.map(async (favoritedId) => {
        return await prisma.user.findUnique({
          where: { id: favoritedId },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            address: true,
            profile: {
              select: {
                bio: true,
                tags: true,
                profession: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
      }),
    );

    return favoritedProfessionals;
  }
  return null;
}

// Update user
export async function updateUser(
  id: string,
  data: UserProps,
): Promise<ServiceResponse<any>> {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return {
      type: "success",
      message: "Informações salvas com sucesso!",
      data: updatedUser,
    };
  } catch (error: any) {
    console.error("Erro ao atualizar o usuário:", error);

    return {
      type: "error",
      error: error.message || "Erro ao atualizar o usuário",
    };
  }
}

// Update user role
export async function updateUserRole(
  id: string,
  role: string,
): Promise<ServiceResponse<any>> {
  try {
    const updatedUserRole = await prisma.user.update({
      where: { id },
      data: {
        role,
      },
    });

    if (role === "professional") {
      const newProfessional = await prisma.profile.create({
        data: {
          userId: id,
        },
      });
    }

    return {
      type: "success",
      data: updatedUserRole,
    };
  } catch (error: any) {
    console.error("Error on update user role:", error);

    return {
      type: "error",
      error: error.message || "Error on user update",
    };
  }
}

// Delete user
export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}
