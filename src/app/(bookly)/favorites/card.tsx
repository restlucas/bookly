import { ArrowSquareUpRight } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'

interface ProfessionalProps {
  professional: {
    id: string
    address: string
    image: string
    name: string
    professional: {
      bio?: string
      occupation: {
        name: string
      }
    }
  }
}

export function Card({ professional }: ProfessionalProps) {
  return (
    <Link
      href={`/professionals/${professional.id}`}
      className="group relative max-h-40 w-full cursor-pointer overflow-hidden rounded-md border-2 border-slate-700 bg-background-300 p-4 shadow-md duration-150 hover:border-slate-400"
    >
      <div className="grid grid-cols-[30%_70%] items-start gap-4 overflow-hidden">
        <div className="w-h-32 relative h-32 overflow-hidden rounded-md">
          <Image
            src={professional.image.replace('s96', 's500')}
            alt={professional.name}
            className="object-cover"
            fill={true}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <div className="relative w-full leading-6">
            <h3 className="text-xl font-bold text-vibrant-green-100">
              {professional.name}
            </h3>
            <p>{professional.professional.occupation.name}</p>
          </div>
          <p id="lineClamp" className="lineClamp max-h-full w-full flex-1">
            {professional.professional.bio}
          </p>
        </div>
        <div className="absolute right-0 top-0 p-4 duration-100">
          <ArrowSquareUpRight
            className="fill-vibrant-green-200 group-hover:fill-vibrant-green-100"
            weight="fill"
            size={32}
          />
        </div>
      </div>
    </Link>
  )
}
