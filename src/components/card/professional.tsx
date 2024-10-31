"use client";

import { BookmarkSimple, MapPin } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "../button/favorite";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

export function ProfessionalCard({ professional }: any) {
  const { user } = useContext(UserContext);

  return (
    <div className="flex h-full items-start justify-start gap-4 overflow-hidden rounded-md bg-background-300 p-3">
      <div className="relative hidden h-40 w-40 items-center justify-center overflow-hidden rounded-md bg-slate-400 md:block">
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
          <span className="hidden md:block">⭐⭐⭐⭐⭐</span>
        </div>
        <h6 className="text-vibrant-green-100">
          {professional.profile.profession
            ? professional.profile.profession.name
            : ""}
        </h6>
        <p id="lineClampTwo" className="max-h-full w-full flex-1">
          {professional.profile.bio ? professional.profile.bio : ""}
        </p>
      </div>
      <div className="flex h-40 flex-col items-end justify-between">
        <div className="flex items-center gap-4 md:justify-end">
          <div className="hidden items-center justify-start gap-2 text-slate-400 md:flex">
            <div className="flex items-center justify-start gap-1">
              <MapPin size={15} />
              <span>Telêmaco Borba</span>
            </div>
          </div>
          <FavoriteButton
            professionalId={professional.id}
            marked={user.favorites && user.favorites.includes(professional.id)}
            background={false}
          />
        </div>

        <div className="flex flex-col items-end justify-end gap-2">
          <span className="text-base md:text-xl">
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
            Ver perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
