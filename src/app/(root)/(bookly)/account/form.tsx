"use client";

import SubmitButton from "@/components/button/submit";
import { CheckboxInput } from "@/components/input/checkbox";
import { SelectInput } from "@/components/input/select";
import { TextInput } from "@/components/input/text";
import { UserContext } from "@/contexts/UserContext";
import { updateUser } from "@/services/userService";
import { gendersType } from "@/utils/common-data";
import toastDefaultValues from "@/utils/toast-default-values";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export function AccountForm() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [accountForm, setAccountForm] = useState<any>({
    name: "",
    image: "",
    phone: "",
    birth: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setAccountForm(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await updateUser(user.id, accountForm);
    toast[response.type](response.message, toastDefaultValues);
    setIsLoading(false);
  }

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        {user ? (
          <>
            <div className="gap4 grid grid-cols-[20%_1fr]">
              {/* Photo */}
              <div className="flex w-full flex-col items-center justify-start gap-4">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl bg-cyan-300">
                  <Image
                    src={accountForm.image.replace("s96", "s500")}
                    alt="Profile pic"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {/* Personal info */}
                <div>
                  <div className="flex w-full items-center justify-between">
                    <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
                      Informações pessoais
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="Nome completo"
                      name="name"
                      value={accountForm.name || ""}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      disabled={true}
                    />
                    <TextInput
                      label="Número de telefone"
                      name="phone"
                      value={accountForm.phone || ""}
                      placeholder="Não preenchido"
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Data de nascimento"
                      name="birth"
                      type="date"
                      value={accountForm.birth || ""}
                      placeholder="11/11/2000"
                      onChange={handleChange}
                    />
                    <SelectInput
                      label="Gênero"
                      name="gender"
                      value={accountForm.gender || ""}
                      options={gendersType}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Endereço"
                      name="address"
                      value={accountForm.address || ""}
                      placeholder="Não preenchido"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Preferences */}
                <div className="border-l-[1px] border-background-300 pl-8">
                  <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
                    Preferências
                  </h2>

                  <div className="grid grid-cols-[1fr] items-start gap-6">
                    {/* <SelectInput
                    label="Idioma"
                    name="spokenLanguages"
                    value={accountForm.}
                    options={spokenLanguages}
                    onChange={handleChange}
                  /> */}
                    <div>
                      <h5>
                        Como deseja receber notificações sobre seus
                        agendamentos?
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
            <div className="mt-2 flex items-center justify-end gap-4">
              <SubmitButton title="Salvar alterações" isLoading={isLoading} />
            </div>
          </>
        ) : (
          <p>carregando...</p>
        )}
      </form>
      <ToastContainer closeOnClick theme="dark" />
    </>
  );
}
