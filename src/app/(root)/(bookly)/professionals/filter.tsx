"use client";

import { CalendarInput } from "@/components/input/calendar";
import { RangeInput } from "@/components/input/range";
import { SelectInput } from "@/components/input/select";
import { spokenLanguages, typeService } from "@/utils/common-data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Filter(props: any) {
  const params = useSearchParams();
  const [filter, setFilter] = useState({} as any);

  function handleSubmit(event: any) {
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-md bg-background-200 p-8"
    >
      <h3 className="text-xl font-bold text-vibrant-green-100">Filtragem</h3>
      <p>{params}</p>

      {/* <SelectInput label="Categoria" options={categoryOptions} />
      <SelectInput label="Especialidade" options={categoryOptions} /> */}
      {/* <SelectInput label="Localização" options={categoryOptions} /> */}
      {/* <CalendarInput />
      <RangeInput />
      <SelectInput label="Tipo de atendimento" options={typeService} /> */}
      {/* <SelectInput label="Idioma falado" options={spokenLanguages} /> */}

      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-md border-2 border-transparent bg-vibrant-green-100 p-3 font-bold duration-150 hover:border-vibrant-green-100 hover:bg-background-300"
      >
        Aplicar filtro
      </button>
    </form>
  );
}
