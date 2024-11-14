import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex w-full items-center justify-center bg-background-200 py-6">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        {/* Links section */}
        <div className="mb-4 text-center md:mb-0 md:text-start">
          <h4 className="mb-2 text-lg font-semibold text-vibrant-green-100">
            Links
          </h4>
          <ul className="space-y-1">
            <li>
              <Link
                href=""
                className="cursor-pointer duration-150 hover:underline"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="cursor-pointer duration-150 hover:underline"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="cursor-pointer duration-150 hover:underline"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                href=""
                className="cursor-pointer duration-150 hover:underline"
              >
                Terms of use
              </Link>
            </li>
          </ul>
        </div>

        {/* Portfolio section */}
        <div className="mb-4 flex space-x-4 md:mb-0">
          <p>Portfolio link here</p>
        </div>

        {/* All rights reserved section */}
        <div className="flex flex-col gap-1 text-center md:text-right">
          <p className="text-sm">
            © {new Date().getFullYear()}{' '}
            <span className="text-vibrant-green-100">Bookly</span>. All rights
            reserved.
          </p>
          <p className="cursor-pointer text-sm duration-150 hover:underline">
            Contact:{' '}
            <a href="mailto:restlucas.dev@gmail.com">restlucas.dev@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
