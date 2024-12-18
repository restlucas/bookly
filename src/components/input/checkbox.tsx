interface CheckboxInputProps {
  label: string
  name: string
}

export function CheckboxInput({ label, name }: CheckboxInputProps) {
  return (
    <div className="flex cursor-pointer items-center justify-start gap-2 rounded-full py-1">
      <label className="flex cursor-pointer select-none items-center justify-center gap-2">
        <input
          className="h-[0.85rem] w-[0.85rem] text-white accent-vibrant-green-100"
          type="checkbox"
          value={name}
          name={name}
        />
        <span>{label}</span>
      </label>
    </div>
  )
}
