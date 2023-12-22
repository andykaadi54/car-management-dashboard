/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      getUser();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Login failed");
    }
  };

  const getUser = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const response = await axios.get(
          "http://localhost:3000/users/current-user",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
