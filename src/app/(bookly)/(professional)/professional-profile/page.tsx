import { Metadata } from 'next'
import { ProfessionalProfileForm } from './form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { SessionProps } from '../../dashboard/page'

export const metadata: Metadata = {
  title: 'Professional profile | Bookly',
  description: 'Professional profile page',
}

export default async function ProfessionalProfile() {
  const { user } = (await getServerSession(authOptions)) as SessionProps

  return (
    <section className="mb-8">
      <div className="w-full rounded-md bg-background-200 p-8 shadow-md">
        <h2 className="mb-8 text-2xl font-bold text-vibrant-green-100">
          Professional profile
        </h2>

        <ProfessionalProfileForm user={user} />
      </div>
    </section>
  )
}
