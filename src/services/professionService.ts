"use server";

import { prisma } from "@/lib/prisma";

// Get profession categories
export async function getAllCategories() {
  return await prisma.category.findMany();
}

// Get profession by category
export async function getProfessionByCategory(categoryId: string) {
  return await prisma.profession.findMany({
    where: { categoryId },
  });
}
