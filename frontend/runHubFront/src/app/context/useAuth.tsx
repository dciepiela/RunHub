/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";
import { User, UserFormRegister, UserProfile } from "../models/user";
import { useNavigate } from "react-router-dom";
import {
  loginAPI,
  registerCompetitorAPI,
  registerOrganizerAPI,
} from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    user: UserFormRegister,
    registrationType: "Organizer" | "Competitor"
  ) => void;
  loginUser: (user: User) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    user: UserFormRegister,
    registrationType: "Organizer" | "Competitor"
  ) => {
    if (registrationType === "Competitor") {
      await registerCompetitorAPI(user)
        .then((res: any) => {
          if (res) {
            localStorage.setItem("token", res?.data.token);
            const userObj = {
              userName: res?.data.userName,
              displayName: res?.data.displayName || "",
              role: res?.data.role,
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setToken(res?.data.token);
            setUser(userObj!);
            toast.success("Zalogowano");
            navigate("/");
          }
        })
        .catch(() => toast.warning("Błąd serwera"));
    } else if (registrationType === "Organizer") {
      await registerOrganizerAPI(user)
        .then((res: any) => {
          if (res) {
            localStorage.setItem("token", res?.data.token);
            const userObj = {
              userName: res?.data.userName,
              displayName: res?.data.displayName || "",
              role: res?.data.role,
            };
            localStorage.setItem("user", JSON.stringify(userObj));
            setToken(res?.data.token);
            setUser(userObj!);
            toast.success("Zalogowano");
            navigate("/");
          }
        })
        .catch(() => toast.warning("Błąd serwera"));
    }
  };

  const loginUser = async (user: User) => {
    await loginAPI(user)
      .then((res) => {
        if (res) {
          const { token, userName, displayName, role } = res.data;
          localStorage.setItem("token", token);
          const userObj = {
            userName: userName,
            displayName: displayName,
            role: role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          setToken(token);
          setUser(userObj);
          navigate("/");
          toast.success("Zalogowano");
        }
      })
      .catch(() => toast.warning("Błąd serwera"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
