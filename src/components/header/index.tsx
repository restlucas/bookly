import { getServerSession } from "next-auth";
import { HeaderNavigation } from "./navigation";
import { authOptions } from "@/utils/authOptions";
import { Session } from "next-auth";

export default async function Header() {
  const session: Session = await getServerSession(authOptions);

  if (!session.user.role)
    return (
      <div className="mx-8 flex items-center justify-between py-4 md:mx-16">
        <h1 className="my-4 text-3xl font-bold text-vibrant-green-100">
          Bookly
        </h1>

        <div className="hidden animate-pulse lg:block">
          <div className="flex items-center justify-center gap-4">
            <div className="group relative flex cursor-pointer items-center justify-center gap-2">
              <div className="h-7 w-20 rounded-md bg-background-200" />
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-transparent bg-background-200" />
            </div>
          </div>
        </div>

        <div className="block animate-pulse lg:hidden">
          <div className="h-12 w-12 rounded-md bg-background-200" />
        </div>
      </div>
    );

  return (
    <div>
      <nav className="mx-8 flex items-center justify-between py-4 md:mx-16">
        <h1 className="my-4 text-3xl font-bold text-vibrant-green-100">
          Bookly
        </h1>

        <HeaderNavigation session={session} />
      </nav>
    </div>
  );
}
