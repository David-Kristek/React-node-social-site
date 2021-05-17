import React, { useState, useContext, useEffect, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { isLogged } from "./api/auth";

interface AppContext {
  page: String;
  setPage: (str: string) => void;
  user: User | null;
  setUser: (pr: User) => void;
  navigator: string;
  setNavigator: (pr: string) => void;
  logout: () => void;
}

const AppContext = React.createContext<AppContext>({} as AppContext);

interface Props {
  children: ReactNode;
}
type AuthType = "google" | "JWT" | null;
interface User {
  logged: boolean;
  name: string;
  email: string;
  image: string;
  admin: boolean;
}

const AppProvider = ({ children }: Props) => {
  // const [popUp, setPopup] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const [navigator, setNavigator] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const logout = () => {
    if (user?.logged) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth-type");
      setUser(null);
    }
  };
  const isUserLogged = () => {
    const AuthType = localStorage.getItem("auth-type");
    if (AuthType) {
      isLogged(AuthType).then((res) => {
        if (res) {
          setUser({
            logged: true,
            name: res.name,
            email: res.email,
            image: res.image,
            admin: res.admin ? res.admin.isAdmin : false,
          });
        }
      });
    }
  };

  useEffect(() => {
    isUserLogged();
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AppContext.Provider
      value={{ page, setPage, user, setUser, navigator, setNavigator, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
