import { NextSeo } from 'next-seo'
import Filter from './filter'
import List from './list'

interface SearchParamsProps {
  searchParams: {
    category?: string
    occupation?: string
    serviceType?: string
  }
}

export default function Professionals({ searchParams }: SearchParamsProps) {
  return (
    <>
      <NextSeo title="Profissionais | Bookly" noindex />
      <div className="mb-8 grid grid-cols-1 items-start gap-8 xl:grid-cols-[1fr_3fr]">
        <Filter searchParams={searchParams} />
        <List searchParams={searchParams} />
      </div>
    </>
  )
}
