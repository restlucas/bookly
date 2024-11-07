export function TagCard({ key, tag }: { key: string; tag: string }) {
  return (
    <div
      key={key}
      className="cursor-pointer text-nowrap rounded-md border-[1px] border-vibrant-green-100 px-4 py-2 text-center text-sm duration-100 hover:bg-background-300"
    >
      <span>{tag}</span>
    </div>
  )
}
