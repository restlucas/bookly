"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AppointmentsProps,
  SchedulingProps,
  SelectedSchedulingProps,
} from "./page";
import { getSchedulingByStatus } from "@/services/professionalService";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { CommentsFormModal } from "@/components/modal/form/comments";

export function PersonalAppointments({ user, status }: AppointmentsProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedScheduling, setSelectedScheduling] =
    useState<SelectedSchedulingProps>();

  const [scheduling, setScheduling] = useState<SchedulingProps[]>([]);
  const [isLoadingScheduling, setIsLoadingScheduling] = useState<boolean>(true);

  // Handle filter in scheduling table
  const handleSelectedFilter = async (itemId: string) => {
    if (selectedStatus !== itemId) {
      setIsLoadingScheduling(true);
      setSelectedStatus(itemId);
    }
  };

  const fetchScheduling = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await getSchedulingByStatus(
      "personal",
      user.id,
      selectedStatus,
    );
    setScheduling(response);

    setIsLoadingScheduling(false);
  }, [selectedStatus, user.id]);

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
          <div className="mb-8 flex w-full items-center justify-start">
            <h2 className="text-2xl text-vibrant-green-100">
              Meus agendamentos {user.role === "professional" && "(pessoal)"}
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
                      className={`${item.id === selectedStatus ? "bg-background-300 text-vibrant-green-100" : "bg-transparent text-white"} cursor-pointer rounded-b-md rounded-t-md p-4 text-xs uppercase md:rounded-b-none md:rounded-t-md lg:p-4`}
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
                    <th className="px-6 py-3">Profissional</th>
                    <th className="px-6 py-3">Ocupação</th>
                    <th className="px-6 py-3">Telefone</th>
                    <th className="px-6 py-3">Observações</th>
                    <th className="px-6 py-3">Valor</th>
                    <th className="px-6 py-3">Tipo</th>
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
                          key={schedule.id}
                          className={`${index === 4 ? "" : "border-b"} border-background-300 hover:bg-background-300/50`}
                        >
                          <td className="px-6 py-4">
                            {`${String(dayjs(schedule.date).format("DD/MM/YYYY"))} ~ ${String(dayjs(schedule.date).hour()).padStart(2, "0")}:${String(dayjs(schedule.date).minute()).padEnd(2, "0")}`}
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.user.name}
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.occupation.name}
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.user.phone}
                          </td>
                          <td className="px-6 py-4">
                            <button className="flex cursor-pointer items-center justify-start gap-2 rounded-md border-[1px] border-slate-400 px-2 py-1 text-slate-400 duration-100 hover:bg-slate-300/20">
                              <span>Visualizar comentário</span>
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.serviceValue}
                          </td>
                          <td className="px-6 py-4">
                            {schedule.professional.serviceType.name}
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
      {showModal && (
        <CommentsFormModal
          selectedScheduling={selectedScheduling}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
