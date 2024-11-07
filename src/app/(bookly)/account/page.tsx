import { AccountForm } from './form'

export default function Account() {
  return (
    <section className="mb-8 flex flex-col gap-6">
      {/* Profile and preferences */}
      <div className="w-full rounded-md bg-background-200 p-8">
        <h2 className="mb-8 text-2xl font-bold text-vibrant-green-100">
          Minha conta
        </h2>

        <AccountForm />
      </div>
    </section>
  )
}
