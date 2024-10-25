"use client";

import { UserContext } from "@/contexts/UserContext";
import { getUserFavorites } from "@/services/userService";
import { useContext, useEffect, useState } from "react";
import { Card } from "./card";

export default function Favorites() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState<any>();

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await getUserFavorites(user.id);
      console.log(response);
      setFavorites(response);
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);
  return (
    <section className="mb-8 flex flex-col gap-6">
      <div className="w-full rounded-md bg-background-200 p-8">
        <h2 className="mb-8 text-2xl font-bold text-vibrant-green-100">
          Salvos
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {favorites &&
            favorites.map((favorited, index) => {
              return <Card professional={favorited} />;
            })}
        </div>
      </div>
    </section>
  );
}
