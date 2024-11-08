import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { Metadata } from 'next'
import { ScheduleForm } from './schedule-form'
import { AbsenceForm } from './absence-form'

export const metadata: Metadata = {
  title: 'Minha programação | Bookly',
  description: 'Pagina dashboard',
}

export interface UserProps {
  id: string
  name: string
  email: string
  image: string
  role: string
}

export default async function ProfessionalSchedule() {
  const { user } = await getServerSession(authOptions)

  return (
    <>
      <section className="mb-8 flex flex-col gap-6">
        {/* Page header */}
        <div className="flex w-full items-center justify-between gap-4 rounded-md bg-background-200 p-8 shadow-md">
          <h3 className="text-3xl font-bold text-vibrant-green-100 lg:text-xl">
            Minha programação
          </h3>
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-8 2xl:grid-cols-2">
          <ScheduleForm user={user} />
          <AbsenceForm user={user} />
        </div>
      </section>
    </>
  )
}
