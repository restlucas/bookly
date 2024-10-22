import { ProfessionalCard } from "@/components/card/professional";

export default function List() {
  return (
    <div className="flex-1 space-y-6 rounded-md bg-background-200 p-8">
      <h2 className="text-xl font-bold text-vibrant-green-100">
        Resultados da busca
      </h2>

      <div className="flex flex-col gap-6">
        {Array.from({ length: 15 }).map((_, index) => {
          return <ProfessionalCard key={index} professional_id={index} />;
        })}
      </div>
    </div>
  );
}
