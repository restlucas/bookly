'use server'

import prisma from '@/lib/prisma'

// Get profession categories
export async function getAllCategories() {
  return await prisma.category.findMany()
}

// Get profession by category
export async function getOccupationByCategory(
  column: string,
  categoryValue: string,
) {
  return await prisma.occupation.findMany({
    where: {
      category: {
        [column]: categoryValue,
      },
    },
  })
}
