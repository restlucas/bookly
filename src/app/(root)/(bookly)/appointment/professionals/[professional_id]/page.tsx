"use client";

import { Calendar } from "@/components/calendar";
import { CommentsCard } from "@/components/card/comments";
import { TagCard } from "@/components/card/tag";
import { SelectInput } from "@/components/input/select";
import { TextInput } from "@/components/input/text";
import Modal from "@/components/modal";
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
import { useState } from "react";
import { typeService } from "../filter";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                alt="Professional photo"
                src={"/profile-pic.jpg"}
                fill={true}
              />
            </div>
            <div className="flex h-[200px] w-full flex-col gap-4">
              <div className="leading-6">
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-2xl font-bold text-vibrant-green-100">
                    Metro Boomin
                  </h2>
                  <span>⭐⭐⭐⭐ (42)</span>
                </div>
                <h5 className="text-lg">Médico (a)</h5>
              </div>
              <p className="">
                A partir de:{" "}
                <span className="font-bold text-vibrant-green-100">
                  R$000,00
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
                <span>Telêmaco Borba</span>
              </div>
            </div>
          </div>
          <div className="space-y-6 rounded-md bg-background-200 p-8">
            <h2 className="text-2xl font-bold text-vibrant-green-100">
              Disponibilidade de horários
            </h2>

            <div className="w-1/2">
              <SelectInput label="Tipo de atendimento" options={typeService} />
            </div>

            <Calendar />

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex h-12 w-full items-center justify-center rounded-md border-2 border-transparent bg-vibrant-green-100 duration-100 hover:border-vibrant-green-100 hover:bg-transparent"
            >
              Agendar horário
            </button>
          </div>
        </div>

        <div className="grid auto-rows-min items-start gap-8">
          <div className="space-y-6 rounded-md bg-background-200 p-8">
            <div className="flex flex-col items-start justify-start gap-2">
              <h2 className="text-2xl font-bold text-vibrant-green-100">
                Tags
              </h2>
              <div className="flex flex-wrap items-center justify-start gap-3">
                {tagsArray &&
                  tagsArray.map((tag, index) => {
                    return <TagCard key={index} tag={tag} />;
                  })}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-vibrant-green-100">
              Sobre mim
            </h2>
            <p>
              Proin facilisis justo sit amet malesuada faucibus. Aenean sed
              sapien vitae dui dignissim convallis non ac neque. Sed et felis
              quis ipsum varius dapibus. Curabitur sodales augue sit amet
              lacinia finibus. Phasellus id vehicula dolor. In tincidunt
              porttitor finibus. Praesent malesuada sapien erat, tristique
              molestie libero vehicula id. Sed finibus commodo quam, at
              facilisis justo volutpat non. In dictum nulla non egestas
              porttitor. In iaculis consequat odio et faucibus.
            </p>
            <p>
              Proin facilisis justo sit amet malesuada faucibus. Aenean sed
              sapien vitae dui dignissim convallis non ac neque. Sed et felis
              quis ipsum varius dapibus. Curabitur sodales augue sit amet
              lacinia finibus. Phasellus id vehicula dolor. In tincidunt
              porttitor finibus. Praesent malesuada sapien erat, tristique
              molestie libero vehicula id. Sed finibus commodo quam, at
              facilisis justo volutpat non. In dictum nulla non egestas
              porttitor. In iaculis consequat odio et faucibus.
            </p>
            <p>
              Proin facilisis justo sit amet malesuada faucibus. Aenean sed
              sapien vitae dui dignissim convallis non ac neque. Sed et felis
              quis ipsum varius dapibus. Curabitur sodales augue sit amet
              lacinia finibus. Phasellus id vehicula dolor. In tincidunt
              porttitor finibus. Praesent malesuada sapien erat, tristique
              molestie libero vehicula id. Sed finibus commodo quam, at
              facilisis justo volutpat non. In dictum nulla non egestas
              porttitor. In iaculis consequat odio et faucibus.
            </p>
          </div>
          <div className="space-y-6 rounded-md bg-background-200 p-8">
            <h2 className="text-2xl font-bold text-vibrant-green-100">
              Avaliações (25)
            </h2>

            <div className="grid grid-cols-3 items-start gap-4">
              {Array.from({ length: 3 }).map((_, index) => {
                return <CommentsCard key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
          Finalizar agendamento
        </h2>
        <h5 className="mb-4">Revise as informações selecionadas</h5>

        <TextInput label="Profissional" readonly={true} value="Metro Boomin" />
        <TextInput label="Data" readonly={true} value="29/06/2024" />
        <TextInput label="Valor" readonly={true} value="R$200,00" />
        <TextInput
          label="Tipo de atendimento"
          readonly={true}
          value="Presencial"
        />

        <div className="mt-6 flex items-center justify-start gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="hover: rounded-md bg-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-vibrant-green-200"
          >
            Confirmar agendamento
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="hover: rounded-md border-2 border-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-background-300"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}
