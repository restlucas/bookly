"use client";

import { getWeekDays } from "@/utils/get-week-days";
import { XSquare } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { TextInput } from "@/components/input/text";
import { SelectInput } from "@/components/input/select";
import { DateInput } from "@/components/input/date";
import SubmitButton from "@/components/button/submit";
import {
  convertTimeToMinutes,
  formatMinutesToTime,
  handleTimeInput,
} from "@/utils/format-time";
import { getSchedule, updateSchedule } from "@/services/professionalService";
import { UserContext } from "@/contexts/UserContext";
import {
  createAbsence,
  deleteAbsence,
  getAbsence,
  getOptions,
} from "@/services/absenceService";
import dayjs from "dayjs";

export default function ProfessionalSchedule() {
  const { user } = useContext(UserContext);
  const weekDays = getWeekDays({ short: false });

  const [absenceOptions, setAbsenceOptions] = useState<any>();
  const [absenceList, setAbsenceList] = useState<any>();

  const [isLoading, setIsLoading] = useState({
    schedule: false,
    absence: false,
    absenceList: true,
  });
  const [scheduleForm, setScheduleForm] = useState<any>();
  const [absenceForm, setAbsenceForm] = useState<any>({
    userId: "",
    absenceOptionId: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (user.id) {
      getProfessionalSchedule(user.id);
      getAbsenceOptions();
      getAbsences(user.id);

      setIsLoading((prevState) => ({
        ...prevState,
        absenceList: false,
      }));

      setAbsenceForm((prevState) => ({
        ...prevState,
        userId: user.id,
      }));
    }
  }, [user]);

  async function getProfessionalSchedule(userId: string) {
    let response = await getSchedule(userId);

    response.intervals = weekDays.map((weekDayName, index) => ({
      ...response.intervals[index],
      name: weekDayName,
    }));

    setScheduleForm(response);
  }

  async function getAbsenceOptions() {
    const response = await getOptions();
    setAbsenceOptions(response);
  }

  async function getAbsences(userId: string) {
    const response = await getAbsence(userId);
    setAbsenceList(response);
  }

  async function removeAbsence(absenceId: string, absenceName: string) {
    const optionResponse = confirm(
      `Deseja cancelar a ausência por motivo de: ${absenceName}?`,
    );

    if (optionResponse) {
      setIsLoading((prevState) => ({
        ...prevState,
        absenceList: true,
      }));

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await deleteAbsence(user.id, absenceId);

      setAbsenceList((prevState) =>
        prevState.filter((item) => item.id !== absenceId),
      );

      setIsLoading((prevState) => ({
        ...prevState,
        absenceList: false,
      }));
    }
  }

  function handleChange(
    form: string,
    intervalId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value, checked } = event.target;

    if (form === "scheduleForm") {
      setScheduleForm((prevState) => {
        const updateInterval = (updateFn) =>
          prevState.intervals.map((interval) =>
            interval.id === intervalId ? updateFn(interval) : interval,
          );

        const actions = {
          timeStartInMinutes: () =>
            updateInterval((interval) => ({
              ...interval,
              timeStartInMinutes: convertTimeToMinutes(value),
            })),
          timeEndInMinutes: () =>
            updateInterval((interval) => ({
              ...interval,
              timeEndInMinutes: convertTimeToMinutes(value),
            })),
          enabled: () =>
            updateInterval((interval) => ({ ...interval, enabled: checked })),
          default: () => ({ ...prevState, serviceTime: value }),
        };

        return {
          ...prevState,
          intervals: name in actions ? actions[name]() : prevState.intervals,
          ...(name === "serviceTime" && { serviceTime: value }),
        };
      });
    } else {
      setAbsenceForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  async function handleSubmitSchedule(e: any) {
    e.preventDefault();
    setIsLoading((prevState) => ({
      ...prevState,
      schedule: true,
    }));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await updateSchedule(user.id, scheduleForm);
    setIsLoading((prevState) => ({
      ...prevState,
      schedule: false,
    }));
  }

  async function handleSubmitAbsence(e: any) {
    e.preventDefault();
    setIsLoading((prevState) => ({
      ...prevState,
      absence: true,
    }));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await createAbsence(absenceForm);

    setAbsenceList((prevState) => [...prevState, response]);

    setIsLoading((prevState) => ({
      ...prevState,
      absence: false,
    }));
  }

  return (
    <section className="mb-8 flex flex-col gap-6">
      {/* Page header */}
      <div className="flex w-full items-center justify-between gap-4 rounded-md bg-background-200 p-8 shadow-md">
        <h3 className="text-3xl font-bold text-vibrant-green-100 lg:text-xl">
          Minha programação
        </h3>
      </div>

      <div className="grid w-full grid-cols-1 items-start gap-8 2xl:grid-cols-2">
        {/* Workdays and average service time  */}

        {scheduleForm ? (
          <form
            id="scheduleForm"
            onSubmit={handleSubmitSchedule}
            className="grid grid-cols-1 gap-8 rounded-md bg-background-200 p-8 shadow-md lg:grid-cols-2"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-vibrant-green-100 lg:col-span-full">
                Dias de trabalho
              </h3>
              <div className="flex flex-col rounded-md border-[1px] border-slate-700">
                {scheduleForm.intervals.map((interval, index) => {
                  return (
                    <div
                      key={index}
                      className={`${index !== 6 ? "border-b-[1px] border-slate-700" : ""} flex items-center justify-between gap-2 px-4 py-3`}
                    >
                      <div className="flex flex-1 items-center justify-start gap-2">
                        <input
                          type="checkbox"
                          name="enabled"
                          className="h-5 w-5 cursor-pointer rounded"
                          checked={interval.enabled}
                          onChange={(e) =>
                            handleChange("scheduleForm", interval.id, e)
                          }
                        />

                        <label
                          className={`${interval.enabled ? "" : "text-slate-500 line-through"}`}
                        >
                          {interval.name}
                        </label>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <input
                          className={`${interval.enabled ? "" : "text-slate-500 line-through"} w-20 rounded-md border-0 bg-background-300 p-2`}
                          type="text"
                          name="timeStartInMinutes"
                          value={formatMinutesToTime(
                            interval.timeStartInMinutes,
                          )}
                          maxLength={5}
                          disabled={!interval.enabled}
                          onChange={(e) =>
                            handleChange("scheduleForm", interval.id, e)
                          }
                        />
                        <input
                          className={`${interval.enabled ? "" : "text-slate-500 line-through"} w-20 rounded-md border-0 bg-background-300 p-2`}
                          type="text"
                          name="timeEndInMinutes"
                          value={formatMinutesToTime(interval.timeEndInMinutes)}
                          maxLength={5}
                          disabled={!interval.enabled}
                          onChange={(e) =>
                            handleChange("scheduleForm", interval.id, e)
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-vibrant-green-100 lg:col-span-full">
                Tempo médio cada atendimento
              </h3>
              <div className="w-1/2">
                <TextInput
                  label="Em minutos"
                  name="serviceTime"
                  value={scheduleForm.serviceTime}
                  required
                  onChange={(e) => handleChange("scheduleForm", "", e)}
                />
              </div>
            </div>
            <div className="col-span-full flex items-center justify-end">
              <SubmitButton
                title="Salvar programação"
                isLoading={isLoading.schedule}
                form="scheduleForm"
              />
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-8 rounded-md bg-background-200 p-8 shadow-md lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-vibrant-green-100 lg:col-span-full">
                Dias de trabalho
              </h3>
              <div className="flex animate-pulse flex-col rounded-md border-[1px] border-slate-700">
                {Array.from({ length: 6 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={`${index !== 6 ? "border-b-[1px] border-slate-700" : ""} flex h-[65px] items-center justify-between gap-2 px-4 py-3`}
                    >
                      <div className="flex flex-1 items-center justify-start gap-2">
                        <div className="h-5 w-5 rounded" />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="p-2" />
                        <div className="p-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl text-vibrant-green-100 lg:col-span-full">
                Tempo médio cada atendimento
              </h3>
              <div className="w-1/2">
                <div className="h-[44px] animate-pulse rounded-md border-2 border-slate-700 bg-background-300 p-2 disabled:text-slate-400">
                  {" "}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8 rounded-md bg-background-200 p-8 shadow-md">
          <form
            id="absenceForm"
            onSubmit={handleSubmitAbsence}
            className="grid grid-cols-1"
          >
            <div className="flex flex-col gap-4">
              <h3 className="col-span-full text-xl text-vibrant-green-100">
                Férias e ausências
              </h3>
              <div className="flex w-full flex-col items-start justify-center gap-6 lg:w-1/2">
                <SelectInput
                  label="Motivo da ausência"
                  name="absenceOptionId"
                  value={absenceForm.absenceOptionId}
                  options={absenceOptions}
                  onChange={(e) => handleChange("absenceForm", "", e)}
                />
                <div>
                  <label>Período ausência</label>
                  <div className="flex w-full items-center justify-start gap-4">
                    <DateInput
                      name="startTime"
                      value={absenceForm.startTime}
                      onChange={(e) => handleChange("absenceForm", "", e)}
                    />
                    <span>até</span>
                    <DateInput
                      name="endTime"
                      value={absenceForm.endTime}
                      onChange={(e) => handleChange("absenceForm", "", e)}
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-start lg:mt-0">
                  <SubmitButton
                    title="Inserir ausência"
                    isLoading={isLoading.absence}
                    form="absenceForm"
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="flex flex-col gap-4">
            <h3 className="col-span-full text-xl text-vibrant-green-100">
              Registros em andamento
            </h3>

            <table className="font-regular w-full overflow-x-scroll text-left text-sm shadow-md rtl:text-right">
              <thead className="bg-background-300 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Período</th>
                  <th className="px-6 py-3">Motivo</th>
                  <th className="px-6 py-3 text-center">Cancelar</th>
                </tr>
              </thead>
              <tbody className="">
                {isLoading.absenceList ? (
                  <tr>
                    <td colSpan={3} className="py-6 text-center">
                      {/* carregano */}
                      <div className="flex w-full items-center justify-center">
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      </div>
                    </td>
                  </tr>
                ) : absenceList ? (
                  absenceList.map((absenceItem, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-background-300 hover:bg-background-300"
                      >
                        <td className="px-6 py-4">
                          12/12/2024
                          {/* {dayjs(absenceItem.startTime, "DD/MM/YYYY")}
                          à{" "}
                          {dayjs(absenceItem.endTime, "DD/MM/YYYY")} */}
                        </td>
                        <td className="px-6 py-4">
                          {absenceItem.absenceOption.name}
                        </td>
                        <td className="flex items-center justify-center px-6 py-4">
                          <button
                            onClick={() =>
                              removeAbsence(
                                absenceItem.id,
                                absenceItem.absenceOption.name,
                              )
                            }
                            title="Cancelar"
                            className="cursor-pointer duration-150 hover:fill-rose-500"
                          >
                            <XSquare
                              className="fill-rose-400"
                              size={26}
                              weight="fill"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3} className="py-6 text-center">
                      Nenhum registro
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
