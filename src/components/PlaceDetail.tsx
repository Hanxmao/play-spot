import { useLocation, useNavigate } from 'react-router-dom';
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

  const getColor = (status?: string) => {
    switch (status) {
      case 'full':
        return 'bg-red-500';
      case 'crowded':
        return 'bg-yellow-400';
      case 'moderate':
        return 'bg-blue-400';
      case 'available':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
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
    return d.toFixed(2); // distance in km, 2 decimals
  };

  if (!place) {
    return <div className="p-6 text-center text-red-500">Place not found.</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <button onClick={() => navigate('/')} className="text-blue-500 mb-4">← Back</button>
      <h2 className="text-3xl font-bold text-blue-700 mb-4">{place.name}</h2>

      <p className="text-lg text-gray-700 mb-2">{place.vicinity}</p>

      <p className="text-lg mb-2 flex items-center">
        Fullness: 
        <span className={`inline-block w-4 h-4 ml-2 rounded-full ${getColor(place.crowdedness)}`} />
        {place.crowdedness || 'Unknown'}
      </p>

      <p className="text-lg mb-2">Distance: {calculateDistance()} km</p>

      <p className="text-lg mb-6">Sports available: {place.sport || 'Unknown'}</p>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        <button onClick={() => updateCrowdedness('available')} className="bg-green-500 text-white px-4 py-2 rounded">Available</button>
        <button onClick={() => updateCrowdedness('moderate')} className="bg-blue-400 text-white px-4 py-2 rounded">Moderate</button>
        <button onClick={() => updateCrowdedness('crowded')} className="bg-yellow-400 text-white px-4 py-2 rounded">Crowded</button>
        <button onClick={() => updateCrowdedness('full')} className="bg-red-500 text-white px-4 py-2 rounded">Full</button>
      </div>
    </div>
  );
};

export default PlaceDetail;
