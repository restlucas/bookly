import { Metadata } from 'next'
import { AccountForm } from './form'

export const metadata: Metadata = {
  title: 'My account | Bookly',
  description: 'My account page',
}

export default function MyAccount() {
  return (
    <section className="mb-8 flex flex-col gap-6">
      {/* Profile and preferences */}
      <div className="w-full rounded-md bg-background-200 p-8">
        <h2 className="mb-8 text-2xl font-bold text-vibrant-green-100">
          My account
        </h2>

        <AccountForm />
      </div>
    </section>
  )
}
