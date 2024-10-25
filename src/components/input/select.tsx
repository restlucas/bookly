"use client";

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: any;
  value: string;
  onChange: (e) => void;
}

export function SelectInput({
  label,
  name,
  options,
  value,
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
        <option value="">Selecione uma opção</option>
        {options &&
          options.map((option, index) => {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
