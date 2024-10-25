"use client";

import { X } from "@phosphor-icons/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  closable?: boolean;
  children: React.ReactNode;
}

export function FormModal({ title, closable = true, children }: ModalProps) {
  function handleSubmit(event: any) {
    event.preventDefault();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-lg flex-col gap-3 rounded-lg bg-background-200 p-6 shadow-lg"
      >
        <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
          {title}
        </h2>
        {children}
        <div className="mt-6 flex items-center justify-start gap-4">
          <button className="hover: rounded-md bg-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-vibrant-green-200">
            Confirmar
          </button>
          <button className="hover: rounded-md border-2 border-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-background-300">
            Cancelar
          </button>
        </div>
      </form>
    </div>,

    document.body,
  );
}
