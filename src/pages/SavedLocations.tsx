import { Link } from "react-router";
import PlaceCard from "../components/PlaceCard";
import { useSavedPlaces } from "../hooks/useSavedPlaces";

const SavedLocations: React.FC = () => {
  const { savedPlaces } = useSavedPlaces();

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <h2 className="text-4xl font-bold text-primary mb-6 text-center">
        Saved Locations
      </h2>
      {savedPlaces.length === 0 ? (
        <p className="text-center text-gray-500">No saved locations yet.</p>
      ) : (
        <div className="grid gap-6 max-w-2xl mx-auto">
          {savedPlaces.map((location) => (
            <Link to={`/locations/${location.locationId}`} key={location.locationId}>

                <PlaceCard
                  location={location}
                />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLocations;
