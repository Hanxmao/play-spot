import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useNearbySports } from "../context/NearbySportsContext";
import PlaceCard from "./PlaceCard";
import axios from "axios";
import { Location } from "../types/entities";

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const NearbySportsFinder: React.FC = () => {
  const { sportType, setSportType, places, setPlaces } = useNearbySports();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleSportChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSport = e.target.value;
    setSportType(selectedSport);
    setPlaces([]);

    if (!selectedSport) return;

    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            sessionStorage.setItem("userLat", latitude.toString());
            sessionStorage.setItem("userLng", longitude.toString());

            //localhost development
            //const response = await axios.get(`http://localhost:5102/locations`);

            //online deployment
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/locations`);
            console.log("API response:", response.data);

            const filtered = response.data
              .filter((loc: Location) => {
                const hasSport = loc.sports.some((s: any) =>
                  s.name.toLowerCase() === selectedSport.toLowerCase()
                );
                const distance = getDistanceFromLatLonInKm(
                  latitude,
                  longitude,
                  loc.latitude,
                  loc.longitude
                );
                return hasSport && distance <= 10; // Only within 10 km
              })
              .map((loc: Location) => ({
                locationId: loc.locationId,
                name: loc.name,
                address: loc.address,
                latitude: loc.latitude,
                longitude: loc.longitude,
                sports: loc.sports,
              }));

            setPlaces(filtered);
          } catch (err) {
            console.error("Failed to fetch locations:", err);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-base-200 relative">
      <div ref={mapRef} style={{ display: "none" }} />

      <div className="max-w-md mx-auto text-center mb-6">
        <h2 className="text-4xl font-bold text-primary mb-6">PlaySpot</h2>

        <div className="form-control">
          <label htmlFor="sport" className="label">
            <span className="label-text text-lg font-semibold">
              Choose a Sport:
            </span>
          </label>
          <select
            id="sport"
            className="select select-bordered select-primary w-full"
            value={sportType}
            onChange={handleSportChange}
          >
            <option value="">-- Select a Sport --</option>
            <option value="tennis">Tennis</option>
            <option value="soccer">Soccer</option>
            <option value="table tennis">Table Tennis</option>
            <option value="basketball">Basketball</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {!loading && places.length > 0 && (
        <div className="grid gap-6 max-w-2xl mx-auto">
          {places.map((place) => (
            <div
              key={place.locationId}
              onClick={() => {
                navigate(`/locations/${place.locationId}`, { state: { place: place } });
              }}
              className="cursor-pointer transition transform hover:scale-105"
            >
              <PlaceCard location={place} />
            </div>
          ))}
        </div>
      )}

      {!loading && sportType && places.length === 0 && (
        <div className="text-center text-gray-500">
          <p>
            No nearby locations found for{" "}
            <span className="font-semibold">{sportType}</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default NearbySportsFinder;
