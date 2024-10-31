interface ButtonProps {
  title: string;
  isLoading: boolean;
  form?: string;
}

export default function SubmitButton({ title, isLoading, form }: ButtonProps) {
  return (
    <button
      form={form}
      type="submit"
      className={`${isLoading ? "cursor-not-allowed bg-vibrant-green-200/60" : "bg-vibrant-green-100 hover:bg-vibrant-green-200"} flex h-14 w-full items-center justify-center rounded-md px-6 py-4 duration-200 lg:h-10 lg:w-[200px] lg:px-6 lg:py-4`}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <span className="text-nowrap text-xl lg:text-base">{title}</span>
      )}
    </button>
  );
}
