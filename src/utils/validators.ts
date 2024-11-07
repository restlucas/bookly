export interface AbsenceFormData {
  userId: string
  absenceOptionId: string
  startTime: string
  endTime: string
}

export interface ScheduleFormData {
  serviceTime: string
  intervals: {
    id: string
    name?: string
    enabled: boolean
    weekDay: number
    timeStartInMinutes: number
    timeEndInMinutes: number
  }[]
}

export interface ProfessionalProfileData {
  bio: string
  occupationId: string
  categoryId: string
  serviceValue: string
  tags: string
  serviceTypeId: string
}

export interface AccountFormData {
  name: string
  image: string
  phone?: string
  birth?: string
  gender?: string
  address?: string
}

export interface SchedulingFormData {
  userProfessionalId: string | string[]
  date?: string
  hour: number
  serviceTypeSlug?: string | null
}

type Errors<T> = {
  [K in keyof T]?: string
}

// Validate schedule form data
export const validateScheduleForm = (
  data: ScheduleFormData,
): Errors<ScheduleFormData> => {
  const errors: Errors<ScheduleFormData> = {}

  if (!data.serviceTime) {
    errors.serviceTime = 'O tempo de atendimento deve ser informado.'
  }

  data.intervals.map((interval) => {
    interval.timeStartInMinutes > interval.timeEndInMinutes
      ? (errors.intervals =
          'O horário de início deve ser maior que o horário de fim.')
      : ''
  })

  return errors
}

// Validate absence form data
export const validateAbsenceForm = (
  data: AbsenceFormData,
): Errors<AbsenceFormData> => {
  const errors: Errors<AbsenceFormData> = {}

  if (!data.absenceOptionId) {
    errors.absenceOptionId = 'O motivo da ausência é obrigatório.'
  }

  if (!data.startTime) {
    errors.startTime = 'O período de início da ausência é obrigatório.'
  } else {
    const today = new Date().getTime()
    const startTimeDate = new Date(data.startTime).getTime()

    if (startTimeDate < today) {
      errors.startTime =
        'O período de início da ausência não pode estar no passado.'
    }
  }

  if (!data.endTime) {
    errors.endTime = 'O período de fim da ausência é obrigatório.'
  } else {
    const startTimeDate = new Date(data.startTime).getTime()
    const endTimeDate = new Date(data.endTime).getTime()

    if (endTimeDate < startTimeDate) {
      errors.startTime =
        'O período de fim da ausência não pode ser menor que o período de início.'
    }
  }

  return errors
}

// Validate professional profile form
export const validateProfessionalProfileForm = (
  data: ProfessionalProfileData,
): Errors<ProfessionalProfileData> => {
  const errors: Errors<ProfessionalProfileData> = {}

  if (!data.bio) {
    errors.bio = 'O campo bio deve ser preenchido.'
  }

  if (!data.categoryId) {
    errors.occupationId = 'O campo categoria deve ser selecionado.'
  }

  if (!data.occupationId) {
    errors.occupationId = 'O campo profissão deve ser selecionado.'
  }

  if (!data.occupationId) {
    errors.occupationId = 'O campo profissão deve ser selecionado.'
  }

  if (!data.serviceTypeId) {
    errors.serviceTypeId = 'O campo tipo de atendimento deve ser selecionado.'
  }

  if (!data.serviceValue) {
    errors.serviceValue = 'O campo valor do atendimento deve ser preenchido.'
  }

  return errors
}

// Validate account form
export const validateAccountForm = (
  data: AccountFormData,
): Errors<AccountFormData> => {
  const errors: Errors<AccountFormData> = {}

  if (!data.address) {
    errors.address = 'O campo endereço deve ser preenchido.'
  }

  if (!data.birth) {
    errors.birth = 'O campo data de nascimento deve ser preenchido.'
  }

  if (!data.gender) {
    errors.gender = 'O campo gênero deve ser preenchido.'
  }

  if (!data.phone) {
    errors.phone = 'O campo telefone deve ser preenchido.'
  }

  return errors
}
