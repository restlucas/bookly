import { HomeButton } from '@/components/button/home'
import { CommentsCard } from '@/components/card/comments'

import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Home | Bookly',
  description: 'Schedule, manage, and confirm, all in one place.',
}

export default async function Home() {
  const session = await getServerSession()

  return (
    <>
      <div className="mb-16 flex flex-col gap-20 lg:mx-16">
        {/* Login button */}
        <div className="flex items-center justify-between">
          <h1 className="my-4 text-3xl font-bold text-vibrant-green-100">
            Bookly
          </h1>
          <HomeButton session={session} />
        </div>

        {/* Title and slogan */}
        <section className="grid-cols-1fr grid h-[300px] lg:h-[600px] lg:grid-cols-[40%_60%]">
          <div className="flex items-center justify-center">
            <div className="flex flex-col space-y-8">
              <h1 className="text-5xl font-bold">
                <span className="bg-vibrant-green-100">Simplify</span> your
                daily life
              </h1>
              <h3 className="">
                Schedule, manage, and confirm, all in one place. Join our
                community and discover professionals in your area!
              </h3>
              <div className="flex items-center justify-start gap-4">
                <div className="flex flex-col items-start justify-start">
                  <span className="font-thin uppercase">Appointments</span>
                  <span className="text-3xl text-vibrant-green-100">1000+</span>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <span className="font-thin uppercase">Professionals</span>
                  <span className="text-3xl text-vibrant-green-100">1000+</span>
                </div>
              </div>
            </div>
          </div>
          <aside className="hidden overflow-hidden rounded-3xl bg-[url('/booking.jpg')] bg-cover bg-center bg-no-repeat lg:block" />
        </section>

        {/* About the system */}
        <section className="flex w-full items-center justify-center rounded-3xl bg-background-200 p-4 lg:h-[400px] lg:p-8">
          <div className="flex flex-col items-center justify-center gap-4 lg:gap-8">
            <h1 className="text-center text-2xl font-bold text-vibrant-green-100 lg:text-4xl">
              System Objective
            </h1>
            <h3 className="text-center text-base lg:w-2/4">
              Designed to connect clients with professionals from various
              fields, such as health, beauty, and wellness, in a simple and
              efficient way. With an intuitive and easy-to-use interface, users
              can schedule appointments and services in just a few clicks,
              eliminating the need for phone calls and long waiting times.
            </h3>
          </div>
        </section>

        {/* Main functionalities */}
        <section className="grid gap-4 lg:grid-rows-[200px_200px] lg:gap-0">
          <div className="grid grid-cols-1 overflow-hidden rounded-md lg:grid-cols-[30%_70%]">
            <div className="flex items-center justify-center bg-vibrant-green-100 py-3 text-2xl font-bold lg:py-0 lg:text-3xl">
              For clients
            </div>
            <div className="grid grid-cols-1 items-center gap-8 bg-background-300 p-4 lg:grid-cols-3">
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                    1
                  </div>
                  <h5 className="font-bold">Ease of use</h5>
                </div>
                <p className="text-sm text-slate-300">
                  Browse categories and find qualified professionals in your
                  area with just a few clicks.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                    2
                  </div>
                  <h5 className="font-bold">Convenience</h5>
                </div>
                <p className="text-sm text-slate-300">
                  Schedule appointments anytime and anywhere, without the need
                  for phone calls or in-person visits.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                    3
                  </div>
                  <h5 className="font-bold">Efficiency</h5>
                </div>
                <p className="text-sm text-slate-300">
                  Receive automatic reminders about your appointments, avoiding
                  forgetfulness and optimizing your time.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 overflow-hidden rounded-md lg:grid-cols-[70%_30%]">
            <div className="grid grid-cols-1 items-center gap-8 bg-background-300 p-4 lg:grid-cols-3">
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                    1
                  </div>
                  <h5 className="font-bold">Simplified management</h5>
                </div>
                <p className="text-sm text-slate-300">
                  Access an easy-to-use control panel to manage schedules,
                  services, and clients.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                    2
                  </div>
                  <h5 className="font-bold">Visibility</h5>
                </div>
                <p className="text-sm text-slate-300">
                  Increase your visibility and attract new clients through our
                  platform by showcasing your specializations and availability.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-vibrant-green-100 text-sm font-bold">
                    3
                  </div>
                  <h5 className="font-bold">Reports and statistics:</h5>
                </div>
                <p className="text-sm text-slate-300">
                  Track your performance with detailed reports, helping you make
                  informed decisions about your business.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-vibrant-green-100 py-3 text-2xl font-bold lg:py-0 lg:text-3xl">
              For professionals
            </div>
          </div>
        </section>

        {/* Comments */}
        <section className="w-full">
          <h1 className="mb-5 text-center text-3xl">
            What people think{' '}
            <span className="bg-vibrant-green-100 font-bold text-background-300">
              about us
            </span>
          </h1>
          <div className="flex items-center justify-center">
            <div className="grid w-full grid-cols-1 gap-6 lg:w-3/4 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => {
                return <CommentsCard key={index} />
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
