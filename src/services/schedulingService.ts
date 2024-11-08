'use server'

import { prisma } from '@/lib/prisma'
import { SchedulingFormData } from '@/utils/validators'
import dayjs from 'dayjs'

interface ServiceResponse<T> {
  type: 'success' | 'error'
  data?: T
  message?: string
}

interface SchedulingData {
  id: string
  userId: string
  serviceTypeId: string
  createdAt: Date
  date: Date
  professionalId: string
  statusId: string
  observations: string | null
  updatedAt: Date
}

export async function getServiceType() {
  const response = await prisma.serviceType.findMany()

  return response
}

export async function createScheduling(
  userId: string,
  schedulingData: SchedulingFormData,
): Promise<ServiceResponse<SchedulingData>> {
  try {
    const { userProfessionalId, date, hour, serviceTypeSlug } = schedulingData

    // Get professional id
    const { id: professionalId } = await prisma.professional.findFirstOrThrow({
      where: {
        userId: String(userProfessionalId),
      },
      select: {
        id: true,
      },
    })

    // Get default status id
    const { id: statusId } = await prisma.status.findFirst({
      where: {
        name: 'Aguardando aprovação',
      },
    })

    // Get serviceTypeId
    const serviceType = await prisma.serviceType.findFirst({
      where: {
        slug: serviceTypeSlug,
      },
      select: {
        id: true,
      },
    })

    const dateInStringFormat = date
    const hourNumber = hour / 60

    const formattedDate = new Date(dateInStringFormat)

    const hours = Math.floor(hourNumber)
    const minutes = Math.round((hourNumber - hours) * 60)
    formattedDate.setUTCHours(hours + 3, minutes, 0, 0)

    const data = {
      userId,
      professionalId,
      date: formattedDate.toISOString(),
      serviceTypeId: serviceType.id,
      statusId,
    }

    const response = await prisma.scheduling.create({
      data,
    })

    return {
      type: 'success',
      message: 'Sucesso ao criar agendamento!',
      data: response,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao criar agendamento:', error)

      return {
        type: 'error',
        message: 'Erro ao criar agendamento',
      }
    } else {
      console.error('Erro desconhecido', error)
    }
  }
}

export async function updateSchedulingStatus(
  operation: { name: string; title: string; nextStep: string },
  schedulingId: string,
): Promise<ServiceResponse<SchedulingData>> {
  try {
    const { id: statusId } = await prisma.status.findFirst({
      where: {
        name: operation.nextStep,
      },
    })

    const response = await prisma.scheduling.update({
      where: {
        id: schedulingId,
      },
      data: {
        statusId,
      },
    })

    return {
      type: 'success',
      message: 'Status alterado com sucesso!',
      data: response,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao atualizar status:', error)

      return {
        type: 'error',
        message: 'Erro ao atualizar status',
      }
    } else {
      console.error('Erro desconhecido', error)
    }
  }
}

export async function updateSchedulingObservations(
  comment: string,
  schedulingId: string,
): Promise<ServiceResponse<SchedulingData>> {
  try {
    const response = await prisma.scheduling.update({
      where: {
        id: schedulingId,
      },
      data: {
        observations: comment,
      },
    })

    return {
      type: 'success',
      message: 'Comentário salvo com sucesso!',
      data: response,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao salvar comentário:', error)

      return {
        type: 'error',
        message: 'Erro ao salvar comentário',
      }
    } else {
      console.error('Erro desconhecido', error)
    }
  }
}

export async function getNextAppointmentsByUser(
  userRole: string,
  userId: string,
) {
  const today = new Date()
  let professionalAppointments = []

  const nextTwoWeeks = dayjs(today)
    .set('date', dayjs(today).get('date') + 14)
    .set('hour', 23)
    .set('minutes', 59)
    .set('seconds', 59)
    .toDate()

  if (userRole === 'professional') {
    const { id: professionalId } = await prisma.professional.findUnique({
      where: {
        userId,
      },
    })

    professionalAppointments = await prisma.scheduling.findMany({
      where: {
        professionalId,
        date: {
          gte: today,
          lt: nextTwoWeeks,
        },
        status: {
          name: 'Em andamento',
        },
      },
      select: {
        date: true,
        professional: {
          select: {
            serviceValue: true,
          },
        },
        serviceType: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })
  }

  // Personal appointments
  const personalAppointments = await prisma.scheduling.findMany({
    where: {
      userId,
      date: {
        gte: today,
        lt: nextTwoWeeks,
      },
      status: {
        name: 'Em andamento',
      },
    },
    select: {
      date: true,
      serviceType: {
        select: {
          name: true,
        },
      },
      professional: {
        select: {
          serviceValue: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
          occupation: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  return { professionalAppointments, personalAppointments }
}
