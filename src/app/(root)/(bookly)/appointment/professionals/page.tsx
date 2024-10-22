import Filter from './filter'
import List from './list'

export default function Professionals(props: any) {
  return (
    <div className="grid grid-cols-[20%_80%] items-start gap-8">
      <Filter filters={props.searchParams} />
      <List />
    </div>
  )
}
