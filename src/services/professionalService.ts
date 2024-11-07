'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { getServerSession } from 'next-auth'

interface ServiceResponse<T> {
  type: 'success' | 'error'
  data?: T
  message?: string
}

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
      },
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

// Get professional profile
export async function getProfessionalProfile(id: string) {
  const response = await prisma.professional.findUnique({
    where: { userId: id },
    select: {
      bio: true,
      categoryId: true,
      occupationId: true,
      serviceType: true,
      serviceValue: true,
      tags: true,
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
    const updatedProfile = await prisma.professional.update({
      where: { userId },
      data,
    })

    return {
      type: 'success',
      message: 'Perfil atualizado com sucesso!',
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
export async function getSchedulingByStatus(
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

    ;(type = 'professionalId'), (userId = professionalId)
  }

  const response = await prisma.scheduling.findMany({
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
): Promise<ServiceResponse<any>> {
  try {
    const { serviceTime, intervals: intervalsArray } = data

    const update_service_time_in_minutes = await prisma.professional.update({
      where: {
        userId,
      },
      data: {
        serviceTimeInMinutes: Number(serviceTime),
      },
    })

    const intervals = intervalsArray.map(({ name, ...rest }) => rest)

    const { id: professionalId } = await prisma.professional.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    })

    const responses = await Promise.all(
      intervals.map(async (data, index) => {
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
      message: 'Programação salva com sucesso!',
      data: responses,
    }
  } catch (error: any) {
    console.error('Erro ao atualizar programação:', error)

    return {
      type: 'error',
      message: 'Erro ao atualizar programação',
    }
  }
}

// Get professional availability
export async function getAvailability(userId: string, date: any) {
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

  const blockedTimes = await prisma.scheduling.findMany({
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
          notIn: ['Cancelado', 'Não compareceu'],
        },
      },
    },
  })

  const availableTimes = possibleTimes.filter(({ time_in_minutes }) => {
    return !blockedTimes.some((blockedTime) => {
      const hourInMinutes =
        blockedTime.date.getHours() * 60 + blockedTime.date.getMinutes()

      return hourInMinutes === time_in_minutes
    })
  })
  return { possibleTimes, availableTimes }
}

// Get professional blocked dates
export async function getBlockedDates(userId: string, date: any) {
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
  const schedulings = await prisma.scheduling.findMany({
    where: {
      professionalId,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lt: new Date(`${year}-${month + 1}-01`), // limite até o próximo mês
      },
      status: {
        name: {
          notIn: ['Cancelado', 'Não compareceu'],
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
  const blockedDatesRaw = schedulings
    .map((scheduling) => ({
      date: scheduling.date.getDate(),
      weekDay: scheduling.date.getDay(),
    }))
    .reduce(
      (acc, scheduling) => {
        // Conta o número de agendamentos por dia
        acc[scheduling.date] = (acc[scheduling.date] || 0) + 1
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
