'use client'

import { SelectInput } from '@/components/input/select'
import { TextInput } from '@/components/input/text'
import { getProfessional } from '@/services/professionalService'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DateInput } from '@/components/input/date'
import Image from 'next/image'
import { UserContext } from '@/contexts/UserContext'
import { createScheduling, getServiceType } from '@/services/schedulingService'
import { toast, ToastContainer } from 'react-toastify'
import toastDefaultValues from '@/utils/toast-default-values'
import SubmitButton from '@/components/button/submit'
import { SchedulingFormData } from '@/utils/validators'

interface ServiceTypeOptionsProps {
  id: string
  name: string
  slug: string
}

interface SelectedProfessionalProps {
  name: string
  email: string
  image: string
  address?: string
  phone?: string
  professional: {
    bio: string
    serviceValue: string
    tags?: string
    occupation: {
      name: string
    }
    reviews?: {
      user: {
        name: string
        image: string
      }
      createdAt: Date
      comment: string
      rating: string
    }[]
    serviceType: {
      id: string
      name: string
    }
  }
}

export default function FinishSchedule() {
  const { user } = useContext(UserContext)
  const params = useSearchParams()
  const router = useRouter()
  const { professional_id: professionalId } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedProfessional, setSelectedProfessional] =
    useState<SelectedProfessionalProps>()
  const [serviceTypeOptions, setServiceTypeOptions] =
    useState<ServiceTypeOptionsProps[]>()
  const [scheduling, setScheduling] = useState<SchedulingFormData>({
    userProfessionalId: professionalId,
    date: params.get('selected_date'),
    hour: Number(params.get('minutes')),
    serviceTypeSlug: '',
  })

  const fetchServiceType = useCallback(async () => {
    const response = await getServiceType()
    setServiceTypeOptions(response)
  }, [])

  const fetchData = useCallback(async () => {
    const professionalData = await getProfessional(String(professionalId))
    const typeOfService = professionalData.professional.serviceType

    if (typeOfService.name === 'Presencial e Online') {
      setServiceTypeOptions((prevState) =>
        prevState.filter((option) => option.id !== typeOfService.id),
      )
    } else {
      setServiceTypeOptions((prevState) =>
        prevState.filter((option) => option.id === typeOfService.id),
      )
    }

    setSelectedProfessional(professionalData)
  }, [professionalId])

  useEffect(() => {
    fetchServiceType()
    fetchData()
  }, [professionalId, fetchServiceType, fetchData])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setScheduling((prevState) => ({
      ...prevState,
      serviceTypeSlug: e.target.value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await createScheduling(user.id, scheduling)

    toast[response.type](response.message, toastDefaultValues)
    setIsLoading(false)

    if (response.type === 'success') {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push('./')
    }
  }

  if (!selectedProfessional) return null

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-background-100">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative h-28 w-28 overflow-hidden rounded-full">
          <Image
            src={selectedProfessional.image.replace('s96', 's500')}
            alt={selectedProfessional.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-center font-bold text-slate-400">
            {selectedProfessional.name}
          </p>
          <p className="text-center text-sm text-slate-400">
            {selectedProfessional.professional.occupation.name}
          </p>
        </div>
      </div>
      <div className="flex max-w-[1090px] flex-col gap-6 p-8">
        <div className="flex flex-col gap-8 rounded-md bg-background-200 p-8">
          <h2 className="text-2xl font-bold text-vibrant-green-100 xl:col-span-2">
            Solicitar agendamento
          </h2>
          <form
            id="schedulingForm"
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3"
          >
            <TextInput
              name="serviceValue"
              label="Valor"
              readOnly={true}
              value={selectedProfessional.professional.serviceValue || ''}
              disabled
            />
            <div className="flex w-full flex-col gap-2">
              <label>Data do agendamento</label>
              <DateInput
                name="selectedDate"
                onChange={() => handleChange}
                value={params.get('selected_date')}
                disabled={true}
              />
            </div>
            <TextInput
              label="Horário do agendamento"
              name="selectedHour"
              value={params.get('hour')}
              disabled={true}
            />
            <SelectInput
              label="Tipo de atendimento"
              name="serviceType"
              value={scheduling.serviceTypeSlug || ''}
              usingSlug={true}
              options={serviceTypeOptions}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => router.push('./')}
            className="hover: rounded-md border-2 border-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-background-300"
          >
            Cancelar
          </button>
          <SubmitButton
            form="schedulingForm"
            title="Solicitar agendamento"
            isLoading={isLoading}
          />
        </div>
      </div>
      <ToastContainer closeOnClick theme="dark" />
    </div>
  )
}
