"use client";

import { UserContext } from "@/contexts/UserContext";
import { BookmarkSimple } from "@phosphor-icons/react";
import { useContext } from "react";

export function FavoriteButton({
  professionalId,
  marked = false,
  variant = false,
}: any) {
  const { handleFavorite } = useContext(UserContext);

  return (
    <button onClick={() => handleFavorite(professionalId)} className="group">
      <BookmarkSimple
        size={30}
        weight={`${marked ? "fill" : "regular"}`}
        className={`cursor-pointer ${variant ? "bg-vibrant-green-100 fill-white" : "fill-vibrant-green-100 duration-100 group-hover:fill-vibrant-green-200"}`}
      />
    </button>
  );
}
