"use client";

import { useState } from "react";

interface TextInputProps {
  label: string;
  value?: string;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
}

export function TextInput({
  label,
  value = "",
  type = "text",
  placeholder,
  readonly,
  required,
}: TextInputProps) {
  const [inputValue, setInputValue] = useState(value);

  function handleValue(event: any) {
    setInputValue(event.target.value);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="">{label}</label>
      <input
        className="rounded-md border-2 border-slate-700 bg-background-300 p-2"
        value={value}
        type={type}
        onChange={handleValue}
        placeholder={placeholder}
        required={required}
        readOnly={readonly}
      />
    </div>
  );
}
