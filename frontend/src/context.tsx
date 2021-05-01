import React, { useState, useContext, useEffect, ReactNode } from "react";
import { useHistory } from "react-router-dom";

interface AppContext {
  page: String,
  setPage: (str: string) => void
}

const AppContext = React.createContext<AppContext>({} as AppContext)

interface Props {
  children: ReactNode
}

const AppProvider = ({ children } : Props) => {
  // const [popUp, setPopup] = useState<string>("");
  const [page, setPage] = useState<string>(""); 

  return <AppContext.Provider value={{ page, setPage }}>{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
