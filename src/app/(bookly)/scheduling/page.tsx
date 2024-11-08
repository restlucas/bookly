import { getStatus } from "@/services/statusService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { PersonalAppointments } from "./personal-appointments";
import { ProfessionalAppointments } from "./professional-appointments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meus agendamentos | Bookly",
  description: "Pagina de agendamentos",
};

export interface StatusTypes {
  professional: {
    id: string;
    name: string;
  }[];
  personal: {
    id: string;
    name: string;
  }[];
}

export interface SchedulingProps {
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
[];

export interface SchedulingTypes {
  professional: SchedulingProps[];
  personal: SchedulingProps[];
}

export interface SelectedSchedulingProps {
  id: string;
  observations?: string;
}

export interface AppointmentsProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
  };
  status: {
    id: string;
    name: string;
  }[];
}

export default async function Scheduling() {
  const { user } = await getServerSession(authOptions);
  const status = await getStatus();

  return (
    <>
      <section className="mb-8 flex flex-col gap-6">
        {user ? (
          <>
            {user.role === "professional" && (
              <ProfessionalAppointments user={user} status={status} />
            )}
            <PersonalAppointments user={user} status={status} />
          </>
        ) : (
          <div className="w-full animate-pulse space-y-4 rounded-md bg-background-200 p-8 shadow-md">
            <div className="h-10 w-64 rounded-md bg-background-300" />
            <div className="h-10 w-1/3 rounded-md bg-background-300" />
            <div className="h-10 w-full rounded-md bg-background-300" />
          </div>
        )}
      </section>
    </>
  );
}
