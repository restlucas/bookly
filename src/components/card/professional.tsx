"use client";

import { BookmarkSimple, MapPin } from "@phosphor-icons/react";
import Link from "next/link";

export function ProfessionalCard({ professional_id }: any) {
  console.log(professional_id);
  return (
    <div className="relative flex h-full items-start justify-start gap-4 overflow-hidden rounded-md bg-background-300 p-3">
      <div className="h-40 w-40 rounded-md bg-[url('/profile-pic.jpg')] bg-cover bg-center bg-no-repeat" />
      <div className="flex-1 flex-col gap-2 space-y-2">
        <div className="flex items-center justify-start gap-2">
          <h3 className="text-xl font-bold">Metro Boomin</h3>
          <span>⭐⭐⭐⭐⭐</span>
        </div>
        <h6 className="font-bold text-vibrant-green-100">Ocupação: Médico</h6>
        <p>
          Donec ultricies turpis vitae lorem vehicula, ac dapibus enim porta.
          Pellentesque mollis, metus vel tempor tincidunt, velit augue lacinia
          urna, at porta mauris eros eu massa. Nam sed dui tellus. Phasellus
          fermentum nisi lacinia pellentesque pellentesque. Duis fermentum, diam
          eu lacinia mattis, dolor nunc laoreet mi, vitae placerat dui sapien ut
          libero.
        </p>
      </div>
      <div className="flex h-40 flex-col items-end justify-between">
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center justify-start gap-2 text-slate-400">
            <div className="flex items-center justify-start gap-1">
              <MapPin size={15} />
              <span>Telêmaco Borba</span>
            </div>
          </div>
          <BookmarkSimple
            size={32}
            weight="bold"
            fill="#28D482"
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-end justify-end gap-2">
          <span className="text-xl">
            A partir de:{" "}
            <span className="font-bold text-vibrant-green-100">R$000,00</span>
          </span>
          <Link
            href={`professionals/${professional_id}`}
            className="cursor-pointer rounded-br-md rounded-tl-md bg-vibrant-green-100 px-6 py-3 font-bold duration-150 hover:bg-vibrant-green-200"
          >
            Verificar disponibilidade
          </Link>
        </div>
      </div>
    </div>
  );
}
