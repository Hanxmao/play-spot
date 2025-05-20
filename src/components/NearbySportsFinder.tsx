import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useNearbySports } from "../context/NearbySportsContext";
import PlaceCard from "./PlaceCard";
import axios from "axios";


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
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/locations`);
          console.log("API response:", response.data);
          console.log("Filtering for sport:", selectedSport);

          // Filter places by selected sport
          const filtered = response.data
            .filter((loc: any) =>
              loc.sports.some((s: any) =>
                s.name.toLowerCase() === selectedSport.toLowerCase()
              )
            )
            .map((loc: any) => ({
              id: loc.locationId,
              name: loc.name,
              vicinity: loc.address,
              lat: loc.latitude,
              lng: loc.longitude,
              sport: selectedSport,
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
            <option value="swimming">Swimming</option>
            <option value="soccer">Soccer</option>
            <option value="lacrosse">Lacrosse</option>
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
          {places.map((place, idx) => (
            <div
              key={idx}
              onClick={() =>
                navigate(`/locations/${place.id}`, { state: { place } })
              }
              className="cursor-pointer transition transform hover:scale-105"
            >
              <PlaceCard
                id={`${place.id}`} // generate a unique ID if no place_id
                name={place.name}
                vicinity={place.vicinity}
                lat={place.lat}
                lng={place.lng}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && sportType && places.length === 0 && (
        <div className="text-center text-gray-500">
          <p>
            No locations found for{" "}
            <span className="font-semibold">{sportType}</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default NearbySportsFinder;
