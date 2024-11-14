'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  AppointmentsProps,
  AppointmentProps,
  SelectedAppointmentProps,
} from './page'
import { getAppointmentsByStatus } from '@/services/professionalService'
import dayjs from 'dayjs'
import { CommentsFormModal } from '@/components/modal/form/comments'

export function PersonalAppointments({ user, status }: AppointmentsProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedAppointment, setSelectedAppointment] =
    useState<SelectedAppointmentProps>()

  const [appointment, setAppointment] = useState<AppointmentProps[]>([])
  const [isLoadingAppointment, setIsLoadingAppointment] =
    useState<boolean>(true)

  // Handle filter in appointment table
  const handleSelectedFilter = async (itemId: string) => {
    if (selectedStatus !== itemId) {
      setIsLoadingAppointment(true)
      setSelectedStatus(itemId)
    }
  }

  const fetchAppointment = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await getAppointmentsByStatus(
      'personal',
      user.id,
      selectedStatus,
    )
    setAppointment(response)

    setIsLoadingAppointment(false)
  }, [selectedStatus, user.id])

  useEffect(() => {
    if (user.role) fetchAppointment()
  }, [user, fetchAppointment])

  useEffect(() => {
    if (status.length !== 0) {
      setIsLoading(false)
      const selectedStatusId = status.find(
        (item) => item.name === 'Aguardando aprovação',
      )?.id

      setSelectedStatus(selectedStatusId)
    }
  }, [status])

  return (
    <>
      <div className="w-full rounded-md bg-background-200 p-8 shadow-md">
        <div>
          <div className="mb-8 flex w-full items-center justify-start">
            <h2 className="text-2xl text-vibrant-green-100">
              My appointments {user.role === 'professional' && '(personal)'}
            </h2>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-start overflow-x-scroll lg:mb-0 lg:overflow-hidden">
              {isLoading ? (
                <div className="w-44 animate-pulse rounded-md bg-background-300 py-6 md:rounded-b-none md:rounded-tl-md md:rounded-tr-md" />
              ) : (
                status.map((item) => {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectedFilter(item.id)}
                      className={`${item.id === selectedStatus ? 'bg-background-300 text-vibrant-green-100' : 'bg-transparent text-white'} cursor-pointer rounded-b-md rounded-t-md p-4 text-xs uppercase md:rounded-b-none md:rounded-t-md lg:p-4`}
                    >
                      {item.name}
                    </button>
                  )
                })
              )}
            </div>

            <div className="w-full overflow-x-scroll lg:overflow-hidden">
              <table className="font-regular w-full text-left text-sm shadow-md rtl:text-right">
                <thead className="bg-background-300 text-xs uppercase">
                  <tr className="">
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Professional</th>
                    <th className="px-6 py-3">Occupation</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Comments</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingAppointment ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center">
                        Fetching appointments...
                      </td>
                    </tr>
                  ) : appointment.length > 0 ? (
                    appointment.map((schedule, index) => {
                      return (
                        <tr
                          key={schedule.id}
                          className={`${index === 4 ? '' : 'border-b'} border-background-300 hover:bg-background-300/50`}
                        >
                          <td className="px-6 py-4">
                            {`${String(dayjs(schedule.date).format('MM/DD/YYYY'))} ~ ${String(dayjs(schedule.date).hour()).padStart(2, '0')}:${String(dayjs(schedule.date).minute()).padEnd(2, '0')}`}
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.user.name}
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.occupation.name}
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.user.phone}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              onClick={() => setSelectedAppointment(schedule)}
                              className="flex cursor-pointer items-center justify-start gap-2 rounded-md border-[1px] border-slate-400 px-2 py-1 text-slate-400 duration-100 hover:bg-slate-300/20"
                            >
                              <span>View comment</span>
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.serviceValue}
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.serviceType.name}
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-6 text-center">
                        No appointments found :(
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <CommentsFormModal
          selectedAppointment={selectedAppointment}
          setShowModal={setShowModal}
        />
      )}
    </>
  )
}
