import React, { createContext, useState, useContext, useMemo } from "react";
import { getUser } from "../utils/authAPI";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  async function fetchUserData() {
    try {
      const response = await getUser();

      response.status === "success" ? setUserData(response.data) : setUserData(null);
    } catch (error) {
      console.error(error);
    }
  }

  const contextValue = useMemo(
    () => ({
      userData,
      fetchUserData,
    }),
    [userData]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
