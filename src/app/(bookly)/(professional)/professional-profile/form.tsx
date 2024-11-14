'use client'

import { SelectInput } from '@/components/input/select'
import { TextInput } from '@/components/input/text'
import { TextAreaInput } from '@/components/input/textarea'
import {
  getProfessionalProfile,
  updateProfessionalProfile,
} from '@/services/professionalService'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  getAllCategories,
  getOccupationByCategory,
} from '@/services/professionService'
import toastDefaultValues from '@/utils/toast-default-values'
import { toast, ToastContainer } from 'react-toastify'
import SubmitButton from '@/components/button/submit'
import { SealWarning, X } from '@phosphor-icons/react'
import { getServiceType } from '@/services/appointmentService'
import {
  ProfessionalProfileData,
  validateProfessionalProfileForm,
} from '@/utils/validators'
import { formatCurrency } from '@/utils/format-functions'
import { SessionProps } from '../../dashboard/page'

interface CategoriesProps {
  id: string
  createdAt?: Date
  name: string
  slug: string
}

interface OccupationProps {
  id: string
  createdAt?: Date
  name: string
  slug: string
}

interface ServiceTypesProps {
  id: string
  name: string
  slug: string
}

export function ProfessionalProfileForm({ user }: SessionProps) {
  const [tagInput, setTagInput] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [categories, setCategories] = useState<CategoriesProps[]>()
  const [occupations, setOccupations] = useState<OccupationProps[]>()
  const [serviceTypes, setServiceTypes] = useState<ServiceTypesProps[]>()

  const [professionalProfile, setProfessionalProfile] =
    useState<ProfessionalProfileData>({
      bio: '',
      occupationId: '',
      categoryId: '',
      serviceValue: '',
      tags: '',
      serviceTypeId: '',
    })

  // Professional profile fetch
  const fetchProfessionalProfile = useCallback(async () => {
    const professionalProfile = await getProfessionalProfile(user.id)

    setProfessionalProfile({
      bio: professionalProfile.bio,
      occupationId: professionalProfile.occupationId,
      categoryId: professionalProfile.categoryId,
      serviceTypeId: professionalProfile.serviceType?.id,
      serviceValue: professionalProfile.serviceValue,
      tags: professionalProfile.tags,
    })
  }, [user.id])

  // Categories fetch
  const fetchCategories = useCallback(async () => {
    const fetchedCategories = await getAllCategories()
    setCategories(fetchedCategories)
  }, [])

  const fetchServiceTypes = useCallback(async () => {
    const response = await getServiceType()
    setServiceTypes(response)
  }, [])

  // Profession by categories fetch
  const fetchOccupations = useCallback(async () => {
    if (professionalProfile.categoryId) {
      const fetchedProfessions = await getOccupationByCategory(
        professionalProfile.categoryId,
      )
      setOccupations(fetchedProfessions)
    }
  }, [professionalProfile.categoryId])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setProfessionalProfile((prevState) => ({
        ...prevState,
        tags: prevState.tags
          ? `${prevState.tags},${e.target.value}`
          : e.target.value,
      }))
      setTagInput('')
    }
  }

  const handleTags = () => {
    setProfessionalProfile((prevState) => ({
      ...prevState,
      tags: prevState.tags ? `${prevState.tags},${tagInput}` : tagInput,
    }))
    setTagInput('')
  }

  const removeTag = (index: number) => {
    const newTags = professionalProfile.tags
      .split(',')
      .filter((_, tagIndex) => tagIndex !== index)
      .join(',')

    setProfessionalProfile((prevState) => ({
      ...prevState,
      tags: newTags,
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const formattedValue =
      name === 'serviceValue' ? formatCurrency(value) || '0' : value || ''

    setProfessionalProfile((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors =
      validateProfessionalProfileForm(professionalProfile)

    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach((error) => {
        toast.error(error, toastDefaultValues)
      })
    } else {
      setIsLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await updateProfessionalProfile(
        user.id,
        professionalProfile,
      )
      toast[response.type](response.message, toastDefaultValues)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfessionalProfile()
  }, [user.id, fetchProfessionalProfile])

  useEffect(() => {
    fetchCategories()
    fetchServiceTypes()
  }, [fetchCategories, fetchServiceTypes])

  useEffect(() => {
    fetchOccupations()
  }, [professionalProfile.categoryId, fetchOccupations])

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        {Object.keys(user).length !== 0 ? (
          <>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[20%_1fr] lg:gap-4">
              {/* Photo */}
              <div className="flex w-full flex-col items-center justify-start gap-4">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl bg-cyan-300">
                  <Image
                    src={user.image ? user.image.replace('s96', 's500') : ''}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* About me */}
                <div className="grid grid-cols-1 gap-4 text-lg lg:grid-cols-2">
                  <h3 className="col-span-full text-xl font-bold text-vibrant-green-100">
                    About me
                  </h3>

                  <TextInput
                    label="Full name"
                    name="fullname"
                    value={user.name}
                    onChange={handleChange}
                    disabled={true}
                  />
                  <div className="col-span-1" />

                  <SelectInput
                    label="Category"
                    name="categoryId"
                    value={professionalProfile.categoryId || ''}
                    options={categories || []}
                    onChange={handleChange}
                  />
                  <SelectInput
                    label="Occupation"
                    name="occupationId"
                    value={professionalProfile.occupationId || ''}
                    options={occupations || []}
                    onChange={handleChange}
                  />
                  <SelectInput
                    label="Type of service"
                    name="serviceTypeId"
                    value={professionalProfile.serviceTypeId || ''}
                    options={serviceTypes || []}
                    onChange={handleChange}
                  />

                  <TextInput
                    label="Service value"
                    placeholder="$000.00"
                    name="serviceValue"
                    value={professionalProfile.serviceValue || ''}
                    onChange={handleChange}
                  />
                </div>

                {/* Tags */}
                <div className="">
                  <h3 className="col-span-full mb-4 text-xl font-bold text-vibrant-green-100">
                    Tags
                  </h3>

                  <div className="flex flex-col gap-4">
                    <div className="flex w-full items-center justify-start gap-4">
                      <input
                        type="hidden"
                        name="tags"
                        value={professionalProfile.tags}
                      />
                      <input
                        className="flex-1 rounded-md border-2 border-slate-400 bg-background-300 p-2 lg:flex-none"
                        type="text"
                        value={tagInput}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setTagInput(e.target.value)}
                      />
                      <button
                        onClick={handleTags}
                        type="button"
                        className="flex w-[150px] cursor-pointer items-center justify-center rounded-md bg-vibrant-green-100 px-3 py-2 duration-100 hover:bg-vibrant-green-200"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                      {professionalProfile.tags &&
                        professionalProfile.tags
                          .split(',')
                          .map((tag, index) => {
                            return (
                              <button
                                key={index}
                                onClick={() => removeTag(index)}
                                type="button"
                                className="flex items-center justify-center gap-1 rounded-md border-2 border-vibrant-green-100 px-3 py-1"
                              >
                                {tag}
                                <X
                                  className="fill-vibrant-100 cursor-pointer"
                                  size={18}
                                />
                              </button>
                            )
                          })}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="col-span-full mb-8">
                  <h3 className="mb-4 text-xl font-bold text-vibrant-green-100">
                    Bio
                  </h3>

                  <TextAreaInput
                    name="bio"
                    value={professionalProfile.bio || ''}
                    onChange={handleChange}
                    placeholder="Tell us a little about yourself"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between gap-4">
              <div className="flex items-center justify-start gap-1">
                <SealWarning
                  size={20}
                  weight="fill"
                  className="fill-slate-400"
                />
                <span className="text-sm italic text-slate-400">
                  Your profile will only be displayed in the list of
                  professionals if all fields are filled in!
                </span>
              </div>
              <SubmitButton title="Save changes" isLoading={isLoading} />
            </div>
          </>
        ) : (
          <div className="grid animate-pulse grid-cols-1 gap-10 lg:grid-cols-[20%_1fr] lg:gap-4">
            <div className="flex w-full flex-col items-center justify-start gap-4">
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl bg-background-300"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* About me */}
              <div className="grid grid-cols-1 gap-4 text-lg lg:grid-cols-2">
                <div className="col-span-full h-10 w-20 rounded-md bg-background-300" />

                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
                <div className="col-span-1" />
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
              </div>

              {/* Tags */}
              <div className="">
                <div className="h-10 w-20 rounded-md bg-background-300" />
                <div className="flex flex-col gap-4">
                  <div className="flex w-full items-center justify-start gap-4" />
                </div>
              </div>

              {/* Bio */}
              <div className="col-span-full mb-8">
                <div className="mb-4 h-10 w-20 rounded-md bg-background-300" />

                <div className="h-52 w-full rounded-md bg-background-300" />
              </div>
            </div>
          </div>
        )}
      </form>
      <ToastContainer closeOnClick theme="dark" />
    </>
  )
}
