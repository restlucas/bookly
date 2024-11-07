"use client";

import { UserContext } from "@/contexts/UserContext";
import { getStatus } from "@/services/statusService";
import { CheckSquare, Question, XSquare } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { getSchedulingByStatus } from "@/services/professionalService";
import dayjs from "dayjs";
import { updateSchedulingStatus } from "@/services/schedulingService";
import { toast, ToastContainer } from "react-toastify";
import toastDefaultValues from "@/utils/toast-default-values";
import { CommentsFormModal } from "@/components/modal/form/comments";

interface StatusTypes {
  professional: {
    id: string;
    name: string;
  }[];
  personal: {
    id: string;
    name: string;
  }[];
}

interface SchedulingProps {
  date: Date;
  id: string;
  observations?: string;
  professional: {
    occupation: {
      name: string;
    };
    serviceValue: string;
    user: {
      name: string;
      phone: string;
    };
    serviceType: {
      name: string;
    };
  };
  user: {
    name: string;
    phone: string;
  };
  status: {
    name: string;
  };
}

interface SchedulingTypes {
  professional: SchedulingProps[];
  personal: SchedulingProps[];
}

interface SelectedSchedulingProps {
  id: string;
  observations?: string;
}

export default function Scheduling() {
  const { user } = useContext(UserContext);

  const [status, setStatus] = useState<StatusTypes>();
  const [selectedStatus, setSelectedStatus] = useState({
    professional: "",
    personal: "",
  });
  const [isLoading, setIsLoading] = useState({
    professional: true,
    personal: true,
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedScheduling, setSelectedScheduling] =
    useState<SelectedSchedulingProps>();

  const [scheduling, setScheduling] = useState<SchedulingTypes>();
  const [isLoadingScheduling, setIsLoadingScheduling] = useState({
    professional: true,
    personal: true,
  });

  const steps = {
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
          element: (
            <XSquare className="fill-rose-400" size={32} weight="fill" />
          ),
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
          element: (
            <XSquare className="fill-rose-400" size={32} weight="fill" />
          ),
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

  // Initial status fetch
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    const fetchedStatus = await getStatus();
    setStatus({
      professional: fetchedStatus,
      personal: fetchedStatus,
    });

    const selectedStatusId = fetchedStatus.find(
      (item) => item.name === "Aguardando aprovação",
    )?.id;

    setSelectedStatus({
      professional: selectedStatusId,
      personal: selectedStatusId,
    });

    setIsLoading((prev) => ({ ...prev, professional: false, personal: false }));
  };

  // Watching professional status filter change to fetch professional scheduling
  useEffect(() => {
    user.userType &&
      user.userType.slug === "professional" &&
      fetchScheduling("professional");
  }, [user, selectedStatus.professional]);

  /// Watching personal status filter change to fetch personal scheduling
  useEffect(() => {
    user.userType && user.userType.slug && fetchScheduling("personal");
  }, [user, selectedStatus.personal]);

  // Fetch scheduling based on user role
  const fetchScheduling = async (type: string) => {
    let response;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (type === "professional") {
      response = await getSchedulingByStatus(
        "professional", // userRole passed to prisma where conditional
        user.id,
        selectedStatus.professional,
      );

      setScheduling((prevState) => ({
        ...prevState,
        professional: response,
      }));

      setIsLoadingScheduling((prevState) => ({
        ...prevState,
        professional: false,
      }));
    }

    response = await getSchedulingByStatus(
      "personal", // userRole passed to prisma where conditional
      user.id,
      selectedStatus.personal,
    );
    setScheduling((prevState) => ({
      ...prevState,
      personal: response,
    }));

    setIsLoadingScheduling((prevState) => ({
      ...prevState,
      personal: false,
    }));
  };

  // Handle filter in scheduling table
  const handleSelectedFilter = async (type: string, itemId: string) => {
    if (selectedStatus[type] !== itemId) {
      setIsLoadingScheduling((prevState) => ({
        ...prevState,
        [type]: true,
      }));
      setSelectedStatus((prevState) => ({
        ...prevState,
        [type]: itemId,
      }));
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
      setIsLoadingScheduling((prevState) => ({
        ...prevState,
        professional: true,
      }));

      toast[response.type](response.message, toastDefaultValues);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      fetchScheduling("professional");
    }
  };

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

  return (
    <section className="mb-8 flex flex-col gap-6">
      {Object.keys(user).length !== 0 ? (
        <>
          {user.userType.slug === "professional" && (
            <div className="w-full rounded-md bg-background-200 p-8 shadow-md">
              <div>
                <div className="mb-8 flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                  <h2 className="mb-4 text-2xl text-vibrant-green-100 lg:mb-0">
                    Meus agendamentos (profissional)
                  </h2>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-start overflow-x-scroll lg:mb-0 lg:overflow-hidden">
                    {isLoading.professional ? (
                      <p>...</p>
                    ) : (
                      status.professional &&
                      status.professional.map((item, index) => {
                        return (
                          <button
                            key={item.id}
                            onClick={() =>
                              handleSelectedFilter("professional", item.id)
                            }
                            className={`${item.id === selectedStatus.professional ? "bg-background-300 text-vibrant-green-100" : "bg-transparent text-white"} cursor-pointer rounded-b-md rounded-t-md p-4 text-xs uppercase md:rounded-b-none md:rounded-t-md`}
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
                        {isLoadingScheduling.professional ? (
                          <tr>
                            <td colSpan={7} className="py-6 text-center">
                              Buscando informações...
                            </td>
                          </tr>
                        ) : scheduling.professional.length > 0 ? (
                          scheduling.professional.map((schedule, index) => {
                            return (
                              <tr
                                key={index}
                                className={`${index === 4 ? "" : "border-b"} border-background-300 hover:bg-background-300/50`}
                              >
                                <td className="px-6 py-4">
                                  {`${String(dayjs(schedule.date).format("DD/MM/YYYY"))} ~ ${String(dayjs(schedule.date).hour()).padStart(2, "0")}:${String(dayjs(schedule.date).minute()).padEnd(2, "0")}`}
                                </td>
                                <td className="px-6 py-4">
                                  {schedule.user.name}
                                </td>
                                <td className="px-6 py-4">
                                  {schedule.user.phone}
                                </td>
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
          )}

          <div className="w-full rounded-md bg-background-200 p-8 shadow-md">
            <div>
              <div className="mb-8 flex w-full items-center justify-start">
                <h2 className="text-2xl text-vibrant-green-100">
                  Meus agendamentos{" "}
                  {user.userType.slug === "professional" && "(pessoal)"}
                </h2>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-start overflow-x-scroll lg:mb-0 lg:overflow-hidden">
                  {isLoading.personal ? (
                    <p>...</p>
                  ) : (
                    status.personal &&
                    status.personal.map((item, index) => {
                      return (
                        <button
                          key={item.id}
                          onClick={() =>
                            handleSelectedFilter("personal", item.id)
                          }
                          className={`${item.id === selectedStatus.personal ? "bg-background-300 text-vibrant-green-100" : "bg-transparent text-white"} cursor-pointer rounded-b-md rounded-t-md p-4 text-xs uppercase md:rounded-b-none md:rounded-t-md lg:p-4`}
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
                      {isLoadingScheduling.personal ? (
                        <tr>
                          <td colSpan={7} className="py-6 text-center">
                            Buscando informações...
                          </td>
                        </tr>
                      ) : scheduling.personal.length > 0 ? (
                        scheduling.personal.map((schedule, index) => {
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
        </>
      ) : (
        <div className="w-full animate-pulse space-y-4 rounded-md bg-background-200 p-8 shadow-md">
          <div className="h-10 w-64 rounded-md bg-background-300" />
          <div className="h-10 w-1/3 rounded-md bg-background-300" />
          <div className="h-10 w-full rounded-md bg-background-300" />
        </div>
      )}
      <ToastContainer closeOnClick theme="dark" />

      {showModal && (
        <CommentsFormModal
          selectedScheduling={selectedScheduling}
          setShowModal={setShowModal}
        />
      )}
    </section>
  );
}
