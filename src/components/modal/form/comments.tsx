"use client";

import SubmitButton from "@/components/button/submit";
import { TextAreaInput } from "@/components/input/textarea";
import { updateSchedulingObservations } from "@/services/schedulingService";
import toastDefaultValues from "@/utils/toast-default-values";
import { X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast, ToastContainer } from "react-toastify";

interface ModalProps {
  selectedScheduling: {
    id: string;
    observations?: string;
  };
  closable?: boolean;
  setShowModal: (e) => void;
}

export function CommentsFormModal({
  selectedScheduling,
  closable = true,
  setShowModal,
}: ModalProps) {
  const [comments, setComments] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!!selectedScheduling.observations) {
      setComments(selectedScheduling.observations);
    }
  }, [selectedScheduling]);

  function handleChange(e: any) {
    setComments(e.target.value);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await updateSchedulingObservations(
      comments,
      selectedScheduling.id,
    );

    toast[response.type](response.message, toastDefaultValues);
    setIsLoading(false);
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <form
        id="commentsForm"
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-lg flex-col gap-3 rounded-lg bg-background-200 p-6 shadow-lg"
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-0 top-0 p-4"
        >
          <X size={28} className="fill-slate-400" />
        </button>
        <h2 className="mb-4 text-xl font-bold text-vibrant-green-100">
          Adicionar comentário
        </h2>
        <TextAreaInput
          name="schedulingComments"
          value={comments}
          onChange={handleChange}
        />
        <div className="mt-6 flex items-center justify-start gap-4">
          <SubmitButton
            form="commentsForm"
            title="Salvar"
            isLoading={isLoading}
          />
          <button
            onClick={() => setShowModal(false)}
            className="hover: rounded-md border-2 border-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-background-300"
          >
            Cancelar
          </button>
        </div>
        <ToastContainer closeOnClick theme="dark" />
      </form>
    </div>,

    document.body,
  );
}
