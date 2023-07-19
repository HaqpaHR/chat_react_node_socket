import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/service.js";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registrationUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setRegistrationError(null);
      const response = await postRequest(
        `${baseUrl}/users/registration`,
        JSON.stringify(registerInfo)
      );

      setIsLoading(false);

      if (response.error) {
        return setRegistrationError(response);
      }

      setUser(response);
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setLoginError(null);
      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      setUser(response);
    },
    [loginInfo]
  );

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user"));
        if (token) {
            const user = jwtDecode(token.token);

            setUser(user);
        }
    }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registrationUser,
        registrationError,
        isLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
