'use client'

import { Calendar } from '@/components/calendar'
import { CommentsCard } from '@/components/card/comments'
import { getProfessional } from '@/services/professionalService'
import {
  ArrowLeft,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  WhatsappLogo,
} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FavoriteButton } from '@/components/button/favorite'
import { UserContext } from '@/contexts/UserContext'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { NextSeo } from 'next-seo'

interface ProfessionalProps {
  name: string
  professional: {
    serviceType: {
      id: string
      name: string
    }
    occupation: {
      name: string
    }
    reviews: {
      createdAt: Date
      user: {
        name: string
        image: string
      }
      comment: string
      rating: string
    }[]
    bio: string
    serviceValue: string
    tags: string
  }
  address: string
  image: string
  email: string
  phone: string
}

export interface SchedulingDateProps {
  date: string
  hour: {
    time_formatted: string
    time_in_minutes: number
  }
}

export default function ProfessionalProfile({
  params: { professionalId },
}: {
  params: Params
}) {
  const { user } = useContext(UserContext)
  const [professional, setProfessional] = useState<ProfessionalProps>()
  const [schedulingDate, setSchedulingDate] = useState<SchedulingDateProps>({
    date: '',
    hour: {
      time_formatted: '',
      time_in_minutes: 0,
    },
  })

  const fetchProfessional = useCallback(async (professionalId) => {
    const response = await getProfessional(professionalId)
    setProfessional(response)
  }, [])

  useEffect(() => {
    fetchProfessional(professionalId)
  }, [fetchProfessional, professionalId])

  return (
    <div>
      {professional && professional.professional ? (
        <>
          <NextSeo title={`${professional.name} | Bookly`} noindex />
          <div className="mb-4 flex items-start justify-start">
            <Link
              href={'./'}
              className="flex items-center justify-center gap-2 rounded-md border-2 border-transparent px-3 py-1 duration-100 hover:border-vibrant-green-100 hover:text-vibrant-green-100"
            >
              <ArrowLeft
                size={28}
                weight="bold"
                className="fill-vibrant-green-100"
              />
              <span>Voltar para listagem</span>
            </Link>
          </div>
          <div className="mb-14 grid grid-cols-1 items-start gap-8 2xl:grid-cols-[35%_65%]">
            <div className="grid auto-rows-min items-start gap-8">
              <div className="flex items-start justify-start gap-4 rounded-md bg-background-200 p-8">
                <div className="relative flex min-h-[200px] min-w-[200px] items-center justify-center rounded-md bg-slate-300">
                  <div className="absolute -left-4 -top-4 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-vibrant-green-100">
                    <FavoriteButton
                      professionalId={professionalId}
                      marked={
                        user.favorites &&
                        user.favorites.includes(String(professionalId))
                      }
                      variant={true}
                    />
                  </div>
                  <Image
                    className="z-10 rounded-md object-cover"
                    alt={professional.name}
                    src={professional.image.replace('s96', 's500')}
                    fill={true}
                  />
                </div>
                <div className="flex h-[200px] w-full flex-col gap-4">
                  <div className="leading-6">
                    <div className="flex w-full items-center justify-between">
                      <h2 className="text-2xl font-bold text-vibrant-green-100">
                        {professional.name}
                      </h2>
                      <span>
                        ⭐ ({professional.professional.reviews.length})
                      </span>
                    </div>
                    <h5 className="text-base">
                      {professional.professional.occupation
                        ? professional.professional.occupation.name
                        : ''}
                    </h5>
                  </div>
                  <p className="">
                    A partir de:{' '}
                    <span className="font-bold text-vibrant-green-100">
                      {professional.professional.serviceValue
                        ? professional.professional.serviceValue
                        : ''}
                    </span>
                  </p>

                  <div className="flex items-center justify-start gap-2">
                    <Link href="" className="cursor-pointer">
                      <WhatsappLogo size={26} />
                    </Link>
                    <Link href="" className="cursor-pointer">
                      <InstagramLogo size={26} />
                    </Link>
                    <Link href="" className="cursor-pointer">
                      <LinkedinLogo size={26} />
                    </Link>
                  </div>

                  <div className="mt-auto flex items-center justify-start gap-2">
                    <MapPin
                      className="fill-vibrant-green-100"
                      weight="bold"
                      size={26}
                    />
                    <span>{professional.address || ''}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-background-200 p-8">
                <Calendar
                  professionalId={professionalId}
                  setSchedulingDate={setSchedulingDate}
                  schedulingDate={schedulingDate}
                />
                <Link
                  href={`${professionalId}/request-schedule?selected_date=${schedulingDate.date}&hour=${schedulingDate.hour.time_formatted}&minutes=${schedulingDate.hour.time_in_minutes}`}
                  className="w-full cursor-pointer rounded-md bg-vibrant-green-100 p-4 text-center duration-150 hover:bg-vibrant-green-200"
                >
                  Solicitar agendamento
                </Link>
              </div>
            </div>

            <div className="grid auto-rows-min items-start gap-8">
              <div className="flex items-center justify-end rounded-md bg-background-200 p-8">
                <div className="flex w-full flex-col items-start justify-start gap-2">
                  <h2 className="mb-4 text-2xl font-bold text-vibrant-green-100">
                    Tags
                  </h2>
                  <div className="flex flex-wrap items-center justify-start gap-3">
                    {professional.professional.tags &&
                      professional.professional.tags
                        .split(',')
                        .map((tag, index) => {
                          return (
                            <button
                              key={index}
                              className="pointer-events-none flex cursor-pointer items-center justify-center gap-1 rounded-md border-2 border-vibrant-green-100 px-3 py-1"
                            >
                              {tag}
                            </button>
                          )
                        })}
                  </div>
                </div>
              </div>
              <div className="space-y-6 rounded-md bg-background-200 p-8">
                <h2 className="text-2xl font-bold text-vibrant-green-100">
                  Sobre mim
                </h2>
                <p>{professional.professional.bio || ''}</p>
              </div>
              <div className="space-y-6 rounded-md bg-background-200 p-8">
                <h2 className="text-2xl font-bold text-vibrant-green-100">
                  Avaliações ({professional.professional.reviews.length})
                </h2>

                <div className="grid grid-cols-3 items-start gap-4">
                  {professional.professional.reviews.map((_, index) => {
                    return <CommentsCard key={index} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4" />
          <div className="mb-14 grid animate-pulse grid-cols-1 items-start gap-8 2xl:grid-cols-[35%_65%]">
            <div className="grid grid-cols-1 gap-8">
              <div className="flex items-start justify-start gap-4 rounded-md bg-background-200 p-8">
                <div className="flex min-h-[200px] min-w-[200px] items-center justify-center rounded-md bg-background-300" />
                <div className="flex h-full w-full flex-col gap-4">
                  <div className="h-10 w-1/2 rounded-md bg-background-300" />
                  <div className="h-8 w-1/3 rounded-md bg-background-300" />
                </div>
              </div>
              <div className="flex h-[400px] flex-col gap-4 rounded-md bg-background-200 p-8">
                <div className="h-10 w-1/2 rounded-md bg-background-300" />
                <div className="flex-1 rounded-md bg-background-300" />
                <div className="h-10 w-full rounded-md bg-background-300" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="flex h-[100px] items-start justify-start gap-4 rounded-md bg-background-200 p-8">
                <div className="h-10 w-1/3 rounded-md bg-background-300" />
              </div>
              <div className="flex h-[100px] items-start justify-start gap-4 rounded-md bg-background-200 p-8">
                <div className="h-10 w-1/3 rounded-md bg-background-300" />
              </div>
              <div className="flex h-[100px] items-start justify-start gap-4 rounded-md bg-background-200 p-8">
                <div className="h-10 w-1/3 rounded-md bg-background-300" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )

  return null
}
