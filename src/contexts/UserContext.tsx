import { getUserById } from "@/services/userService";
import { useSession } from "next-auth/react";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role?: string;
  phone?: string;
  birth?: string;
  gender?: string;
  address?: string;
  createdAt: any;
  updatedAt: any;
}

interface UserContextType {
  user: User;
  isLoading: boolean;
  updateRole: (role: string) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated") {
        const user = await getUserById(session.user.id);
        setUser(user);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  function updateRole(role: string) {
    setUser((prevState) => ({
      ...prevState,
      role,
    }));
  }

  return (
    <UserContext.Provider value={{ user, isLoading, updateRole }}>
      {children}
    </UserContext.Provider>
  );
}
