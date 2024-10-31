"use client";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value?: string;
  type?: string;
  onChange?: (e) => void;
}

export function TextInput({
  label,
  name,
  value = "",
  type = "text",
  onChange,
  ...rest
}: TextInputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="">{label}</label>
      <input
        className="rounded-md border-2 border-slate-700 bg-background-300 p-2 disabled:text-slate-400"
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
