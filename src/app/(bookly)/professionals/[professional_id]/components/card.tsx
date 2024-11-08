"use client";

import {
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import { FavoriteButton } from "@/components/button/favorite";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { ProfessionalProps } from "../page";

export default function ProfessionalCard({
  professional,
}: {
  professional: ProfessionalProps;
}) {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-start justify-start gap-4 rounded-md bg-background-200 p-8">
      <div className="relative flex min-h-[200px] min-w-[200px] items-center justify-center rounded-md bg-slate-300">
        <div className="absolute -left-4 -top-4 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-vibrant-green-100">
          <FavoriteButton
            professionalId={professional.id}
            marked={user.favorites && user.favorites.includes(professional.id)}
            variant={true}
          />
        </div>
        <Image
          className="z-10 rounded-md object-cover"
          alt={professional.name}
          src={professional.image.replace("s96", "s500")}
          fill={true}
        />
      </div>
      <div className="flex h-[200px] w-full flex-col gap-4">
        <div className="leading-6">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-bold text-vibrant-green-100">
              {professional.name}
            </h2>
            <span>
              ⭐ (
              {professional.profile.reviews
                ? professional.profile.reviews.length
                : "0"}
              )
            </span>
          </div>
          <h5 className="text-base">
            {professional.profile.occupation
              ? professional.profile.occupation.name
              : ""}
          </h5>
        </div>
        <p className="">
          A partir de:{" "}
          <span className="font-bold text-vibrant-green-100">
            {professional.profile.serviceValue
              ? professional.profile.serviceValue
              : ""}
          </span>
        </p>

        <div className="flex items-center justify-start gap-2">
          <Link href="" className="cursor-pointer">
            <WhatsappLogo size={26} />
          </Link>
          <Link href="" className="cursor-pointer">
            <InstagramLogo size={26} />
          </Link>
          <Link href="" className="cursor-pointer">
            <LinkedinLogo size={26} />
          </Link>
        </div>

        <div className="mt-auto flex items-center justify-start gap-2">
          <MapPin className="fill-vibrant-green-100" weight="bold" size={26} />
          <span>{professional.address || ""}</span>
        </div>
      </div>
    </div>
  );
}
