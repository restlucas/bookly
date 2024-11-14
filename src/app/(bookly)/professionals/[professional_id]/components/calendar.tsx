'use client'

import {
  getAvailability,
  getBlockedDates,
} from '@/services/professionalService'
import { getWeekDays } from '@/utils/get-week-days'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

interface CalendarDay {
  date: dayjs.Dayjs
  disabled: boolean
}

interface CalendarWeek {
  week: number
  days: CalendarDay[]
}
type CalendarWeeks = CalendarWeek[]

interface Availability {
  possibleTimes: { time_formatted: string; time_in_minutes: number }[]
  availableTimes: { time_formatted: string; time_in_minutes: number }[]
}

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

interface CalendarProps {
  professionalId: string
}

export interface AppointmentDateProps {
  date: string
  hour: {
    time_formatted: string
    time_in_minutes: number
  }
}

export function Calendar({ professionalId }: CalendarProps) {
  const shortWeekDays = getWeekDays({ short: true })

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentDate, setCurrentDate] = useState(dayjs().startOf('month'))
  const [availability, setAvailability] = useState<Availability | null>(null)
  const [blockedDates, setBlockedDates] = useState<BlockedDates>()

  const isDateSelected = Boolean(selectedDate)
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : ''
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : ''
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) return []

    const daysInMonth = Array.from(
      { length: currentDate.daysInMonth() },
      (_, i) => currentDate.set('date', i + 1),
    )
    const previousDays = Array.from({ length: currentDate.day() }, (_, i) =>
      currentDate.subtract(i + 1, 'day'),
    ).reverse()
    const lastDay = currentDate.endOf('month')
    const nextDays = Array.from({ length: 6 - lastDay.day() }, (_, i) =>
      lastDay.add(i + 1, 'day'),
    )

    const allDays = [...previousDays, ...daysInMonth, ...nextDays]
    const calendarDays = allDays.map((date) => ({
      date,
      disabled:
        date.isBefore(dayjs(), 'day') ||
        blockedDates.blockedWeekDays.includes(date.day()) ||
        blockedDates.blockedDates.includes(date.date()),
    }))

    return calendarDays.reduce<CalendarWeeks>((weeks, day, i) => {
      const isNewWeek = i % 7 === 0
      if (isNewWeek)
        weeks.push({ week: i / 7 + 1, days: calendarDays.slice(i, i + 7) })
      return weeks
    }, [])
  }, [currentDate, blockedDates])

  const [appointmentDate, setAppointmentDate] = useState<AppointmentDateProps>({
    date: '',
    hour: {
      time_formatted: '',
      time_in_minutes: 0,
    },
  })

  const handleDateNavigation = (direction: 'previous' | 'next') => {
    setCurrentDate(
      currentDate[direction === 'previous' ? 'subtract' : 'add'](1, 'month'),
    )
  }

  useEffect(() => {
    const fetchAvailability = async () => {
      if (selectedDate) {
        const response = await getAvailability(
          String(professionalId),
          dayjs(selectedDate).format('YYYY-MM-DD'),
        )

        setAvailability(response)
      }
    }

    fetchAvailability()
  }, [selectedDate, professionalId])

  useEffect(() => {
    const fetchBlockedDates = async () => {
      const response = await getBlockedDates(String(professionalId), {
        year: currentDate.year(),
        month: currentDate.month() + 1,
      })
      setBlockedDates(response)
    }
    fetchBlockedDates()
  }, [currentDate, professionalId])

  return (
    <div className="grid grid-cols-[70%_30%] gap-4">
      {/* Calendar */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">
            {currentMonth} <span className="text-slate-400">{currentYear}</span>
          </h4>
          <div className="flex gap-2 text-slate-400">
            <button
              onClick={() => handleDateNavigation('previous')}
              className="cursor-pointer rounded-sm border-none bg-none leading-[0] hover:text-slate-100 focus:shadow-md"
            >
              <CaretLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDateNavigation('next')}
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
                          className={`aspect-square w-full cursor-pointer rounded-sm text-center text-sm ${disabled ? 'disabled:text-slate-700' : 'hover:bg-background-300/60'}`}
                        >
                          {date.get('date')}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Schedules */}
      <div
        className={`border-l-[1px] border-background-300 ${!isDateSelected ? 'flex items-center justify-center' : 'pl-6'}`}
      >
        {!isDateSelected ? (
          <h4 className="w-4/5 text-center text-sm text-slate-400/90">
            Select a date to see available times 😊
          </h4>
        ) : (
          <div className="flex h-full flex-col">
            <h4 className="mb-4 text-sm">
              {weekDay}, <br />{' '}
              <span className="text-vibrant-green-100">{describedDate}</span>
            </h4>

            <div className="relative flex-1">
              <div className="absolute bottom-0 right-0 top-0 flex w-full flex-col gap-2 overflow-y-scroll [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vibrant-green-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-background-200 [&::-webkit-scrollbar]:w-1">
                {availability &&
                  availability.availableTimes.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          setAppointmentDate({
                            date: dayjs(selectedDate).format('YYYY-MM-DD'),
                            hour: item,
                          })
                        }
                        className={`${appointmentDate.date === dayjs(selectedDate).format('YYYY-MM-DD') && appointmentDate.hour.time_in_minutes === item.time_in_minutes ? 'border-2 border-vibrant-green-100' : ''} cursor-pointer rounded-sm border-2 border-transparent bg-background-300 py-1 hover:bg-background-300/60`}
                      >
                        {item.time_formatted}
                      </button>
                    )
                  })}
              </div>
            </div>
          </div>
        )}
      </div>

      <Link
        href={`${professionalId}/request-schedule?selected_date=${appointmentDate.date}&hour=${appointmentDate.hour.time_formatted}&minutes=${appointmentDate.hour.time_in_minutes}`}
        className="w-full cursor-pointer rounded-md bg-vibrant-green-100 p-4 text-center duration-150 hover:bg-vibrant-green-200"
      >
        Request appointment
      </Link>
    </div>
  )
}
