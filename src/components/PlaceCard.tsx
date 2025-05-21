import React from "react";
import { useSavedPlaces } from "../hooks/useSavedPlaces";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Location } from "../types/entities";


interface PlaceCardProps {
  location: Location;
  crowdedness?: "full" | "crowded" | "moderate" | "available";
  showCrowdedness?: boolean
}


const getColor = (status?: string) => {
  switch (status) {
    case "full":
      return "badge-error"; // red
    case "crowded":
      return "badge-warning"; // yellow
    case "moderate":
      return "badge-info"; // blue
    case "available":
      return "badge-success"; // green
    default:
      return "badge-neutral"; // gray/neutral
  }
};

const getCrowdednessDescription = (status?: string) => {
  switch (status) {
    case "full":
      return "No more capacity";
    case "crowded":
      return "Very limited space";
    case "moderate":
      return "Some spots available";
    case "available":
      return "Plenty of space";
    default:
      return "Unknown status";
  }
};

const PlaceCard: React.FC<PlaceCardProps> = ({
  location,
  crowdedness,
  showCrowdedness = true
}) => {
  const { savePlace, unsavePlace, isSaved } = useSavedPlaces();
  const saved = isSaved(location.locationId);
  const handleToggleSave = () => {
    if (saved) {
      unsavePlace(location.locationId);
    } else {
      savePlace(location);
    }
  };
  return (
    <div className="card bg-base-100 shadow-md border hover:shadow-lg transition">
      <div className="card-body p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-primary">{location.name}</h3>
          <div className="flex items-center space-x-2">
            <button
              className="btn btn-ghost text-red-500"
              onClick={(e) => {
                e.stopPropagation(); 
                handleToggleSave();
              }}
            >
              {saved ? <FaHeart /> : <FaRegHeart />}
            </button>
            <div
              className="tooltip tooltip-top"
              data-tip={
                crowdedness
                  ? `${crowdedness.toUpperCase()} — ${getCrowdednessDescription(
                      crowdedness
                    )}`
                  : "Waiting for update"
              }
            >
              {showCrowdedness &&  <div className={`badge ${getColor(crowdedness)} capitalize`}>
                {crowdedness || "Unknown"}
              </div>}
            </div>
          </div>
        </div>
        <p className="text-gray-600">{location.address}</p>
      </div>
    </div>
  );
};

export default PlaceCard;

export default PlaceCard;
