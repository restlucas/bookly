import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { FavoritesList } from "./list";
import { SessionProps } from "../dashboard/page";

export const metadata: Metadata = {
  title: "Favoritos | Bookly",
  description: "Pagina dashboard",
};

export default async function Favorites() {
  const { user } = (await getServerSession(authOptions)) as SessionProps;

  return (
    <>
      <section className="mb-8 flex flex-col gap-6">
        <div className="w-full rounded-md bg-background-200 p-8">
          <h2 className="mb-8 text-2xl font-bold text-vibrant-green-100">
            Salvos
          </h2>
          <FavoritesList userId={user.id} />
        </div>
      </section>
    </>
  );
}
