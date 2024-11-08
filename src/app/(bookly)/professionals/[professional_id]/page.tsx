import { Calendar } from './components/calendar'
import { CommentsCard } from '@/components/card/comments'
import {
  getProfessional,
  getProfessionalName,
} from '@/services/professionalService'

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import ProfessionalCard from './components/card'
import { Metadata } from 'next'
import { BackButton } from './components/back-button'

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const professionalId = (await params).professional_id
  const { name: professionalName } = await getProfessionalName(professionalId)
  return {
    title: `${professionalName} | Bookly`,
    description: `Pagina de ${professionalName}`,
  }
}

interface ProfessionalProfile {
  bio: string
  serviceValue: string
  tags: string
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

export interface ProfessionalProps {
  id: string
  name: string
  email: string
  image: string
  phone: string
  address: string
  profile: ProfessionalProfile
}

export default async function ProfessionalProfile({
  params: { professional_id: professionalId },
}: {
  params: Params
}) {
  const professionalData = await getProfessional(professionalId)

  const professional = {
    ...professionalData,
    profile: professionalData.professional,
  }

  delete professional.professional

  return (
    <div>
      {professionalData && professionalData.professional ? (
        <>
          <div className="mb-4 flex items-start justify-start">
            <BackButton />
          </div>
          <div className="mb-14 grid grid-cols-1 items-start gap-8 2xl:grid-cols-[35%_65%]">
            <div className="grid auto-rows-min items-start gap-8">
              <ProfessionalCard professional={professional} />

              <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-background-200 p-8">
                <Calendar professionalId={professionalId} />
              </div>
            </div>

            <div className="grid auto-rows-min items-start gap-8">
              <div className="flex items-center justify-end rounded-md bg-background-200 p-8">
                <div className="flex w-full flex-col items-start justify-start gap-2">
                  <h2 className="mb-4 text-2xl font-bold text-vibrant-green-100">
                    Tags
                  </h2>
                  <div className="flex flex-wrap items-center justify-start gap-3">
                    {professional.profile.tags &&
                      professional.profile.tags.split(',').map((tag, index) => {
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
                <p>{professional.profile.bio || ''}</p>
              </div>
              <div className="space-y-6 rounded-md bg-background-200 p-8">
                <h2 className="text-2xl font-bold text-vibrant-green-100">
                  Avaliações ({professional.profile.reviews.length})
                </h2>

                <div className="grid grid-cols-3 items-start gap-4">
                  {professional.profile.reviews.map((_, index) => {
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
