"use server";

import { prisma } from "@/lib/prisma";

// Get absence by userId
export async function getAbsence(userId) {
  const { id: profileId } = await prisma.profile.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  const response = await prisma.absence.findMany({
    where: {
      profileId,
    },
    select: {
      id: true,
      profileId: true,
      startTime: true,
      endTime: true,
      absenceOption: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });

  return response;
}

// Get absence options
export async function getOptions() {
  const response = await prisma.absenceOptions.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  return response;
}

// Create absence
export async function createAbsence(data: any) {
  const { id: profileId } = await prisma.profile.findUnique({
    where: {
      userId: data.userId,
    },
  });

  let { userId, ...newData } = data;

  const formatedData = { ...newData, profileId };

  const response = await prisma.absence.create({
    data: formatedData,
    select: {
      id: true,
      profileId: true,
      startTime: true,
      endTime: true,
      absenceOption: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });

  return response;
}

// Delete absence
export async function deleteAbsence(userId: string, absenceId: string) {
  const { id: profileId } = await prisma.profile.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  const response = await prisma.absence.delete({
    where: {
      id: absenceId,
      profileId,
    },
  });

  return response;
}
