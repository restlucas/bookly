"use client";

import { SelectInput } from "@/components/input/select";
import {
  getAllCategories,
  getOccupationByCategory,
} from "@/services/professionService";
import { getServiceType } from "@/services/schedulingService";
import { Trash } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoriesProps {
  id: string;
  name: string;
  slug: string;
  createdAt?: Date;
}

interface OccupationsProps {
  id: string;
  name: string;
  slug: string;
  createdAt?: Date;
}

interface ServiceTypesProps {
  id: string;
  name: string;
  slug: string;
}

export default function Filter(props: any) {
  const params = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] = useState<CategoriesProps[]>();
  const [occupations, setOccupations] = useState<OccupationsProps[]>();
  const [serviceTypes, setServiceTypes] = useState<ServiceTypesProps[]>();

  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      setCategories(response);
    };

    const fetchServiceType = async () => {
      const response = await getServiceType();
      setServiceTypes(response);
    };

    fetchCategories();
    fetchServiceType();
  }, []);

  useEffect(() => {
    const fetchOccupation = async () => {
      if (filters.category) {
        const response = await getOccupationByCategory(filters.category);
        setOccupations(response);
      }
    };

    fetchOccupation();
  }, [filters.category]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const query = new URLSearchParams(filters).toString();
    router.replace(`?${query}`);
  };

  const clearFilter = () => {
    router.replace(`?`);
    setFilters({});
  };

  return (
    <div className="space-y-6 rounded-md bg-background-200 p-8">
      <h3 className="text-xl font-bold text-vibrant-green-100">Filtragem</h3>

      <SelectInput
        name="category"
        label="Categoria"
        value={filters.category || ""}
        options={categories}
        onChange={handleChange}
      />
      <SelectInput
        name="occupation"
        label="Ocupação"
        value={filters.occupation || ""}
        options={occupations}
        onChange={handleChange}
      />
      <SelectInput
        name="serviceType"
        value={filters.serviceType || ""}
        label="Tipo de atendimento"
        options={serviceTypes}
        onChange={handleChange}
      />

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <button
          type="button"
          onClick={applyFilters}
          className="flex items-center justify-center rounded-md border-2 border-transparent bg-vibrant-green-100 p-3 font-bold duration-150 hover:border-vibrant-green-100 hover:bg-background-300"
        >
          <span>Aplicar filtro</span>
        </button>

        <button
          type="button"
          onClick={clearFilter}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-transparent bg-background-300 p-3 duration-150 hover:border-vibrant-green-100"
        >
          <span className="text-sm">Redefinir</span>
          <Trash size={22} weight="fill" className="fill-slate-400" />
        </button>
      </div>
    </div>
  );
}