import { ProfessionalCard } from "@/components/card/professional";
import { getProfessionals } from "@/services/professionalService";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function List({ searchParams }: Props) {
  const category = searchParams.category as string;
  const occupation = searchParams.occupation as string;
  const serviceType = searchParams.serviceType as string;

  const filterQuery = {
    category,
    occupation,
    serviceType,
  };

  const list = await getProfessionals(filterQuery);

  return (
    <div className="flex-1 space-y-6 rounded-md bg-background-200 p-8">
      <h2 className="text-xl font-bold text-vibrant-green-100">
        Resultados da busca: {list.count}
      </h2>

      {list ? (
        list.count > 0 ? (
          <div className="flex flex-col gap-6">
            {list.professionals.map((professional, index) => {
              return (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full text-center">
            <p className="text-lg text-vibrant-green-100">
              Nenhum resultado encontrado 😪
            </p>
            <p className="text-sm font-bold text-slate-400">
              Tente red os filtros!
            </p>
          </div>
        )
      ) : (
        <div className="anime-pulse flex flex-col gap-6">
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <div
                key={index}
                className="h-[184px] w-full rounded-md bg-background-300 p-3"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
