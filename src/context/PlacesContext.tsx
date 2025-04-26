import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CustomPlace } from '../types/CustomPlace';

interface PlacesContextType {
  places: CustomPlace[];
  setPlaces: (places: CustomPlace[]) => void;
}

const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

export const PlacesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [places, setPlaces] = useState<CustomPlace[]>([]);
  return (
    <PlacesContext.Provider value={{ places, setPlaces }}>
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (!context) {
    throw new Error('usePlaces must be used within a PlacesProvider');
  }
  return context;
};
