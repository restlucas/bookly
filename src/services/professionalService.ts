'use server'

import prisma from '@/lib/prisma'
import { authOptions } from '@/utils/authOptions'
import dayjs from 'dayjs'
import { getServerSession } from 'next-auth'

interface FilterQueryProps {
  category?: string
  occupation?: string
  serviceType?: string
}

interface UpdateProfessionalProfileProps {
  categoryId?: string
  occupationId?: string
  bio?: string
  serviceTypeId?: string
  serviceTypeValue?: string
  serviceTimeInMinutes?: number
  tags?: string
}

interface UpdateScheduleProps {
  serviceTime?: string
  intervals?: {
    id: string
    name?: string
    enabled: boolean
    weekDay: number
    timeStartInMinutes: number
    timeEndInMinutes: number
  }[]
}

// Get all professionals
export async function getProfessionals(filterQuery: FilterQueryProps) {
  const { category = '', occupation = '', serviceType = '' } = filterQuery

  const session = await getServerSession(authOptions)

  const response = await prisma.user.findMany({
    where: {
      userType: {
        slug: 'professional',
      },
      professional: {
        category: {
          slug: category !== '' ? category : { not: '' },
        },
        occupation: {
          slug: occupation !== '' ? occupation : { not: '' },
        },
        serviceType: {
          slug: serviceType !== '' ? serviceType : { not: '' },
        },
        bio: { not: '' },
        serviceValue: { not: null },
      },
      address: { not: '' },
      NOT: {
        id: session.user.id,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      address: true,
      professional: {
        select: {
          bio: true,
          serviceValue: true,
          occupation: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  return { count: response.length, professionals: response }
}

// Get profile
export async function getProfessional(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      phone: true,
      address: true,
      professional: {
        select: {
          bio: true,
          serviceValue: true,
          tags: true,
          occupation: {
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
          serviceType: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })
}

export async function getProfessionalName(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
    },
  })
}

// Get professional profile
export async function getProfessionalProfile(id: string) {
  const response = await prisma.professional.findUnique({
    where: { userId: id },
    select: {
      bio: true,
      categoryId: true,
      occupationId: true,
      serviceValue: true,
      tags: true,
      serviceType: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  })

  return response
}

// Update professional profile
export async function updateProfessionalProfile(
  userId: string,
  data: UpdateProfessionalProfileProps,
) {
  try {
    await prisma.professional.update({
      where: { userId },
      data,
    })

    return {
      type: 'success',
      message: 'Profile update successfully!',
    }
  } catch (error) {
    console.error('Error on update user role:', error)

    return {
      type: 'error',
      error: error.message || 'Error on user update',
    }
  }
}

// Get professional schedule by status
export async function getAppointmentsByStatus(
  userRole: string,
  userId: string,
  statusId: string,
) {
  let type = 'userId'

  if (userRole === 'professional') {
    const { id: professionalId } = await prisma.professional.findFirst({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    })

    type = 'professionalId'
    userId = professionalId
  }
  const response = await prisma.appointment.findMany({
    where: {
      [type]: userId,
      statusId,
    },
    select: {
      id: true,
      date: true,
      observations: true,
      professional: {
        select: {
          serviceValue: true,
          occupation: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              name: true,
              phone: true,
            },
          },
          serviceType: {
            select: {
              name: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
          phone: true,
        },
      },
      status: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return response
}

// Get professional schedule
export async function getSchedule(userId: string) {
  const { id: professionalId, serviceTimeInMinutes } =
    await prisma.professional.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
        serviceTimeInMinutes: true,
      },
    })

  const professionalSchedule = await prisma.schedule.findMany({
    where: {
      professionalId,
    },
    orderBy: [
      {
        weekDay: 'asc',
      },
    ],
    select: {
      id: true,
      weekDay: true,
      enabled: true,
      timeStartInMinutes: true,
      timeEndInMinutes: true,
    },
  })

  const response = {
    intervals: professionalSchedule,
    serviceTime: String(serviceTimeInMinutes),
  }

  return response
}

// Update professional schedule
export async function updateSchedule(
  userId: string,
  data: UpdateScheduleProps,
) {
  try {
    const { intervals: intervalsArray } = data

    const intervals = intervalsArray.map(({ ...rest }) => rest)

    const { id: professionalId } = await prisma.professional.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    })

    await Promise.all(
      intervals.map(async (data) => {
        const updatedSchedule = await prisma.schedule.update({
          where: {
            professionalId,
            id: data.id,
          },
          data,
        })
        return {
          success: true,
          message: 'Schedule updated successfully',
          updatedSchedule,
        }
      }),
    )
    return {
      type: 'success',
      message: 'Schedule updated successfully!',
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        type: 'error',
        message: 'Error on schedule update',
      }
    } else {
      console.error('Unknown error', error)
    }
  }
}

// Get professional availability
export async function getAvailability(userId: string, date: string) {
  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  const { id: professionalId, serviceTimeInMinutes } =
    await prisma.professional.findFirst({
      where: {
        userId,
      },
      select: {
        id: true,
        serviceTimeInMinutes: true,
      },
    })

  if (isPastDate) {
    return { possibleTimes: [], availableTimes: [] }
  }

  const professionalAvailability = await prisma.schedule.findFirst({
    where: {
      professionalId,
      weekDay: referenceDate.get('day'),
      enabled: true,
    },
  })

  if (!professionalAvailability) {
    return { possibleTimes: [], availableTimes: [] }
  }

  const { timeStartInMinutes, timeEndInMinutes } = professionalAvailability

  let currentTime = timeStartInMinutes
  const possibleTimes = []

  while (currentTime < timeEndInMinutes) {
    const hours = Math.floor(currentTime / 60)
    const minutes = currentTime % 60
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

    possibleTimes.push({
      time_formatted: timeString,
      time_in_minutes: currentTime,
    })
    currentTime += serviceTimeInMinutes
  }

  const blockedTimes = await prisma.appointment.findMany({
    select: {
      date: true,
    },
    where: {
      professionalId,
      date: {
        gte: referenceDate.set('hour', timeStartInMinutes / 60).toDate(),
        lte: referenceDate.set('hour', timeEndInMinutes / 60).toDate(),
      },
      status: {
        name: {
          notIn: ['Canceled', 'No-show'],
        },
      },
    },
  })

  const availableTimes = possibleTimes.filter(({ timeInMinutes }) => {
    return !blockedTimes.some((blockedTime) => {
      const hourInMinutes =
        blockedTime.date.getHours() * 60 + blockedTime.date.getMinutes()

      return hourInMinutes === timeInMinutes
    })
  })
  return { possibleTimes, availableTimes }
}

// Get professional blocked dates
export async function getBlockedDates(
  userId: string,
  date: {
    year: number
    month: number
  },
) {
  let { year, month } = date

  month = month === 12 ? (month = 1) : month
  year = month === 12 ? year + 1 : year

  const { id: professionalId, serviceTimeInMinutes } =
    await prisma.professional.findFirst({
      where: {
        userId,
      },
      select: {
        id: true,
        serviceTimeInMinutes: true,
      },
    })

  const availableWeekDays = await prisma.schedule.findMany({
    where: {
      professionalId,
      enabled: true,
    },
    select: {
      weekDay: true,
      timeStartInMinutes: true,
      timeEndInMinutes: true,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.weekDay === weekDay,
    )
  })

  // Obtenha todos os agendamentos do perfil para o mês e ano especificados
  const appointments = await prisma.appointment.findMany({
    where: {
      professionalId,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lt: new Date(`${year}-${month + 1}-01`), // limite até o próximo mês
      },
      status: {
        name: {
          notIn: ['Canceled', 'No-show'],
        },
      },
    },
    select: {
      date: true,
    },
  })

  // Obtenha a disponibilidade de horários por dia da semana
  const schedules = await prisma.schedule.findMany({
    where: {
      professionalId,
      enabled: true,
    },
    select: {
      weekDay: true,
      timeStartInMinutes: true,
      timeEndInMinutes: true,
    },
  })

  // Processa os dados
  const blockedDatesRaw = appointments
    .map((appointment) => ({
      date: appointment.date.getDate(),
      weekDay: appointment.date.getDay(),
    }))
    .reduce(
      (acc, appointment) => {
        // Conta o número de agendamentos por dia
        acc[appointment.date] = (acc[appointment.date] || 0) + 1
        return acc
      },
      {} as Record<number, number>,
    )

  // Filtra os dias bloqueados
  const blockedDates = Object.entries(blockedDatesRaw)
    .map(([day, amount]) => {
      const weekDay = ((new Date(year, month - 1, +day).getDay() + 6) % 7) + 1 // Ajusta para o padrão `WEEKDAY`
      const schedule = schedules.find((s) => s.weekDay === weekDay)

      // Calcula o "size" como a duração em horas e compara com o "amount"
      const size = schedule
        ? (schedule.timeEndInMinutes - schedule.timeStartInMinutes) /
          serviceTimeInMinutes
        : 0
      return amount >= size ? +day : null
    })
    .filter((day) => day !== null)

  return { blockedWeekDays, blockedDates }
}
