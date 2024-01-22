// AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProps {
  address: string | null;
  setAddress: (newAddress: string | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ address, setAddress }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
