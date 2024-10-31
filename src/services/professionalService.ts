"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";

// Get all professionals
export async function getProfessionals() {
  const session = await getServerSession(authOptions);

  return await prisma.user.findMany({
    where: {
      role: "professional",
      NOT: {
        id: session.user.id,
      },
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
export async function updateProfessionalProfile(userId: string, data: any) {
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

// Get professional schedule by status
export async function getSchedulingByStatus(
  userRole: string,
  userId: string,
  statusId: string,
) {
  const type = userRole === "professional" ? "profileId" : "userId";

  const response = await prisma.scheduling.findMany({
    where: {
      [type]: userId,
      statusId,
    },
    select: {
      id: true,
      date: true,
      observations: true,
      profile: {
        select: {
          profession: {
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
          serviceType: true,
          serviceValue: true,
        },
      },
      user: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
  });

  return response;
}

// Get professional schedule
export async function getSchedule(userId: string) {
  const userProfile = await prisma.profile.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
      serviceTimeInMinutes: true,
    },
  });

  let profileSchedule = await prisma.schedule.findMany({
    where: {
      profileId: userProfile.id,
    },
    orderBy: [
      {
        weekDay: "asc",
      },
    ],
    select: {
      id: true,
      weekDay: true,
      enabled: true,
      timeStartInMinutes: true,
      timeEndInMinutes: true,
    },
  });

  const response = {
    intervals: profileSchedule,
    serviceTime: userProfile.serviceTimeInMinutes,
  };

  return response;
}

// Update professional schedule
export async function updateSchedule(userId: string, data: any) {
  let { serviceTimeInMinutes, intervals: intervalsArray } = data;

  const update_service_time_in_minutes = await prisma.profile.update({
    where: {
      userId,
    },
    data: {
      serviceTimeInMinutes,
    },
  });

  const intervals = intervalsArray.map(({ name, ...rest }) => rest);

  const { id: profileId } = await prisma.profile.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  const responses = await Promise.all(
    intervals.map(async (data, index) => {
      try {
        const updatedSchedule = await prisma.schedule.update({
          where: {
            profileId,
            id: data.id,
          },
          data,
        });
        return {
          success: true,
          message: "Schedule updated successfully",
          updatedSchedule,
        };
      } catch (error) {
        return {
          success: false,
          message: `Error updating schedule with ID ${data.id}: ${error.message}`,
        };
      }
    }),
  );

  const successMessages = responses
    .filter((response) => response.success)
    .map((response) => response.message);
  const errorMessages = responses
    .filter((response) => !response.success)
    .map((response) => response.message);

  // Retornando as mensagens de sucesso e erro
  return {
    success: successMessages.length > 0,
    messages: {
      success: successMessages,
      error: errorMessages,
    },
  };
}

// Get professional availability
export async function getAvailability(professionalId: string, date: any) {
  console.log(date);
  const referenceDate = dayjs(String(date));
  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  const { id: profileId, serviceTimeInMinutes } =
    await prisma.profile.findFirst({
      where: {
        userId: professionalId,
      },
      select: {
        id: true,
        serviceTimeInMinutes: true,
      },
    });

  if (isPastDate) {
    return { possibleTimes: [], availableTimes: [] };
  }

  const professionalAvailability = await prisma.schedule.findFirst({
    where: {
      profileId,
      weekDay: referenceDate.get("day"),
    },
  });

  if (!professionalAvailability) {
    return { possibleTimes: [], availableTimes: [] };
  }

  const { timeStartInMinutes, timeEndInMinutes } = professionalAvailability;

  let currentTime = timeStartInMinutes;
  const possibleTimes = [];

  while (currentTime < timeEndInMinutes) {
    const hours = Math.floor(currentTime / 60);
    const minutes = currentTime % 60;
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    possibleTimes.push({
      time_formatted: timeString,
      time_in_minutes: currentTime,
    });
    currentTime += serviceTimeInMinutes;
  }

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      profileId,
      date: {
        gte: referenceDate.set("hour", timeStartInMinutes / 60).toDate(),
        lte: referenceDate.set("hour", timeEndInMinutes / 60).toDate(),
      },
    },
  });

  const availableTimes = possibleTimes.filter(({ time_in_minutes }) => {
    return !blockedTimes.some((blockedTime) => {
      const hourInMinutes =
        blockedTime.date.getHours() * 60 + blockedTime.date.getMinutes();

      return hourInMinutes === time_in_minutes;
    });
  });
  return { possibleTimes, availableTimes };
}

// Get professional blocked dates
export async function getBlockedDates(professionalId: string, date: any) {
  const { year, month } = date;

  const { id: profileId } = await prisma.profile.findFirst({
    where: {
      userId: professionalId,
    },
    select: {
      id: true,
    },
  });

  const availableWeekDays = await prisma.schedule.findMany({
    where: {
      profileId,
      enabled: true,
    },
    select: {
      weekDay: true,
    },
  });

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.weekDay === weekDay,
    );
  });

  // const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
  //   SELECT
  //     EXTRACT(DAY FROM S.DATE) AS date,
  //     COUNT(S.date) AS amount,
  //     ((UTI.timeEndInMinutes - UTI.timeStartInMinutes) / 60) AS size
  //   FROM scheduling S
  //   LEFT JOIN schedule UTI
  //     ON UTI.weekDay = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))
  //   WHERE S.profileId = ${profileId}
  //     AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
  //   GROUP BY EXTRACT(DAY FROM S.DATE),
  //     ((UTI.timeEndInMinutes - UTI.timeStartInMinutes) / 60)
  //   HAVING amount >= size
  // `;

  // const blockedDates = blockedDatesRaw.map((item) => item.date);

  return { blockedWeekDays };
}
