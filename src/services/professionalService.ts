"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// Get all professionals
export async function getProfessionals() {
  const session = await getServerSession();

  return await prisma.user.findMany({
    where: {
      role: "professional",
    },
    select: {
      id: true,
      name: true,
      image: true,
      profile: {
        select: {
          bio: true,
          serviceValue: true,
          profession: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

// Get profile
export async function getProfessional(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      email: true,
      image: true,
      phone: true,
      address: true,
      profile: {
        select: {
          bio: true,
          serviceType: true,
          serviceValue: true,
          tags: true,
          profession: {
            select: {
              name: true,
            },
          },
          reviews: {
            select: {
              comment: true,
              rating: true,
              createdAt: true,
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

// Get professional profile
export async function getProfessionalProfile(id: string) {
  return await prisma.profile.findUnique({
    where: { userId: id },
    select: {
      bio: true,
      professionCategoryId: true,
      professionId: true,
      serviceType: true,
      serviceValue: true,
      tags: true,
    },
  });
}

// Update professional profile
export async function updateProfessionalProfile(userId, data: any) {
  console.log(data);
  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data,
    });

    return {
      type: "success",
      message: "Perfil atualizado com sucesso!",
      data: updatedProfile,
    };
  } catch (error) {
    console.error("Error on update user role:", error);

    return {
      type: "error",
      error: error.message || "Error on user update",
    };
  }
}
