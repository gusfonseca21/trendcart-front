import { User } from "@/types";
import { createContext, useState } from "react";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type ValueProps = {
  loggedUser: User | null;
  // eslint-disable-next-line no-unused-vars
  updateLoggedUser: (user: User | null) => void;
};

const initialContextValue: ValueProps = {
  loggedUser: null,
  updateLoggedUser: () => {},
};

export const UserContext = createContext(initialContextValue);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const updateLoggedUser = (user: User | null) => {
    setLoggedUser(user);
  };

  const value: ValueProps = {
    loggedUser,
    updateLoggedUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
