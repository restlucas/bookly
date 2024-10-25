import { ProfessionalCard } from "@/components/card/professional";
import { getProfessionals } from "@/services/professionalService";

export default async function List() {
  const professionals = await getProfessionals();

  return (
    <div className="flex-1 space-y-6 rounded-md bg-background-200 p-8">
      <h2 className="text-xl font-bold text-vibrant-green-100">
        Resultados da busca
      </h2>

      {professionals && (
        <div className="flex flex-col gap-6">
          {professionals.map((professional, index) => {
            return (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
