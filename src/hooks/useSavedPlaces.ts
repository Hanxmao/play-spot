import { useState, useEffect } from "react";
import { Location } from "../types/entities";

export function useSavedPlaces() {
  const [savedPlaces, setSavedPlaces] = useState<Location[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("savedPlaces");
    if (stored) {
      setSavedPlaces(JSON.parse(stored));
    }
  }, []);

  const savePlace = (place: Location) => {
    if (savedPlaces.some((p) => p.locationId === place.locationId)) return;
    const updated = [...savedPlaces, place];
    setSavedPlaces(updated);
    localStorage.setItem("savedPlaces", JSON.stringify(updated));
  };

  const unsavePlace = (locationId: number) => {
    const updated = savedPlaces.filter((p) => p.locationId !== locationId);
    setSavedPlaces(updated);
    localStorage.setItem("savedPlaces", JSON.stringify(updated));
  };

  const isSaved = (locationId: number) =>
    savedPlaces.some((p) => p.locationId === locationId);

  return { savedPlaces, savePlace, unsavePlace, isSaved };
}
