import { useState, useEffect } from "react";

export interface SavedPlace {
  id: string; // use lat+lng or place_id if available
  name: string;
  vicinity: string;
  lat: number;
  lng: number;
}

export function useSavedPlaces() {
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("savedPlaces");
    if (stored) {
      setSavedPlaces(JSON.parse(stored));
    }
  }, []);

  const savePlace = (place: SavedPlace) => {
    if (savedPlaces.find((p) => p.id === place.id)) return;
    const updated = [...savedPlaces, place];
    setSavedPlaces(updated);
    localStorage.setItem("savedPlaces", JSON.stringify(updated));
  };

  const unsavePlace = (id: string) => {
    const updated = savedPlaces.filter((p) => p.id !== id);
    setSavedPlaces(updated);
    localStorage.setItem("savedPlaces", JSON.stringify(updated));
  };

  const isSaved = (id: string) => savedPlaces.some((p) => p.id === id);

  return { savedPlaces, savePlace, unsavePlace, isSaved };
}
