'use server'

import prisma from '@/lib/prisma'
import { AbsenceFormData } from '@/utils/validators'

// Get absence by userId
export async function getAbsence(userId: string) {
  const { id: professionalId } = await prisma.professional.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  })

  const response = await prisma.absence.findMany({
    where: {
      professionalId,
    },
    select: {
      id: true,
      professionalId: true,
      startTime: true,
      endTime: true,
      absenceOption: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  })

  return response
}

// Get absence options
export async function getOptions() {
  const response = await prisma.absenceOptions.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  })

  return response
}

// Create absence
export async function createAbsence(data: AbsenceFormData) {
  try {
    const { id: professionalId } = await prisma.professional.findUnique({
      where: {
        userId: data.userId,
      },
    })

    const { userId, ...newData } = data
    console.log(userId)

    const formatedData = { ...newData, professionalId }

    const response = await prisma.absence.create({
      data: formatedData,
      select: {
        id: true,
        professionalId: true,
        startTime: true,
        endTime: true,
        absenceOption: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    })

    return {
      type: 'success',
      message: 'Ausência criada com sucesso!',
      data: response,
    }
  } catch (error) {
    console.error('Erro ao criar ausência:', error)

    return {
      type: 'error',
      error: error.message || 'Erro ao criar ausência',
    }
  }
}

// Delete absence
export async function deleteAbsence(userId: string, absenceId: string) {
  const { id: professionalId } = await prisma.professional.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  })

  const response = await prisma.absence.delete({
    where: {
      id: absenceId,
      professionalId,
    },
  })

  return response
}
