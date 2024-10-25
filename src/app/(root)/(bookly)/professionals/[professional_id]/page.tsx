"use client";

import { Calendar } from "@/components/calendar";
import { CommentsCard } from "@/components/card/comments";
import { TagCard } from "@/components/card/tag";
import { getProfessional } from "@/services/professionalService";
import {
  ArrowLeft,
  BookmarkSimple,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Availability } from "./availability";

const tagsArray = [
  "Acompanhamento psicológico",
  "Alterações de humor",
  "Tristeza",
  "Medos",
  "Ansiedade",
  "Dependência emocional",
  "Autoestima",
  "Traumas",
  "Depressão",
  "Autoconfiança",
];

export default function ProfessionalProfile(props: any) {
  const { professional_id: professionalId } = useParams();
  const [professional, setProfessional] = useState<any>({});

  useEffect(() => {
    const fetchProfessional = async (professionalId) => {
      const response = await getProfessional(professionalId);
      console.log(response);
      setProfessional(response);
    };

    fetchProfessional(professionalId);
  }, []);

  if (professional && professional.profile) {
    return (
      <div>
        <div className="mb-4 flex items-start justify-start">
          <Link
            href={"./"}
            className="flex items-center justify-center gap-2 rounded-md border-2 border-transparent px-3 py-1 duration-100 hover:border-vibrant-green-100 hover:text-vibrant-green-100"
          >
            <ArrowLeft
              size={28}
              weight="bold"
              className="fill-vibrant-green-100"
            />
            <span>Voltar para listagem</span>
          </Link>
        </div>
        <div className="mb-14 grid grid-cols-[35%_65%] items-start gap-8">
          <div className="grid auto-rows-min items-start gap-8">
            <div className="flex items-start justify-start gap-4 rounded-md bg-background-200 p-8">
              <div className="relative flex min-h-[200px] min-w-[200px] items-center justify-center rounded-md bg-slate-300">
                <div className="absolute -left-4 -top-4 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-vibrant-green-100">
                  <BookmarkSimple
                    className="bg-vibrant-green-100 fill-white"
                    size={30}
                    weight="regular"
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
                    <span>⭐ ({professional.profile.reviews.length})</span>
                  </div>
                  <h5 className="text-lg">
                    {professional.profile.profession.name}
                  </h5>
                </div>
                <p className="">
                  A partir de:{" "}
                  <span className="font-bold text-vibrant-green-100">
                    {professional.profile.serviceValue}
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
                  <MapPin
                    className="fill-vibrant-green-100"
                    weight="bold"
                    size={26}
                  />
                  <span>{professional.address}</span>
                </div>
              </div>
            </div>
            <Availability />
          </div>

          <div className="grid auto-rows-min items-start gap-8">
            <div className="space-y-6 rounded-md bg-background-200 p-8">
              <div className="flex flex-col items-start justify-start gap-2">
                <h2 className="mb-4 text-2xl font-bold text-vibrant-green-100">
                  Tags
                </h2>
                <div className="flex flex-wrap items-center justify-start gap-3">
                  {professional.profile.tags &&
                    professional.profile.tags.split(",").map((tag, index) => {
                      return (
                        <button className="pointer-events-none flex cursor-pointer items-center justify-center gap-1 rounded-md border-2 border-vibrant-green-100 px-3 py-1">
                          {tag}
                        </button>
                      );
                    })}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-vibrant-green-100">
                Sobre mim
              </h2>
              <p>{professional.profile.bio || ""}</p>
            </div>
            <div className="space-y-6 rounded-md bg-background-200 p-8">
              <h2 className="text-2xl font-bold text-vibrant-green-100">
                Avaliações ({professional.profile.reviews.length})
              </h2>

              <div className="grid grid-cols-3 items-start gap-4">
                {professional.profile.reviews.map((_, index) => {
                  return <CommentsCard key={index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
