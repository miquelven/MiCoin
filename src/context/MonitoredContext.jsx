import { createContext } from "react";

export const MonitoredContext = createContext();

export const MonitoredProvider = ({ children }) => {
  return (
    <MonitoredContext.Provider value={{}}>
      {children}
    </MonitoredContext.Provider>
  );
};
