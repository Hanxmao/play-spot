import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PlaceCard from "../components/PlaceCard";
import { Location } from "../types/entities";

const LocationsPage = () => {
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // online deployment
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/locations`);

        //localhost development
       //const response = await axios.get(`http://localhost:5102/locations`);
        setAllLocations(response.data);
        setFilteredLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Update filtered results when the search term changes
  useEffect(() => {
    const filtered = allLocations.filter((loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchTerm, allLocations]);

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <h1 className="text-3xl font-bold mb-4 text-center">All Locations</h1>

      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by name or address..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filteredLocations.length > 0 ? (
        <div className="grid gap-6 max-w-2xl mx-auto">
          {filteredLocations.map((location) => (
            <div
              key={location.locationId}
              onClick={() => {
                navigate(`/locations/${location.locationId}`, {
                  state: { place: location },
                });
              }}
              className="cursor-pointer transition transform hover:scale-105"
            >
              <PlaceCard location={location} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No locations found.</p>
      )}
    </div>
  );
};

export default LocationsPage;
