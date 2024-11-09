'use client'

import SubmitButton from '@/components/button/submit'
import { TextInput } from '@/components/input/text'
import { getSchedule, updateSchedule } from '@/services/professionalService'
import { getWeekDays } from '@/utils/get-week-days'
import toastDefaultValues from '@/utils/toast-default-values'
import { ScheduleFormData, validateScheduleForm } from '@/utils/validators'
import { useCallback, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { UserProps } from './page'

interface Interval {
  id: string
  timeStartInMinutes: number
  timeEndInMinutes: number
  enabled: boolean
  weekDay: number
}

export function ScheduleForm({ user }: { user: UserProps }) {
  const weekDays = getWeekDays({ short: false })
  const [scheduleForm, setScheduleForm] = useState<ScheduleFormData>()
  const [isLoading, setIsLoading] = useState(false)

  const formatTime = (totalMinutes: number) => {
    const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
    const minutes = String(totalMinutes % 60).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const getProfessionalSchedule = useCallback(
    async (userId: string) => {
      const response = await getSchedule(userId)

      response.intervals = weekDays.map((weekDayName, index) => ({
        ...response.intervals[index],
        name: weekDayName,
      }))

      setScheduleForm(response)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  function handleChange(
    intervalId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value, checked } = event.target

    setScheduleForm((prevState: ScheduleFormData) => {
      const updateInterval = (updateFn: (interval: Interval) => Interval) =>
        prevState.intervals.map((interval) =>
          interval.id === intervalId ? updateFn(interval) : interval,
        )

      const actions: Record<string, () => ScheduleFormData> = {
        timeStartInMinutes: () => ({
          ...prevState,
          intervals: updateInterval((interval) => ({
            ...interval,
            timeStartInMinutes:
              parseInt(value.split(':')[0], 10) * 60 +
              parseInt(value.split(':')[1], 10),
          })),
        }),
        timeEndInMinutes: () => ({
          ...prevState,
          intervals: updateInterval((interval) => ({
            ...interval,
            timeEndInMinutes:
              parseInt(value.split(':')[0], 10) * 60 +
              parseInt(value.split(':')[1], 10),
          })),
        }),
        enabled: () => ({
          ...prevState,
          intervals: updateInterval((interval) => ({
            ...interval,
            enabled: checked,
          })),
        }),
        default: () => ({ ...prevState, serviceTime: value }),
      }

      return actions[name] ? actions[name]() : prevState
    })
  }

  async function handleSubmitSchedule(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formattedSchedule = {
      ...scheduleForm,
      intervals: scheduleForm.intervals.map(({ name, ...rest }) => {
        console.log(name)
        return rest
      }), // Desestruturando para remover 'name'
    }

    const validationErrors = validateScheduleForm(formattedSchedule)

    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach((error) => {
        toast.error(error, toastDefaultValues)
      })
    } else {
      setIsLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await updateSchedule(user.id, formattedSchedule)

      toast[response.type](response.message, toastDefaultValues)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user.id) {
      getProfessionalSchedule(user.id)
    }
  }, [user, getProfessionalSchedule])

  return (
    <div>
      <div>
        {scheduleForm ? (
          <form
            id="scheduleForm"
            onSubmit={handleSubmitSchedule}
            className="grid grid-cols-1 gap-8 rounded-md bg-background-200 p-8 shadow-md lg:grid-cols-2"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-vibrant-green-100 lg:col-span-full">
                Dias de trabalho
              </h3>
              <div className="flex flex-col rounded-md border-[1px] border-slate-700">
                {scheduleForm.intervals.map((interval, index) => {
                  return (
                    <div
                      key={index}
                      className={`${index !== 6 ? 'border-b-[1px] border-slate-700' : ''} flex items-center justify-between gap-2 px-4 py-3`}
                    >
                      <div className="flex flex-1 items-center justify-start gap-2">
                        <input
                          type="checkbox"
                          name="enabled"
                          className="h-5 w-5 cursor-pointer rounded"
                          checked={interval.enabled}
                          onChange={(e) => handleChange(interval.id, e)}
                        />

                        <label
                          className={`${interval.enabled ? '' : 'text-slate-500 line-through'}`}
                        >
                          {interval.name}
                        </label>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <input
                          className={`${interval.enabled ? 'cursor-pointer' : 'cursor-not-allowed text-slate-500 line-through'} rounded-md border-0 bg-background-300 p-2 text-sm [&::-webkit-calendar-picker-indicator]:brightness-50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:filter`}
                          type="time"
                          name="timeStartInMinutes"
                          step={600}
                          value={formatTime(interval.timeStartInMinutes)}
                          maxLength={5}
                          disabled={!interval.enabled}
                          onChange={(e) => handleChange(interval.id, e)}
                        />
                        <input
                          className={`${interval.enabled ? 'cursor-pointer' : 'cursor-not-allowed text-slate-500 line-through'} rounded-md border-0 bg-background-300 p-2 text-sm [&::-webkit-calendar-picker-indicator]:brightness-[0.3] [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:filter`}
                          type="time"
                          name="timeEndInMinutes"
                          value={formatTime(interval.timeEndInMinutes)}
                          maxLength={5}
                          disabled={!interval.enabled}
                          onChange={(e) => handleChange(interval.id, e)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-vibrant-green-100 lg:col-span-full">
                Tempo médio cada atendimento
              </h3>
              <div className="w-1/2">
                <TextInput
                  label="Em minutos"
                  name="serviceTime"
                  value={scheduleForm.serviceTime}
                  required
                  onChange={(e) => handleChange('', e)}
                />
              </div>
            </div>
            <div className="col-span-full flex items-center justify-end">
              <SubmitButton
                title="Salvar programação"
                isLoading={isLoading}
                form="scheduleForm"
              />
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-8 rounded-md bg-background-200 p-8 shadow-md lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-vibrant-green-100 lg:col-span-full">
                Dias de trabalho
              </h3>
              <div className="flex animate-pulse flex-col rounded-md border-[1px] border-slate-700">
                {Array.from({ length: 6 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={`${index !== 6 ? 'border-b-[1px] border-slate-700' : ''} flex h-[65px] items-center justify-between gap-2 px-4 py-3`}
                    >
                      <div className="flex flex-1 items-center justify-start gap-2">
                        <div className="h-5 w-5 rounded" />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="p-2" />
                        <div className="p-2" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-vibrant-green-100 lg:col-span-full">
                Tempo médio cada atendimento
              </h3>
              <div className="w-1/2">
                <div className="h-[44px] animate-pulse rounded-md border-2 border-slate-700 bg-background-300 p-2 disabled:text-slate-400">
                  {' '}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer closeOnClick theme="dark" />
    </div>
  )
}
