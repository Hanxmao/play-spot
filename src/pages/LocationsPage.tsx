import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PlaceCard from "../components/PlaceCard";
import { Location } from "../types/entities";

const LocationsPage = () => {
  const [allLocations, setAllLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`http://localhost:5102/locations`);
        setAllLocations(response.data);
        console.log("Local backend response:", response.data);
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
         <div
         key={location.locationId}
         onClick={() =>{
           navigate(`/locations/${location.locationId}`, { state: { place: location } })
         }}
         className="cursor-pointer transition transform hover:scale-105"
       >
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
