import Link from 'next/link'

export function LoginButton() {
  return (
    <Link
      href={'/login'}
      className="flex h-12 w-[200px] cursor-pointer items-center justify-center rounded-md bg-vibrant-green-100 font-bold text-background-200 duration-150 hover:bg-vibrant-green-200"
    >
      Entrar
    </Link>
  )
}
