interface TextAreaInputProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e) => void;
}

export function TextAreaInput({
  name,
  value,
  placeholder,
  onChange,
}: TextAreaInputProps) {
  return (
    <textarea
      className="w-full resize-none overflow-y-scroll rounded-md bg-background-300 p-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vibrant-green-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-background-200 [&::-webkit-scrollbar]:w-[4px]"
      rows={10}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
