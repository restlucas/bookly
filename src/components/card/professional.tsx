"use client";

import { BookmarkSimple, MapPin } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export function ProfessionalCard({ professional }: any) {
  return (
    <div className="flex h-full items-start justify-start gap-4 overflow-hidden rounded-md bg-background-300 p-3">
      <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-md bg-slate-400">
        <Image
          className="object-cover"
          alt={professional.name}
          src={professional.image.replace("s96", "s500")}
          fill={true}
        />
      </div>
      <div className="flex-1 flex-col gap-2 space-y-2">
        <div className="flex items-center justify-start gap-2">
          <h3 className="text-xl font-bold">{professional.name}</h3>
          <span>⭐⭐⭐⭐⭐</span>
        </div>
        <h6 className="text-vibrant-green-100">
          {professional.profile.profession
            ? professional.profile.profession.name
            : ""}
        </h6>
        <p>{professional.profile.bio ? professional.profile.bio : ""}</p>
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
            <span className="font-bold text-vibrant-green-100">
              {professional.profile.serviceValue
                ? professional.profile.serviceValue
                : "não informado"}
            </span>
          </span>
          <Link
            href={`professionals/${professional.id}`}
            className="cursor-pointer rounded-br-md rounded-tl-md bg-vibrant-green-100 px-6 py-3 font-bold duration-150 hover:bg-vibrant-green-200"
          >
            Verificar disponibilidade
          </Link>
        </div>
      </div>
    </div>
  );
}
