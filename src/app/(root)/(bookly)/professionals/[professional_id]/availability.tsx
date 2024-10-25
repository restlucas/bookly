import { Calendar } from "@/components/calendar";
import { SelectInput } from "@/components/input/select";
import { TextInput } from "@/components/input/text";
import Modal from "@/components/modal";
import { typeService } from "@/utils/common-data";
import { useState } from "react";

export function Availability() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="space-y-6 rounded-md bg-background-200 p-8">
        <h2 className="text-2xl font-bold text-vibrant-green-100">
          Disponibilidade de horários
        </h2>

        <div className="w-1/2">
          <SelectInput
            label="Tipo de atendimento"
            name="serviceType"
            options={typeService}
          />
        </div>

        <Calendar />

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex h-12 w-full items-center justify-center rounded-md border-2 border-transparent bg-vibrant-green-100 duration-100 hover:border-vibrant-green-100 hover:bg-transparent"
        >
          Agendar horário
        </button>
      </div>

      {/* Modal */}
      <Modal
        title="Finalizar agendamento"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h5 className="mb-4">Revise as informações selecionadas</h5>

        <TextInput
          name="serviceProfessionalName"
          label="Profissional"
          readOnly={true}
          value="Metro Boomin"
        />
        <TextInput
          name="serviceDate"
          label="Data"
          readOnly={true}
          value="29/06/2024"
        />
        <TextInput
          name="serviceValue"
          label="Valor"
          readOnly={true}
          value="R$200,00"
        />
        <TextInput
          name="serviceType"
          label="Tipo de atendimento"
          readOnly={true}
          value="Presencial"
        />

        <div className="mt-6 flex items-center justify-start gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="hover: rounded-md bg-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-vibrant-green-200"
          >
            Confirmar agendamento
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="hover: rounded-md border-2 border-vibrant-green-100 px-4 py-2 text-white duration-100 hover:bg-background-300"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </>
  );
}
