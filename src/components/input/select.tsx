"use client";

interface Option {
  id: string;
  description: string;
}

interface SelectInputProps {
  label: string;
  placeholder?: string;
  options: Option[];
}

export function SelectInput({ label, placeholder, options }: SelectInputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="">{label}</label>
      <select className="rounded-md border-2 border-slate-700 bg-background-300 p-2">
        <option value="" className="">
          Selecione uma opção
        </option>
        {options &&
          options.map((option, index) => {
            return (
              <option key={option.id} value={option.id}>
                {option.description}
              </option>
            );
          })}
      </select>
    </div>
  );
}
