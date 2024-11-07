"use client";

import SubmitButton from "@/components/button/submit";
import { CheckboxInput } from "@/components/input/checkbox";
import { SelectInput } from "@/components/input/select";
import { TextInput } from "@/components/input/text";
import { UserContext } from "@/contexts/UserContext";
import { updateUser } from "@/services/userService";
import { gendersType } from "@/utils/common-data";
import { formatPhone } from "@/utils/format-functions";
import toastDefaultValues from "@/utils/toast-default-values";
import { AccountFormData, validateAccountForm } from "@/utils/validators";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export function AccountForm() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [accountForm, setAccountForm] = useState<AccountFormData>({
    name: "",
    image: "",
    phone: "",
    birth: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setAccountForm({
        name: user.name,
        image: user.image,
        phone: user.phone,
        birth: user.birth,
        gender: user.gender,
        address: user.address,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formattedValue = name === "phone" ? formatPhone(value) : value;

    setAccountForm((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    const validationErrors = validateAccountForm(accountForm);

    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).map((error) => {
        toast.error(error, toastDefaultValues);
      });
    } else {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await updateUser(user.id, accountForm);
      toast[response.type](response.message, toastDefaultValues);
      setIsLoading(false);
    }
  }

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        {Object.keys(user).length !== 0 ? (
          <>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[20%_1fr] lg:gap-4">
              {/* Photo */}
              <div className="flex w-full flex-col items-center justify-start gap-4">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl bg-cyan-300">
                  <Image
                    src={
                      accountForm.image
                        ? accountForm.image.replace("s96", "s500")
                        : ""
                    }
                    alt="Profile pic"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Personal info */}
                <div>
                  <div className="flex w-full items-center justify-between">
                    <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
                      Informações pessoais
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6 text-lg lg:grid-cols-2 lg:gap-4 lg:text-base">
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
                      maxLength={15}
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
                <div className="lg:border-l-[1px] lg:border-background-300 lg:pl-8">
                  <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
                    Preferências
                  </h2>

                  <div className="grid grid-cols-[1fr] items-start gap-6">
                    <div>
                      <h5>
                        Deseja receber notificações sobre seus agendamentos por
                        e-mail?
                      </h5>
                      <div className="flex flex-col items-start justify-start gap-4 py-2 lg:flex-row lg:items-center lg:gap-8">
                        <CheckboxInput label="Sim" name="notifyByEmail" />
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
          <div className="grid animate-pulse grid-cols-1 gap-10 lg:grid-cols-[20%_1fr] lg:gap-4">
            <div className="flex w-full flex-col items-center justify-start gap-4">
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-xl bg-background-300"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* About me */}
              <div className="grid grid-cols-1 gap-4 text-lg lg:grid-cols-2">
                <div className="col-span-full h-10 w-20 rounded-md bg-background-300" />

                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-28 rounded-md bg-background-300" />
                  <div className="h-10 w-full rounded-md bg-background-300" />
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
      <ToastContainer closeOnClick theme="dark" />
    </>
  );
}
