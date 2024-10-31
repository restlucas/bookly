"use client";

import { UserContext } from "@/contexts/UserContext";
import { getStatus } from "@/services/statusService";
import { CheckSquare, Question, XSquare } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { getSchedulingByStatus } from "@/services/professionalService";
import dayjs from "dayjs";

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
  profile: {
    profession: {
      name: string;
    };
    serviceType: string;
    serviceValue: string;
    user: {
      name: string;
      phone: string;
    };
  };
  user: {
    name: string;
    phone: string;
  };
}

interface SchedulingTypes {
  professional: SchedulingProps[];
  personal: SchedulingProps[];
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

  const [scheduling, setScheduling] = useState<SchedulingTypes>();
  const [isLoadingScheduling, setIsLoadingScheduling] = useState({
    professional: true,
    personal: true,
  });

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

    console.log(fetchedStatus);

    setSelectedStatus({
      professional: selectedStatusId,
      personal: selectedStatusId,
    });

    setIsLoading((prev) => ({ ...prev, professional: false, personal: false }));
  };

  // Watching professional status filter change to fetch professional scheduling
  useEffect(() => {
    user.role &&
      user.role === "professional" &&
      fetchScheduling("professional");
  }, [user, selectedStatus.professional]);

  /// Watching personal status filter change to fetch personal scheduling
  useEffect(() => {
    user.role && fetchScheduling("personal");
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
  async function handleSelectedFilter(type: string, itemId: string) {
    setIsLoadingScheduling((prevState) => ({
      ...prevState,
      [type]: true,
    }));
    setSelectedStatus((prevState) => ({
      ...prevState,
      [type]: itemId,
    }));
  }

  return (
    <section className="mb-8 flex flex-col gap-6">
      {Object.keys(user).length !== 0 ? (
        <>
          {user.role === "professional" && (
            <div className="w-full rounded-md bg-background-200 p-8 shadow-md">
              <div>
                <div className="mb-8 flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-between">
                  <h2 className="mb-4 text-2xl text-vibrant-green-100 lg:mb-0">
                    Meus agendamentos (profissional)
                  </h2>
                  <div className="flex items-center justify-end gap-5">
                    <div className="flex items-center justify-center gap-1">
                      <CheckSquare
                        className="fill-vibrant-green-100"
                        size={20}
                        weight="fill"
                      />
                      <span className="text-sm text-slate-400">Concluir</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <XSquare
                        className="fill-rose-400"
                        size={20}
                        weight="fill"
                      />
                      <span className="text-sm text-slate-400">Cancelar</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Question
                        className="fill-orange-400"
                        size={20}
                        weight="fill"
                      />
                      <span className="text-sm text-slate-400">
                        Não compareceu
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-start overflow-x-scroll lg:mb-0">
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
                            className={`${item.id === selectedStatus.professional ? "bg-background-300 text-vibrant-green-100" : "bg-transparent text-white"} cursor-pointer rounded-md p-4 text-xs uppercase lg:rounded-t-md`}
                          >
                            {item.name}
                          </button>
                        );
                      })
                    )}
                  </div>

                  <div className="w-full overflow-x-scroll">
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
                                  {dayjs(schedule.date).format("DD/MM/YYYY")}
                                </td>
                                <td className="px-6 py-4">
                                  {schedule.user.name}
                                </td>
                                <td className="px-6 py-4">
                                  {schedule.user.phone}
                                </td>
                                <td className="px-6 py-4">
                                  <button className="flex cursor-pointer items-center justify-start gap-2 rounded-md border-[1px] border-slate-400 px-2 py-1 text-slate-400 duration-100 hover:bg-slate-300/20">
                                    <span>Adicionar comentário</span>
                                  </button>
                                </td>
                                <td className="px-6 py-4">
                                  {schedule.profile.serviceValue}
                                </td>
                                <td className="px-6 py-4">
                                  {schedule.profile.serviceType}
                                </td>
                                <td className="flex items-center justify-start gap-1 px-6 py-4">
                                  <button title="Concluir">
                                    <CheckSquare
                                      className="cursor-pointer fill-vibrant-green-100 duration-150 hover:fill-vibrant-green-200"
                                      size={32}
                                      weight="fill"
                                    />
                                  </button>
                                  <button title="Cancelar">
                                    <XSquare
                                      className="cursor-pointer fill-rose-400 duration-150 hover:fill-rose-500"
                                      size={32}
                                      weight="fill"
                                    />
                                  </button>
                                  <div title="Não compareceu">
                                    <Question
                                      size={32}
                                      className="cursor-pointer fill-orange-400 duration-150 hover:fill-orange-500"
                                      weight="fill"
                                    />
                                  </div>
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
                  Meus agendamentos (pessoal)
                </h2>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-start overflow-x-scroll lg:mb-0">
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
                          className={`${item.id === selectedStatus.personal ? "bg-background-300 text-vibrant-green-100" : "bg-transparent text-white"} cursor-pointer rounded-md p-4 text-xs uppercase lg:rounded-t-md lg:p-4`}
                        >
                          {item.name}
                        </button>
                      );
                    })
                  )}
                </div>

                <div className="w-full overflow-x-scroll">
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
                              key={index}
                              className={`${index === 4 ? "" : "border-b"} border-background-300 hover:bg-background-300/50`}
                            >
                              <td className="px-6 py-4">
                                {dayjs(schedule.date).format("DD/MM/YYYY")}
                              </td>
                              <td className="px-6 py-4">
                                {schedule.profile.user.name}
                              </td>
                              <td className="px-6 py-4">
                                {schedule.profile.profession.name}
                              </td>
                              <td className="px-6 py-4">
                                {schedule.profile.user.phone}
                              </td>
                              <td className="px-6 py-4">
                                <button className="flex cursor-pointer items-center justify-start gap-2 rounded-md border-[1px] border-slate-400 px-2 py-1 text-slate-400 duration-100 hover:bg-slate-300/20">
                                  <span>Visualizar comentário</span>
                                </button>
                              </td>
                              <td className="px-6 py-4">
                                {schedule.profile.serviceValue}
                              </td>
                              <td className="px-6 py-4">
                                {schedule.profile.serviceType}
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
        <p>fetching...</p>
      )}
    </section>
  );
}
