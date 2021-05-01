import React, { useState, useContext, useEffect, ReactNode } from "react";
import { useHistory } from "react-router-dom";

interface AppContext {
  page: String;
  setPage: (str: string) => void;
  user: User;
  setUser: (pr: User) => void;
}

const AppContext = React.createContext<AppContext>({} as AppContext);

interface Props {
  children: ReactNode;
}
interface User {
  logged: boolean;
  name: string;
  email: string;
}

const AppProvider = ({ children }: Props) => {
  // const [popUp, setPopup] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const [user, setUser] = useState<User>({
    logged: false,
    name: "",
    email: "",
  });
  //useEffect check if logged, user picture

  return (
    <AppContext.Provider value={{ page, setPage, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
