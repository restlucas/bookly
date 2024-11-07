"use client";

import { SelectRole } from "./select-role";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

import {
  BuildingOffice,
  CalendarDots,
  CurrencyDollar,
  SmileySad,
  User,
} from "@phosphor-icons/react";
import { getNextAppointmentsByUser } from "@/services/schedulingService";
import dayjs from "dayjs";

interface NextSchedulingsProps {
  professional: {
    user: {
      name: string;
    };
    serviceValue: string;
    occupation: {
      name: string;
    };
  };
  serviceType: {
    name: string;
  };
  date: Date;
}

export default function Dashboard() {
  const { user, isLoading } = useContext(UserContext);

  const [nextSchedulings, setNextSchedulings] =
    useState<NextSchedulingsProps[]>();

  useEffect(() => {
    const fetchNextSchedulings = async () => {
      if (user.id) {
        const response = await getNextAppointmentsByUser(user.id);
        setNextSchedulings(response);
      }
    };

    fetchNextSchedulings();
  }, [user]);

  if (isLoading) {
    return (
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-screen items-center justify-center bg-background-100">
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-vibrant-green-100 text-background-300"
          viewBox="0 0 100 101"
          fill="none"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  if (!user.userType) {
    return (
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-screen items-center justify-center bg-background-100">
        <SelectRole />
      </div>
    );
  } else {
    return (
      <main className="h-full space-y-8">
        <div className="w-full rounded-md bg-background-200 p-8">
          <h1 className="text-center text-xl">
            Bem vindo novamente{" "}
            <span className="font-bold text-vibrant-green-100">
              {user.name}
            </span>
            !
          </h1>
        </div>
        <div className="grid w-full grid-cols-1 lg:grid-cols-[1fr_1fr]">
          <div className="w-full rounded-md bg-background-200 p-8">
            <h2 className="mb-8 text-xl font-bold text-vibrant-green-100">
              Agendamentos nas próximas 2 semanas
            </h2>

            <ul className="flex flex-col">
              {nextSchedulings && nextSchedulings.length > 0 ? (
                nextSchedulings.map((scheduling, index) => {
                  return (
                    <li
                      key={index}
                      className="duration group border-b-[1px] border-b-background-300 bg-transparent fill-slate-400 text-sm text-slate-300 hover:bg-slate-300/10 hover:fill-vibrant-green-200 hover:text-vibrant-green-200"
                    >
                      <div className="grid grid-cols-2 items-center justify-center gap-4 px-3 py-5 lg:grid-cols-4 lg:gap-0">
                        <div className="flex items-center justify-start gap-2">
                          <CalendarDots size={24} />
                          <span>
                            {dayjs(scheduling.date).format("DD/MM/YYYY")}
                            {" ~ "}
                            {`${String(dayjs(scheduling.date).hour()).padStart(2, "0")}:${String(dayjs(scheduling.date).minute()).padEnd(2, "0")}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <User size={24} />
                          <div className="flex flex-col">
                            <span>{scheduling.professional.user.name}</span>
                            <span className="text-xs">
                              {scheduling.professional.occupation.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <BuildingOffice size={24} />
                          <span>{scheduling.serviceType.name}</span>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                          <CurrencyDollar size={24} />
                          <span>{scheduling.professional.serviceValue}</span>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-1 fill-slate-400 text-slate-400">
                  <span>Nenhum agendamento em andamento</span>
                  <SmileySad size={32} />
                </div>
              )}
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
