'use server'

import prisma from '@/lib/prisma'
import { AppointmentFormData } from '@/utils/validators'
import dayjs from 'dayjs'

interface ServiceResponse<T> {
  type: 'success' | 'error'
  data?: T
  message?: string
}

interface AppointmentData {
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

export async function createAppointment(
  userId: string,
  appointmentData: AppointmentFormData,
): Promise<ServiceResponse<AppointmentData>> {
  try {
    const { userProfessionalId, date, hour, serviceTypeSlug } = appointmentData

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
        name: 'Pending approval',
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

    const response = await prisma.appointment.create({
      data,
    })

    return {
      type: 'success',
      message: 'Appointment created successfully!',
      data: response,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error on create appointment:', error)

      return {
        type: 'error',
        message: 'Error on create appointment',
      }
    } else {
      console.error('Unknown error', error)
    }
  }
}

export async function updateAppointmentStatus(
  operation: { name: string; title: string; nextStep: string },
  appointmentId: string,
): Promise<ServiceResponse<AppointmentData>> {
  try {
    const { id: statusId } = await prisma.status.findFirst({
      where: {
        name: operation.nextStep,
      },
    })

    const response = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        statusId,
      },
    })

    return {
      type: 'success',
      message: 'Success on status update!',
      data: response,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error on status update:', error)

      return {
        type: 'error',
        message: 'Error on status update',
      }
    } else {
      console.error('Unknown error', error)
    }
  }
}

export async function updateAppointmentObservations(
  comment: string,
  appointmentId: string,
): Promise<ServiceResponse<AppointmentData>> {
  try {
    const response = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        observations: comment,
      },
    })

    return {
      type: 'success',
      message: 'Comment saved successfully!',
      data: response,
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error on comment save:', error)

      return {
        type: 'error',
        message: 'Erro on comment save',
      }
    } else {
      console.error('Unknown error', error)
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

    professionalAppointments = await prisma.appointment.findMany({
      where: {
        professionalId,
        date: {
          gte: today,
          lt: nextTwoWeeks,
        },
        status: {
          name: 'In progress',
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
  const personalAppointments = await prisma.appointment.findMany({
    where: {
      userId,
      date: {
        gte: today,
        lt: nextTwoWeeks,
      },
      status: {
        name: 'In progress',
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
