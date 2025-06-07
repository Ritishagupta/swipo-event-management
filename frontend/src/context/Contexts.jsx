import { createContext, useContext, useState } from "react";

const Contexts = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <Contexts.Provider value={{ user, login, logout }}>
      {children}
    </Contexts.Provider>
  );
};


const useGlobalContext = () => {
  return useContext(Contexts);
};

export { useGlobalContext, ContextProvider };
