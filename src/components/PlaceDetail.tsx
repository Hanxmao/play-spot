import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { CustomPlace } from '../types/CustomPlace';

const PlaceDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { place: passedPlace } = location.state as { place: CustomPlace };

  // Local state for place (so we can update crowdedness)
  const [place, setPlace] = useState<CustomPlace>(passedPlace);

  // Assume user location is also passed later (you can improve later)
  const userLat = sessionStorage.getItem('userLat');
  const userLng = sessionStorage.getItem('userLng');

  const getBadgeColor = (status?: string) => {
    switch (status) {
      case 'full':
        return 'badge-error'; // red
      case 'crowded':
        return 'badge-warning'; // yellow
      case 'moderate':
        return 'badge-info'; // blue
      case 'available':
        return 'badge-success'; // green
      default:
        return 'badge-ghost'; // neutral gray
    }
  };

  const updateCrowdedness = (status: 'full' | 'crowded' | 'moderate' | 'available') => {
    setPlace((prev) => ({
      ...prev,
      crowdedness: status,
    }));
  };

  const calculateDistance = () => {
    if (!userLat || !userLng) return '?';
    const R = 6371; // Earth radius km
    const lat1 = parseFloat(userLat);
    const lon1 = parseFloat(userLng);
    const lat2 = place.lat;
    const lon2 = place.lng;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(2);
  };

  if (!place) {
    return (
      <div className="p-6 text-center text-error">
        Place not found.
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <button
        onClick={() => navigate('/')}
        className="btn btn-outline btn-primary mb-6"
      >
        ← Back
      </button>

      <div className="card bg-base-100 shadow-md border max-w-2xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-primary mb-4">{place.name}</h2>

        <p className="text-lg text-gray-700 mb-4">{place.vicinity}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold">Fullness:</span>
          <div className={`badge ${getBadgeColor(place.crowdedness)} capitalize`}>
            {place.crowdedness || 'Unknown'}
          </div>
        </div>

        <p className="text-lg mb-2">
          <span className="font-semibold">Distance:</span> {calculateDistance()} km
        </p>

        <p className="text-lg mb-2">
          <span className="font-semibold">Sports available:</span> {place.sport || 'Unknown'}
        </p>

        <div className="divider mt-6 mb-4">Update Crowdedness</div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => updateCrowdedness('available')}
            className="btn btn-success"
          >
            Available
          </button>
          <button
            onClick={() => updateCrowdedness('moderate')}
            className="btn btn-info"
          >
            Moderate
          </button>
          <button
            onClick={() => updateCrowdedness('crowded')}
            className="btn btn-warning"
          >
            Crowded
          </button>
          <button
            onClick={() => updateCrowdedness('full')}
            className="btn btn-error"
          >
            Full
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
