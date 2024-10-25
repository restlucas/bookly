interface ButtonProps {
  title: string;
  isLoading: boolean;
}

export default function SubmitButton({ title, isLoading }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`${isLoading ? "cursor-not-allowed bg-vibrant-green-200/60" : "bg-vibrant-green-100 hover:bg-vibrant-green-200"} flex h-10 w-[200px] items-center justify-center rounded-md px-4 py-2 duration-200`}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        title
      )}
    </button>
  );
}
