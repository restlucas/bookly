"use client";

import { SelectInput } from "@/components/input/select";
import { TextInput } from "@/components/input/text";
import { TextAreaInput } from "@/components/input/textarea";
import { UserContext } from "@/contexts/UserContext";
import {
  getProfessionalProfile,
  updateProfessionalProfile,
} from "@/services/professionalService";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  getAllCategories,
  getProfessionByCategory,
} from "@/services/professionService";
import toastDefaultValues from "@/utils/toast-default-values";
import { toast, ToastContainer } from "react-toastify";
import SubmitButton from "@/components/button/submit";
import { serviceType } from "@/utils/common-data";
import { X } from "@phosphor-icons/react";

export interface ProfileProps {
  id: string;
  bio?: string;
  professionId?: string;
  professionCategoryId?: string;
  serviceType?: string;
  serviceValue?: string;
  tags?: string;
}

export function ProfileForm() {
  const { user } = useContext(UserContext);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any>();
  const [professions, setProfessions] = useState<any>();
  const [profileForm, setProfileForm] = useState<ProfileProps>({
    id: "",
    bio: "",
    professionId: "",
    professionCategoryId: "",
    serviceType: "",
    serviceValue: "",
    tags: "",
  });

  // Professional profile fetch
  const fetchProfile = async () => {
    if (user) {
      const profile = await getProfessionalProfile(user.id);
      setProfileForm({
        id: user.id,
        bio: profile.bio,
        professionId: profile.professionId,
        professionCategoryId: profile.professionCategoryId,
        serviceType: profile.serviceType,
        serviceValue: profile.serviceValue,
        tags: profile.tags,
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);
  //

  // Categories fetch
  const fetchCategories = async () => {
    const fetchedCategories = await getAllCategories();
    setCategories(fetchedCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  //

  // Profession by categories fetch
  const fetchProfessions = async () => {
    if (profileForm.professionCategoryId) {
      const fetchedProfessions = await getProfessionByCategory(
        profileForm.professionCategoryId,
      );
      setProfessions(fetchedProfessions);
    }
  };

  useEffect(() => {
    fetchProfessions();
  }, [profileForm.professionCategoryId]);
  //

  function handleTags() {
    setProfileForm((prevState) => ({
      ...prevState,
      tags: prevState.tags ? `${prevState.tags},${tagInput}` : tagInput,
    }));
    setTagInput("");
  }

  function removeTag(index: number, tag: string) {
    const newTags = profileForm.tags
      .split(",")
      .filter((_, tagIndex) => tagIndex !== index)
      .join(",");

    setProfileForm((prevState) => ({
      ...prevState,
      tags: newTags,
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfileForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await updateProfessionalProfile(user.id, profileForm);
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
                    src={user.image.replace("s96", "s500")}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* About me */}
                <div className="grid grid-cols-2 gap-4">
                  <h2 className="col-span-full text-xl font-bold text-vibrant-green-100">
                    Sobre mim
                  </h2>

                  <TextInput
                    label="Nome completo"
                    name="fullname"
                    value={user.name}
                    onChange={handleChange}
                    disabled={true}
                  />
                  <div className="col-span-1" />

                  {/* Descomente e ajuste conforme necessário */}
                  <SelectInput
                    label="Categoria da profissão"
                    name="professionCategoryId"
                    value={profileForm.professionCategoryId || ""}
                    options={categories && categories}
                    onChange={handleChange}
                  />
                  <SelectInput
                    label="Profissão"
                    name="professionId"
                    value={profileForm.professionId || ""}
                    options={professions}
                    onChange={handleChange}
                  />
                  <SelectInput
                    label="Tipo de atendimento"
                    name="serviceType"
                    value={profileForm.serviceType || ""}
                    options={serviceType}
                    onChange={handleChange}
                  />

                  <TextInput
                    label="Valor do atendimento"
                    placeholder="R$000,00"
                    name="serviceValue"
                    value={profileForm.serviceValue || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Tags */}
                <div className="">
                  <h2 className="col-span-full mb-4 text-xl font-bold text-vibrant-green-100">
                    Tags
                  </h2>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-start gap-4">
                      <input
                        type="hidden"
                        name="tags"
                        value={profileForm.tags}
                      />
                      <input
                        className="rounded-md border-2 border-slate-400 bg-background-300 p-2"
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                      />
                      <button
                        onClick={handleTags}
                        type="button"
                        className="flex w-[150px] cursor-pointer items-center justify-center rounded-md bg-vibrant-green-100 px-3 py-2 duration-100 hover:bg-vibrant-green-200"
                      >
                        Inserir
                      </button>
                    </div>
                    <div className="flex w-full flex-wrap gap-2">
                      {profileForm.tags &&
                        profileForm.tags.split(",").map((tag, index) => {
                          return (
                            <button
                              onClick={() => removeTag(index, tag)}
                              type="button"
                              className="flex items-center justify-center gap-1 rounded-md border-2 border-vibrant-green-100 px-3 py-1"
                            >
                              {tag}
                              <X
                                className="fill-vibrant-100 cursor-pointer"
                                size={18}
                              />
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="col-span-full">
                  <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
                    Bio
                  </h2>

                  <TextAreaInput
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleChange}
                  />
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
