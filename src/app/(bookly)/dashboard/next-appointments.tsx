'use client'

import { getNextAppointmentsByUser } from '@/services/appointmentService'
import {
  BuildingOffice,
  CalendarDots,
  CurrencyDollar,
  SmileySad,
} from '@phosphor-icons/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { SessionProps } from './page'
import Image from 'next/image'

interface AppointmentsProps {
  serviceType: {
    name: string
  }
  date: Date
  professional: {
    serviceValue: string
    user?: {
      name: string
      image: string
    }
    occupation?: {
      name: string
    }
  }
  user?: {
    name: string
    image: string
  }
}

export function NextAppointments({ user }: SessionProps) {
  const [nextProfessionalAppointments, setNextProfessionalAppointments] =
    useState<AppointmentsProps[]>([])
  const [nextPersonalAppointments, setNextPersonalAppointments] = useState<
    AppointmentsProps[]
  >([])

  useEffect(() => {
    const fetchNextAppointments = async () => {
      if (user) {
        const response = await getNextAppointmentsByUser(user.role, user.id)
        setNextProfessionalAppointments(response.professionalAppointments)
        setNextPersonalAppointments(response.personalAppointments)
      }
    }

    fetchNextAppointments()
  }, [user])
  return (
    <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-2">
      {user.role === 'professional' && (
        <div className="w-full rounded-md bg-background-200 p-8">
          <div className="mb-4 flex flex-col items-start justify-start gap-1">
            <h2 className="text-xl font-bold text-vibrant-green-100">
              Appointments in the next 2 weeks
            </h2>
            <span className="italic text-slate-400">(Professional)</span>
          </div>

          <ul className="flex flex-col">
            {nextProfessionalAppointments.length > 0 ? (
              nextProfessionalAppointments.map((appointment, index) => {
                return (
                  <li
                    key={index}
                    className={`${index === nextProfessionalAppointments.length - 1 ? 'border-b-transparent' : 'border-b-background-300'}duration group border-b-[1px] bg-transparent fill-slate-400 text-sm text-slate-300 hover:bg-slate-300/10 hover:fill-vibrant-green-200 hover:text-vibrant-green-200`}
                  >
                    <div className="grid grid-cols-2 items-center justify-center gap-4 px-3 py-5 lg:grid-cols-4 lg:gap-0">
                      <div className="flex items-center justify-start gap-4">
                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                          <Image
                            className="object-cover"
                            fill
                            alt={
                              appointment.user?.name ||
                              appointment.professional?.user.name
                            }
                            src={
                              appointment.user?.image.replace('s96', 's200') ||
                              appointment.professional?.user.image.replace(
                                's96',
                                's200',
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col">
                          <span>
                            {appointment.user?.name ||
                              appointment.professional.user.name}
                          </span>
                          <span className="text-xs">
                            {appointment.professional?.occupation?.name || ''}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-start gap-2">
                        <CalendarDots size={24} />
                        <div className="flex flex-col">
                          <span>
                            {dayjs(appointment.date).format('DD/MM/YYYY')}
                          </span>
                          <span>
                            {`${String(dayjs(appointment.date).hour()).padStart(2, '0')}:${String(dayjs(appointment.date).minute()).padEnd(2, '0')}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-start gap-2">
                        <BuildingOffice size={24} />
                        <span>{appointment.serviceType.name}</span>
                      </div>

                      <div className="flex items-center justify-start gap-2">
                        <CurrencyDollar size={24} />
                        <span>
                          {appointment.professional?.serviceValue || ''}
                        </span>
                      </div>
                    </div>
                  </li>
                )
              })
            ) : (
              <div className="flex w-full flex-col items-center justify-center gap-1 fill-slate-400 text-slate-400">
                <span>No appointments in progress</span>
                <SmileySad size={32} />
              </div>
            )}
          </ul>
        </div>
      )}

      <div className="w-full rounded-md bg-background-200 p-8">
        <div className="mb-4 flex flex-col items-start justify-start gap-1">
          <h2 className="text-xl font-bold text-vibrant-green-100">
            Appointments in the next 2 weeks
          </h2>
          {user.role === 'professional' && (
            <span className="italic text-slate-400">(Personal)</span>
          )}
        </div>

        <ul className="flex flex-col">
          {nextPersonalAppointments.length > 0 ? (
            nextPersonalAppointments.map((appointment, index) => {
              return (
                <li
                  key={index}
                  className={`${index === nextPersonalAppointments.length - 1 ? 'border-b-transparent' : 'border-b-background-300'} duration group border-b-[1px] bg-transparent fill-slate-400 text-sm text-slate-300 hover:bg-slate-300/10 hover:fill-vibrant-green-200 hover:text-vibrant-green-200`}
                >
                  <div className="grid grid-cols-2 items-center justify-center gap-4 px-3 py-5 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-2">
                    <div className="flex items-center justify-start gap-4">
                      <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                        <Image
                          className="object-cover"
                          fill
                          alt={
                            appointment.user?.name ||
                            appointment.professional?.user.name
                          }
                          src={
                            appointment.user?.image.replace('s96', 's200') ||
                            appointment.professional?.user.image.replace(
                              's96',
                              's200',
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {appointment.user?.name ||
                            appointment.professional.user.name}
                        </span>
                        <span className="text-xs">
                          {appointment.professional?.occupation?.name || ''}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-start gap-2">
                      <CalendarDots size={24} />
                      <div className="flex flex-col">
                        <span>
                          {dayjs(appointment.date).format('DD/MM/YYYY')}
                        </span>
                        <span>
                          {`${String(dayjs(appointment.date).hour()).padStart(2, '0')}:${String(dayjs(appointment.date).minute()).padEnd(2, '0')}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-start gap-2">
                      <BuildingOffice size={24} />
                      <span>{appointment.serviceType.name}</span>
                    </div>

                    <div className="flex items-center justify-start gap-2">
                      <CurrencyDollar size={24} />
                      <span>
                        {appointment.professional?.serviceValue || ''}
                      </span>
                    </div>
                  </div>
                </li>
              )
            })
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-1 fill-slate-400 text-slate-400">
              <span>No appointments in progress</span>
              <SmileySad size={32} />
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}
