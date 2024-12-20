'use client'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  value?: string
  onChange: (e) => void
}

export function DateInput({
  name,
  value = '',
  onChange,
  ...rest
}: TextInputProps) {
  return (
    <div className="">
      <div className="flex items-center justify-start gap-4">
        <input
          className="w-full rounded-md border-2 border-slate-700 bg-background-300 p-2 disabled:text-slate-400"
          value={value}
          name={name}
          type="date"
          onChange={onChange}
          {...rest}
        />
      </div>
    </div>
  )
}
