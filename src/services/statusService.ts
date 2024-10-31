"use server";

import { prisma } from "@/lib/prisma";

// Get all status
export async function getStatus() {
  return await prisma.status.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}
