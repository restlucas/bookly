"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AppointmentsProps,
  SchedulingProps,
  SchedulingTypes,
  SelectedSchedulingProps,
} from "./page";
import { updateSchedulingStatus } from "@/services/schedulingService";
import toastDefaultValues from "@/utils/toast-default-values";
import { toast, ToastContainer } from "react-toastify";
import { getSchedulingByStatus } from "@/services/professionalService";
import { CommentsFormModal } from "@/components/modal/form/comments";
import dayjs from "dayjs";
import { CheckSquare, Question, XSquare } from "@phosphor-icons/react";

export const steps = {
  "Aguardando aprovação": {
    options: [
      {
        name: "approve",
        title: "Aprovar",
        nextStep: "Em andamento",
        element: (
          <CheckSquare
            className="cursor-pointer fill-vibrant-green-100 duration-150 hover:fill-vibrant-green-200"
            size={32}
            weight="fill"
          />
        ),
      },
      {
        name: "repprove",
        title: "Reprovar",
        nextStep: "Cancelado",
        element: <XSquare className="fill-rose-400" size={32} weight="fill" />,
      },
    ],
  },
  "Em andamento": {
    options: [
      {
        name: "conclude",
        title: "Concluir",
        nextStep: "Concluído",
        element: (
          <CheckSquare
            className="cursor-pointer fill-vibrant-green-100 duration-150 hover:fill-vibrant-green-200"
            size={32}
            weight="fill"
          />
        ),
      },
      {
        name: "cancel",
        title: "Cancelar",
        nextStep: "Cancelado",
        element: <XSquare className="fill-rose-400" size={32} weight="fill" />,
      },
      {
        name: "not-attend",
        title: "Não compareceu",
        nextStep: "Não compareceu",
        element: (
          <Question className="fill-orange-400" size={32} weight="fill" />
        ),
      },
    ],
  },
};

export function ProfessionalAppointments({ user, status }: AppointmentsProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedScheduling, setSelectedScheduling] =
    useState<SelectedSchedulingProps>();

  const [scheduling, setScheduling] = useState<SchedulingProps[]>();
  const [isLoadingScheduling, setIsLoadingScheduling] = useState(true);

  // Handle filter in scheduling table
  const handleSelectedFilter = async (itemId: string) => {
    if (selectedStatus !== itemId) {
      setIsLoadingScheduling(true);
      setSelectedStatus(itemId);
    }
  };

  const handleStatus = async (
    operation: { name: string; title: string; nextStep: string },
    schedulingId: string,
  ) => {
    const rsp = confirm(
      `Confirmar novo status do agendamento para: ${operation.title.toLowerCase()}?`,
    );

    if (rsp) {
      const response = await updateSchedulingStatus(operation, schedulingId);
      setIsLoadingScheduling(true);

      toast[response.type](response.message, toastDefaultValues);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      fetchScheduling();
    }
  };

  const fetchScheduling = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await getSchedulingByStatus(
      "professional", // userRole passed to prisma where conditional
      user.id,
      selectedStatus,
    );
    setScheduling(response);

    setIsLoadingScheduling(false);
  }, [selectedStatus, selectedStatus, user.id]);

  const showCommentModal = async (
    scheduleId: string,
    scheduleObservations: string,
  ) => {
    setSelectedScheduling({
      id: scheduleId,
      observations: scheduleObservations,
    });
    setShowModal(true);
  };

  useEffect(() => {
    if (user.role) fetchScheduling();
  }, [user, fetchScheduling]);

  useEffect(() => {
    if (status.length !== 0) {
      setIsLoading(false);
      const selectedStatusId = status.find(
        (item) => item.name === "Aguardando aprovação",
      )?.id;

      setSelectedStatus(selectedStatusId);
    }
  }, [status]);

  return (
    <>
      <div className="w-full rounded-md bg-background-200 p-8 shadow-md">
        <div>
          <div className="mb-8 flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-between">
            <h2 className="mb-4 text-2xl text-vibrant-green-100 lg:mb-0">
              Meus agendamentos (profissional)
            </h2>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-start overflow-x-scroll lg:mb-0 lg:overflow-hidden">
              {isLoading ? (
                <div className="w-44 animate-pulse rounded-md bg-background-300 py-6 md:rounded-b-none md:rounded-tl-md md:rounded-tr-md" />
              ) : (
                status.map((item) => {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectedFilter(item.id)}
                      className={`${item.id === selectedStatus ? "bg-background-300 text-vibrant-green-100" : "bg-transparent text-white"} cursor-pointer rounded-b-md rounded-t-md p-4 text-xs uppercase md:rounded-b-none md:rounded-t-md`}
                    >
                      {item.name}
                    </button>
                  );
                })
              )}
            </div>

            <div className="w-full overflow-x-scroll lg:overflow-hidden">
              <table className="font-regular w-full text-left text-sm shadow-md rtl:text-right">
                <thead className="bg-background-300 text-xs uppercase">
                  <tr className="">
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Cliente</th>
                    <th className="px-6 py-3">Telefone</th>
                    <th className="px-6 py-3">Observações</th>
                    <th className="px-6 py-3">Valor</th>
                    <th className="px-6 py-3">Tipo</th>
                    <th className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingScheduling ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center">
                        Buscando informações...
                      </td>
                    </tr>
                  ) : scheduling.length > 0 ? (
                    scheduling.map((schedule, index) => {
                      return (
                        <tr
                          key={index}
                          className={`${index === 4 ? "" : "border-b"} border-background-300 hover:bg-background-300/50`}
                        >
                          <td className="px-6 py-4">
                            {`${String(dayjs(schedule.date).format("DD/MM/YYYY"))} ~ ${String(dayjs(schedule.date).hour()).padStart(2, "0")}:${String(dayjs(schedule.date).minute()).padEnd(2, "0")}`}
                          </td>
                          <td className="px-6 py-4">{schedule.user.name}</td>
                          <td className="px-6 py-4">{schedule.user.phone}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                showCommentModal(
                                  schedule.id,
                                  schedule.observations,
                                )
                              }
                              className={`flex cursor-pointer items-center justify-start gap-2 rounded-md border-[1px] border-slate-400 px-2 py-1 text-slate-400 duration-100 hover:bg-slate-300/20`}
                            >
                              <span>Visualizar comentário</span>
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.serviceValue}
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.serviceType.name}
                          </td>
                          <td className="flex items-center justify-start gap-1 px-6 py-4">
                            {steps[schedule.status.name] &&
                              steps[schedule.status.name].options.map(
                                (step, index) => {
                                  return (
                                    <button
                                      className="cursor-pointer"
                                      key={index}
                                      title={step.title}
                                      onClick={() =>
                                        handleStatus(
                                          {
                                            name: step.name,
                                            title: step.title,
                                            nextStep: step.nextStep,
                                          },
                                          schedule.id,
                                        )
                                      }
                                    >
                                      {step.element}
                                    </button>
                                  );
                                },
                              )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-6 text-center">
                        Nenhum agendamento encontrado :(
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer closeOnClick theme="dark" />
      {showModal && (
        <CommentsFormModal
          selectedScheduling={selectedScheduling}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
