import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import axios from "axios";
import { Location } from "../types/entities";

const LocationsPage = () => {
  const [allLocations, setAllLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/locations`);
        console.log("response", response)
        setAllLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);
  return (
    <div className="p-6 min-h-screen bg-base-200">
    <h1 className="text-3xl font-bold mb-6 text-center">All Locations</h1>

    {loading ? (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    ) : allLocations.length > 0 ? (
      <div className="grid gap-6 max-w-2xl mx-auto">
        {allLocations.map((location) => (
          <div key={location.locationId}>
            <PlaceCard
              location={location}
            />
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">No locations found.</p>
    )}
  </div>
  )
}

export default LocationsPage
