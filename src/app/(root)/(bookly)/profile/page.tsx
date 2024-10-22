import { CheckboxInput } from "@/components/input/checkbox";
import { SelectInput } from "@/components/input/select";
import { TextInput } from "@/components/input/text";
import { AppointmentHistory } from "@/components/table/appointment-history";
import { spokenLanguages } from "@/utils/common-data";
import { ArrowLineUpRight } from "@phosphor-icons/react";
import Image from "next/image";

export default function Profile() {
  return (
    <section className="mb-8 flex flex-col gap-6">
      {/* Profile and preferences */}
      <div className="w-full rounded-md bg-background-200 p-8">
        <h2 className="mb-8 text-2xl font-bold text-vibrant-green-100">
          Minha conta
        </h2>
        <div className="gap4 grid grid-cols-[20%_1fr]">
          <div className="flex w-full flex-col items-center justify-start gap-4">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full bg-cyan-300">
              <Image
                src="/lucas.jpg"
                alt="Profile pic"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex cursor-pointer items-center justify-center rounded-md border-[1px] border-vibrant-green-100/60 px-4 py-2 duration-100 hover:bg-background-300">
              <span className="text-slate-400">Alterar foto de perfil</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* Personal info */}
            <div>
              <div className="flex w-full items-center justify-between">
                <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
                  Informações pessoais
                </h2>
                <button className="rounded-md border-2 border-vibrant-green-100 px-3 py-1 text-sm duration-100 hover:bg-background-300">
                  Editar informações
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Nome completo"
                  value="Lucas Souza de Oliveira"
                  readonly
                />
                <TextInput label="Email" value="lucas@email.com" readonly />
                <TextInput
                  label="Número de telefone"
                  value="(42) 99999-9999"
                  readonly
                />
                <TextInput
                  label="Data de nascimento"
                  value="28/04/1999"
                  readonly
                />
                <TextInput label="Gênero" value="Masculino" readonly />
                <TextInput
                  label="Endereço"
                  value="Rua Manoel Preto, 152"
                  readonly
                />
              </div>
            </div>

            {/* Password */}
            <div className="">
              <h5 className="mb-4 text-xl font-bold text-vibrant-green-100">
                Senha
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Nova senha"
                  placeholder="Digite sua nova senha"
                  type="password"
                  value="new_password"
                />
                <TextInput
                  label="Confirme sua senha"
                  placeholder="Digite sua senha novamente"
                  type="password"
                  value="confirm_new_password"
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="col-span-full border-t-[1px] border-background-300">
              <h2 className="mb-4 mt-8 text-xl font-bold text-vibrant-green-100">
                Preferências
              </h2>

              <div className="grid grid-cols-[1fr_2fr] items-start gap-6">
                <SelectInput label="Idioma" options={spokenLanguages} />
                <div>
                  <h5>
                    Como deseja receber notificações sobre seus agendamentos?
                  </h5>
                  <div className="flex flex-1 items-center justify-start gap-8 py-2">
                    <CheckboxInput label="E-mail" name="email" />
                    <CheckboxInput label="SMS" name="SMS" />
                    <CheckboxInput label="WhatsApp" name="whatsapp" />
                  </div>
                </div>
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment History */}
      <div className="w-full rounded-md bg-background-200 p-8">
        <h2 className="mb-8 text-2xl font-bold text-vibrant-green-100">
          Histórico de agendamentos
        </h2>

        <AppointmentHistory />
      </div>
    </section>
  );
}
