import React, { createContext, useContext, useState } from "react";
import { Location } from "../types/entities";

interface NearbySportsContextType {
  sportType: string;
  setSportType: (sport: string) => void;
  places: Location[];
  setPlaces: (places: Location[]) => void;
}

const NearbySportsContext = createContext<NearbySportsContextType | undefined>(undefined);

export const NearbySportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sportType, setSportType] = useState('');
  const [places, setPlaces] = useState<Location[]>([]);

  return (
    <NearbySportsContext.Provider value={{ sportType, setSportType, places, setPlaces }}>
      {children}
    </NearbySportsContext.Provider>
  );
};

export const useNearbySports = () => {
  const context = useContext(NearbySportsContext);
  if (!context) {
    throw new Error('useNearbySports must be used within a NearbySportsProvider');
  }
  return context;
};
