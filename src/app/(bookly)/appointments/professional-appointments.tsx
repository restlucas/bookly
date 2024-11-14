'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  AppointmentsProps,
  AppointmentProps,
  SelectedAppointmentProps,
} from './page'
import { updateAppointmentStatus } from '@/services/appointmentService'
import toastDefaultValues from '@/utils/toast-default-values'
import { toast, ToastContainer } from 'react-toastify'
import { getAppointmentsByStatus } from '@/services/professionalService'
import { CommentsFormModal } from '@/components/modal/form/comments'
import dayjs from 'dayjs'
import { CheckSquare, Question, XSquare } from '@phosphor-icons/react'

export const steps = {
  'Pending approval': {
    options: [
      {
        name: 'approve',
        title: 'Approve',
        nextStep: 'In progress',
        element: (
          <CheckSquare
            className="cursor-pointer fill-vibrant-green-100 duration-150 hover:fill-vibrant-green-200"
            size={32}
            weight="fill"
          />
        ),
      },
      {
        name: 'repprove',
        title: 'Repprove',
        nextStep: 'Canceled',
        element: <XSquare className="fill-rose-400" size={32} weight="fill" />,
      },
    ],
  },
  'In progress': {
    options: [
      {
        name: 'conclude',
        title: 'Conclude',
        nextStep: 'Completed',
        element: (
          <CheckSquare
            className="cursor-pointer fill-vibrant-green-100 duration-150 hover:fill-vibrant-green-200"
            size={32}
            weight="fill"
          />
        ),
      },
      {
        name: 'cancel',
        title: 'Cancel',
        nextStep: 'Canceled',
        element: <XSquare className="fill-rose-400" size={32} weight="fill" />,
      },
      {
        name: 'not-show',
        title: 'No-show',
        nextStep: 'No-show',
        element: (
          <Question className="fill-orange-400" size={32} weight="fill" />
        ),
      },
    ],
  },
}

export function ProfessionalAppointments({ user, status }: AppointmentsProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedAppointment, setSelectedAppointment] =
    useState<SelectedAppointmentProps>()

  const [appointment, setAppointment] = useState<AppointmentProps[]>()
  const [isLoadingAppointment, setIsLoadingAppointment] = useState(true)

  // Handle filter in appointment table
  const handleSelectedFilter = async (itemId: string) => {
    if (selectedStatus !== itemId) {
      setIsLoadingAppointment(true)
      setSelectedStatus(itemId)
    }
  }

  const handleStatus = async (
    operation: { name: string; title: string; nextStep: string },
    appointmentId: string,
  ) => {
    const rsp = confirm(
      `Confirm new appointment status for: ${operation.title.toLowerCase()}?`,
    )

    if (rsp) {
      const response = await updateAppointmentStatus(operation, appointmentId)
      setIsLoadingAppointment(true)

      toast[response.type](response.message, toastDefaultValues)

      await new Promise((resolve) => setTimeout(resolve, 1000))
      fetchAppointment()
    }
  }

  const fetchAppointment = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await getAppointmentsByStatus(
      'professional', // userRole passed to prisma where conditional
      user.id,
      selectedStatus,
    )
    setAppointment(response)

    setIsLoadingAppointment(false)
  }, [selectedStatus, user.id])

  const showCommentModal = async (
    scheduleId: string,
    scheduleObservations: string,
  ) => {
    setSelectedAppointment({
      id: scheduleId,
      observations: scheduleObservations,
    })
    setShowModal(true)
  }

  useEffect(() => {
    if (user.role) fetchAppointment()
  }, [user, fetchAppointment])

  useEffect(() => {
    if (status.length !== 0) {
      setIsLoading(false)
      const selectedStatusId = status.find(
        (item) => item.name === 'Pending approval',
      )?.id

      setSelectedStatus(selectedStatusId)
    }
  }, [status])

  return (
    <>
      <div className="w-full rounded-md bg-background-200 p-8 shadow-md">
        <div>
          <div className="mb-8 flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-between">
            <h2 className="mb-4 text-2xl text-vibrant-green-100 lg:mb-0">
              My appointments (professional)
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
                      className={`${item.id === selectedStatus ? 'bg-background-300 text-vibrant-green-100' : 'bg-transparent text-white'} cursor-pointer rounded-b-md rounded-t-md p-4 text-xs uppercase md:rounded-b-none md:rounded-t-md`}
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
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Comments</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Actions</th>
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
                          key={index}
                          className={`${index === 4 ? '' : 'border-b'} border-background-300 hover:bg-background-300/50`}
                        >
                          <td className="px-6 py-4">
                            {`${String(dayjs(schedule.date).format('DD/MM/YYYY'))} ~ ${String(dayjs(schedule.date).hour()).padStart(2, '0')}:${String(dayjs(schedule.date).minute()).padEnd(2, '0')}`}
                          </td>
                          <td className="px-6 py-4">{schedule.user.name}</td>
                          <td className="px-6 py-4">{schedule.user.phone}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                showCommentModal(
                                  schedule.id,
                                  schedule.observations,
                                )
                              }
                              className={`flex cursor-pointer items-center justify-start gap-2 rounded-md border-[1px] border-slate-400 px-2 py-1 text-slate-400 duration-100 hover:bg-slate-300/20`}
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
                          <td className="flex items-center justify-start gap-1 px-6 py-4">
                            {steps[schedule.status.name] &&
                              steps[schedule.status.name].options.map(
                                (step, index) => {
                                  return (
                                    <button
                                      className="cursor-pointer"
                                      key={index}
                                      title={step.title}
                                      onClick={() =>
                                        handleStatus(
                                          {
                                            name: step.name,
                                            title: step.title,
                                            nextStep: step.nextStep,
                                          },
                                          schedule.id,
                                        )
                                      }
                                    >
                                      {step.element}
                                    </button>
                                  )
                                },
                              )}
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
      <ToastContainer closeOnClick theme="dark" />
      {showModal && (
        <CommentsFormModal
          selectedAppointment={selectedAppointment}
          setShowModal={setShowModal}
        />
      )}
    </>
  )
}
