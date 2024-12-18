'use client'

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  options: {
    id: string
    slug?: string
    description?: string
    name: string
  }[]
  value: string
  usingSlug?: boolean
  onChange: (e) => void
}

export function SelectInput({
  label,
  name,
  options,
  value,
  usingSlug = false,
  onChange,
  ...rest
}: SelectInputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="">{label}</label>
      <select
        className="cursor-pointer rounded-md border-2 border-slate-700 bg-background-300 p-2"
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      >
        <option value="">Select an option</option>
        {options &&
          options.map((option) => {
            return (
              <option
                key={option.id}
                value={usingSlug ? option.slug : option.id}
              >
                {option.name}
              </option>
            )
          })}
      </select>
    </div>
  )
}
