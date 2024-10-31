"use client";

import dayjs from "dayjs";
import { SelectInput } from "@/components/input/select";
import { TextInput } from "@/components/input/text";
import {
  getAvailability,
  getBlockedDates,
  getProfessional,
} from "@/services/professionalService";
import { serviceType } from "@/utils/common-data";
import { getWeekDays } from "@/utils/get-week-days";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface CalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs;
    disabled: boolean;
  }>;
}
type CalendarWeeks = CalendarWeek[];

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelected: (date: Date) => void;
}

interface Availability {
  possibleTimes: {
    time_formatted: string;
    time_in_minutes: number;
  }[];
  availableTimes: {
    time_formatted: string;
    time_in_minutes: number;
  }[];
}

export default function FinishSchedule() {
  const { professional_id: professionalId } = useParams();
  const shortWeekDays = getWeekDays({ short: true });
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isDateSelected = !!selectedDate;

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const describedDate = selectedDate
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });
  const currentMonth = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  const [professional, setProfessional] = useState<any>();
  const [availability, setAvailability] = useState<Availability | null>();

  const [blockedDates, setBlockedDates] = useState<any>();

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return [];
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set("date", i + 1);
    });

    const firstWeekDay = currentDate.get("day");

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, "day");
      })
      .reverse();

    const lastDayInCurrentMonth = currentDate.set(
      "date",
      currentDate.daysInMonth(),
    );

    const lastWeekDay = lastDayInCurrentMonth.get("day");

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, "day");
    });

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true };
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf("day").isBefore(new Date()) ||
            blockedDates.blockedWeekDays.includes(date.get("day")),
          // blockedDates.blockedDates.includes(date.get("date")),
        };
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true };
      }),
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0;
        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          });
        }
        return weeks;
      },
      [],
    );
    return calendarWeeks;
  }, [currentDate, blockedDates]);

  useEffect(() => {
    fetchProfessional(professionalId);
    fetchBlockedDates(String(professionalId));
  }, [professionalId]);

  useEffect(() => {
    if (selectedDate) {
      getDateAvailability(
        professionalId,
        dayjs(selectedDate).format("YYYY-MM-DD"),
      );
    }
  }, [selectedDate]);

  function handleCurrentDate(direction: string) {
    const month =
      direction === "previous"
        ? currentDate.subtract(1, "month")
        : currentDate.add(1, "month");

    setCurrentDate(month);
  }

  async function fetchProfessional(professionalId: any) {
    const response = await getProfessional(professionalId);
    setProfessional(response);
  }

  async function fetchBlockedDates(professionalId: string) {
    const response = await getBlockedDates(String(professionalId), {
      year: currentDate.get("year"),
      month: currentDate.get("month") + 1,
    });

    console.log(response);
    setBlockedDates(response);
  }

  async function getDateAvailability(
    professionalId: any,
    selectedDate: string,
  ) {
    const response = await getAvailability(professionalId, selectedDate);
    setAvailability(response);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {}

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-background-100">
      <div className="flex max-w-[1090px] flex-col gap-6">
        <div className="grid grid-cols-[40%_1fr] gap-8 rounded-md bg-background-200 p-8">
          <h2 className="col-span-2 text-2xl font-bold text-vibrant-green-100">
            Realizar agendamento
          </h2>
          <div className="flex flex-col gap-3">
            {professional && (
              <>
                <TextInput
                  name="serviceProfessionalName"
                  label="Profissional"
                  readOnly={true}
                  value={professional.name || ""}
                  disabled
                />
                <TextInput
                  name="serviceValue"
                  label="Valor"
                  readOnly={true}
                  value={professional.profile.serviceValue || ""}
                  disabled
                />
              </>
            )}
            <SelectInput
              label="Tipo de atendimento"
              name="serviceType"
              value=""
              options={serviceType}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-[70%_30%] gap-4">
            {/* Calendar */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">
                  {currentMonth}{" "}
                  <span className="text-slate-400">{currentYear}</span>
                </h4>
                <div className="flex gap-2 text-slate-400">
                  <button
                    onClick={() => handleCurrentDate("previous")}
                    className="cursor-pointer rounded-sm border-none bg-none leading-[0] hover:text-slate-100 focus:shadow-md"
                  >
                    <CaretLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleCurrentDate("next")}
                    className="cursor-pointer rounded-sm border-none bg-none leading-[0] hover:text-slate-100 focus:shadow-md"
                  >
                    <CaretRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <table className="w-full table-fixed border-spacing-1">
                <thead>
                  <tr>
                    {shortWeekDays.map((weekDay) => (
                      <th className="text-xs" key={weekDay}>
                        {weekDay}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="before:block before:leading-3 before:text-transparent before:content-['.']">
                  {calendarWeeks.map(({ week, days }) => {
                    return (
                      <tr key={week} className="box-border">
                        {days.map(({ date, disabled }) => {
                          return (
                            <td key={date.toString()} className="box-border">
                              <button
                                onClick={() => setSelectedDate(date.toDate())}
                                disabled={disabled}
                                className={`aspect-square w-full cursor-pointer rounded-sm text-center text-sm ${disabled ? "disabled:text-slate-700" : "hover:bg-background-300/60"}`}
                              >
                                {date.get("date")}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Schedules */}
            <div
              className={`border-l-[1px] border-background-300 ${!isDateSelected ? "flex items-center justify-center" : "pl-6"}`}
            >
              {!isDateSelected ? (
                <h4 className="w-4/5 text-center text-sm text-slate-400/90">
                  Selecione uma data para ver os horários disponíveis 😊
                </h4>
              ) : (
                <div className="flex h-full flex-col">
                  <h4 className="mb-4 text-sm">
                    {weekDay}, <br />{" "}
                    <span className="text-vibrant-green-100">
                      {describedDate}
                    </span>
                  </h4>

                  <div className="relative flex-1">
                    <div className="absolute bottom-0 right-0 top-0 flex w-full flex-col gap-2 overflow-y-scroll [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vibrant-green-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-background-200 [&::-webkit-scrollbar]:w-1">
                      {availability &&
                        availability.availableTimes.map((item, index) => {
                          return (
                            <button
                              key={index}
                              className="cursor-pointer rounded-sm bg-background-300 py-1 hover:bg-background-300/60"
                            >
                              {item.time_formatted}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => router.push("./")}
            className="hover: rounded-md border-2 border-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-background-300"
          >
            Cancelar
          </button>
          <button className="hover: rounded-md bg-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-vibrant-green-200">
            Solicitar agendamento
          </button>
        </div>
      </div>
    </div>
  );
}
