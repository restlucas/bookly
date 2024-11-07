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
  getOccupationByCategory,
} from "@/services/professionService";
import toastDefaultValues from "@/utils/toast-default-values";
import { toast, ToastContainer } from "react-toastify";
import SubmitButton from "@/components/button/submit";
import { X } from "@phosphor-icons/react";
import { getServiceType } from "@/services/schedulingService";
import {
  ProfessionalProfileData,
  validateProfessionalProfileForm,
} from "@/utils/validators";
import { formatCurrency } from "@/utils/format-functions";

interface CategoriesProps {
  id: string;
  createdAt?: Date;
  name: string;
  slug: string;
}

interface OccupationProps {
  id: string;
  createdAt?: Date;
  name: string;
  slug: string;
}

interface ServiceTypesProps {
  id: string;
  name: string;
  slug: string;
}

export function ProfessionalProfileForm() {
  const { user } = useContext(UserContext);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState<CategoriesProps[]>();
  const [occupations, setOccupations] = useState<OccupationProps[]>();
  const [serviceTypes, setServiceTypes] = useState<ServiceTypesProps[]>();

  const [professionalProfile, setProfessionalProfileForm] =
    useState<ProfessionalProfileData>({
      bio: "",
      occupationId: "",
      categoryId: "",
      serviceValue: "",
      tags: "",
      serviceTypeId: "",
    });

  useEffect(() => {
    fetchProfessionalProfile();
  }, [user]);

  useEffect(() => {
    fetchCategories();
    fetchServiceTypes();
  }, []);

  useEffect(() => {
    fetchOccupations();
  }, [professionalProfile.categoryId]);

  // Professional profile fetch
  const fetchProfessionalProfile = async () => {
    if (Object.keys(user).length !== 0) {
      const professionalProfile = await getProfessionalProfile(user.id);
      setProfessionalProfileForm({
        bio: professionalProfile.bio,
        occupationId: professionalProfile.occupationId,
        categoryId: professionalProfile.categoryId,
        serviceTypeId: professionalProfile.serviceType.id,
        serviceValue: professionalProfile.serviceValue,
        tags: professionalProfile.tags,
      });
    }
  };

  // Categories fetch
  const fetchCategories = async () => {
    const fetchedCategories = await getAllCategories();
    setCategories(fetchedCategories);
  };

  const fetchServiceTypes = async () => {
    const response = await getServiceType();
    setServiceTypes(response);
  };

  // Profession by categories fetch
  const fetchOccupations = async () => {
    if (professionalProfile.categoryId) {
      const fetchedProfessions = await getOccupationByCategory(
        professionalProfile.categoryId,
      );
      setOccupations(fetchedProfessions);
    }
  };

  function handleTags() {
    setProfessionalProfileForm((prevState) => ({
      ...prevState,
      tags: prevState.tags ? `${prevState.tags},${tagInput}` : tagInput,
    }));
    setTagInput("");
  }

  function removeTag(index: number, tag: string) {
    const newTags = professionalProfile.tags
      .split(",")
      .filter((_, tagIndex) => tagIndex !== index)
      .join(",");

    setProfessionalProfileForm((prevState) => ({
      ...prevState,
      tags: newTags,
    }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "serviceValue" ? formatCurrency(value) : value;

    setProfessionalProfileForm((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors =
      validateProfessionalProfileForm(professionalProfile);

    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).map((error, index) => {
        toast.error(error, toastDefaultValues);
      });
    } else {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await updateProfessionalProfile(
        user.id,
        professionalProfile,
      );
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
                    src={user.image ? user.image.replace("s96", "s500") : ""}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* About me */}
                <div className="grid grid-cols-1 gap-4 text-lg lg:grid-cols-2">
                  <h3 className="col-span-full text-xl font-bold text-vibrant-green-100">
                    Sobre mim
                  </h3>

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
                    name="categoryId"
                    value={professionalProfile.categoryId || ""}
                    options={categories && categories}
                    onChange={handleChange}
                  />
                  <SelectInput
                    label="Profissão"
                    name="occupationId"
                    value={professionalProfile.occupationId || ""}
                    options={occupations}
                    onChange={handleChange}
                  />
                  <SelectInput
                    label="Tipo de atendimento"
                    name="serviceTypeId"
                    value={professionalProfile.serviceTypeId || ""}
                    options={serviceTypes}
                    onChange={handleChange}
                  />

                  <TextInput
                    label="Valor do atendimento"
                    placeholder="R$000,00"
                    name="serviceValue"
                    value={professionalProfile.serviceValue || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Tags */}
                <div className="">
                  <h3 className="col-span-full mb-4 text-xl font-bold text-vibrant-green-100">
                    Tags
                  </h3>

                  <div className="flex flex-col gap-4">
                    <div className="flex w-full items-center justify-start gap-4">
                      <input
                        type="hidden"
                        name="tags"
                        value={professionalProfile.tags}
                      />
                      <input
                        className="flex-1 rounded-md border-2 border-slate-400 bg-background-300 p-2 lg:flex-none"
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
                      {professionalProfile.tags &&
                        professionalProfile.tags
                          .split(",")
                          .map((tag, index) => {
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
                <div className="col-span-full mb-8">
                  <h3 className="mb-4 text-xl font-bold text-vibrant-green-100">
                    Bio
                  </h3>

                  <TextAreaInput
                    name="bio"
                    value={professionalProfile.bio}
                    onChange={handleChange}
                    placeholder="Conte um pouco sobre você"
                  />
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
                <div className="col-span-1" />
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

              {/* Tags */}
              <div className="">
                <div className="h-10 w-20 rounded-md bg-background-300" />
                <div className="flex flex-col gap-4">
                  <div className="flex w-full items-center justify-start gap-4" />
                </div>
              </div>

              {/* Bio */}
              <div className="col-span-full mb-8">
                <div className="mb-4 h-10 w-20 rounded-md bg-background-300" />

                <div className="h-52 w-full rounded-md bg-background-300" />
              </div>
            </div>
          </div>
        )}
      </form>
      <ToastContainer closeOnClick theme="dark" />
    </>
  );
}
