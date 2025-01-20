"use client";

import SubmitButton from "@/components/button/submit";
import { DateInput } from "@/components/input/date";
import { SelectInput } from "@/components/input/select";
import {
  createAbsence,
  deleteAbsence,
  getAbsence,
  getOptions,
} from "@/services/absenceService";
import toastDefaultValues from "@/utils/toast-default-values";
import { AbsenceFormData, validateAbsenceForm } from "@/utils/validators";
import { XSquare } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { UserProps } from "./page";

interface AbsenceOptionsProps {
  id: string;
  name: string;
  description?: string;
  slug?: string;
}

interface AbsenceListProps {
  id: string;
  professionalId: string;
  startTime: string;
  endTime: string;
  absenceOption: {
    name: string;
    description: string;
  };
}

export function AbsenceForm({ user }: { user: UserProps }) {
  const [absenceOptions, setAbsenceOptions] = useState<AbsenceOptionsProps[]>();
  const [absenceList, setAbsenceList] = useState<AbsenceListProps[]>([]);
  const [isLoading, setIsLoading] = useState({
    absence: false,
    absenceList: true,
  });
  const [absenceForm, setAbsenceForm] = useState<AbsenceFormData>({
    userId: "",
    absenceOptionId: "",
    startTime: "",
    endTime: "",
  });

  const getAbsenceOptions = useCallback(async () => {
    const response = await getOptions();
    setAbsenceOptions(response);
  }, []);

  const getAbsences = useCallback(async (userId: string) => {
    const response = await getAbsence(userId);
    setAbsenceList(response);
  }, []);

  const removeAbsence = async (absenceId: string, absenceName: string) => {
    const optionResponse = confirm(
      `Deseja cancelar a ausência por motivo de: ${absenceName}?`,
    );

    if (optionResponse) {
      setIsLoading((prevState) => ({
        ...prevState,
        absenceList: true,
      }));

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await deleteAbsence(user.id, absenceId);

      setAbsenceList((prevState) =>
        prevState.filter((item) => item.id !== absenceId),
      );

      setIsLoading((prevState) => ({
        ...prevState,
        absenceList: false,
      }));
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setAbsenceForm((prevState: AbsenceFormData) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmitAbsence(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateAbsenceForm(absenceForm);

    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach((error) => {
        toast.error(error, toastDefaultValues);
      });
    } else {
      setIsLoading((prevState) => ({
        ...prevState,
        absence: true,
      }));

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await createAbsence(absenceForm);

      setAbsenceList((prevState) => [...prevState, response.data]);
      toast[response.type](response.message, toastDefaultValues);

      setIsLoading((prevState) => ({
        ...prevState,
        absence: false,
      }));
    }
  }

  useEffect(() => {
    if (user.id) {
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
  }, [user, getAbsenceOptions, getAbsences]);

  return (
    <div>
      <div className="space-y-8 rounded-md bg-background-200 p-8 shadow-md">
        <form
          id="absenceForm"
          onSubmit={handleSubmitAbsence}
          className="grid grid-cols-1"
        >
          <div className="flex flex-col gap-4">
            <h3 className="col-span-full text-xl text-vibrant-green-100">
              Vacation and absences
            </h3>
            <div className="flex w-full flex-col items-start justify-center gap-6 lg:w-1/2">
              <SelectInput
                label="Reason for absence"
                name="absenceOptionId"
                value={absenceForm.absenceOptionId}
                options={absenceOptions}
                onChange={(e) => handleChange(e)}
              />
              <div>
                <label>Period of absence</label>
                <div className="flex w-full items-center justify-start gap-4">
                  <DateInput
                    name="startTime"
                    value={absenceForm.startTime}
                    onChange={(e) => handleChange(e)}
                  />
                  <span>até</span>
                  <DateInput
                    name="endTime"
                    value={absenceForm.endTime}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-6 flex items-start justify-start lg:mt-0">
                <SubmitButton
                  title="Add absence"
                  isLoading={isLoading.absence}
                  form="absenceForm"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          <h3 className="col-span-full text-xl text-vibrant-green-100">
            Absences in progress
          </h3>

          <table className="font-regular w-full overflow-x-scroll text-left text-sm shadow-md rtl:text-right">
            <thead className="bg-background-300 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Period</th>
                <th className="px-6 py-3">Absence</th>
                <th className="px-6 py-3 text-center">Cancel</th>
              </tr>
            </thead>
            <tbody className="">
              {isLoading.absenceList ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center">
                    {/* Loading */}
                    <div className="flex w-full items-center justify-center">
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </div>
                  </td>
                </tr>
              ) : absenceList.length > 0 ? (
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
                    No absences found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer closeOnClick theme="dark" />
    </div>
  );
}
