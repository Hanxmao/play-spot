import { useLocation, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { CustomPlace } from '../types/CustomPlace';

const PlaceDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const passedPlace = location.state?.place as CustomPlace | undefined;

  const [place, setPlace] = useState<CustomPlace | null>(passedPlace || null);

  const [showPopup, setShowPopup] = useState(false); // PopUp placeholder

  // Fetch from localStorage if no passed state
  useEffect(() => {
    if (!place && id) {
      const stored = localStorage.getItem('savedPlaces');
      if (stored) {
        const savedPlaces: CustomPlace[] = JSON.parse(stored);
        const found = savedPlaces.find((p) => p.id === id);
        if (found) {
          setPlace(found);
        }
      }
    }
  }, [place, id]);

  const userLat = sessionStorage.getItem('userLat');
  const userLng = sessionStorage.getItem('userLng');

  const getBadgeColor = (status?: string) => {
    switch (status) {
      case 'full':
        return 'badge-error';
      case 'crowded':
        return 'badge-warning';
      case 'moderate':
        return 'badge-info';
      case 'available':
        return 'badge-success';
      default:
        return 'badge-ghost';
    }
  };

  const updateCrowdedness = (status: 'full' | 'crowded' | 'moderate' | 'available') => {
    setPlace((prev) => (prev ? { ...prev, crowdedness: status } : prev));

    // Show thank you popup
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // hide after 2 seconds
  };

  const calculateDistance = () => {
    if (!userLat || !userLng || !place) return '?';
    const R = 6371;
    const lat1 = parseFloat(userLat);
    const lon1 = parseFloat(userLng);
    const lat2 = place.lat;
    const lon2 = place.lng;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(2);
  };

  if (!place) {
    return (
      <div className="p-6 text-center text-error">
        Place not found.
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <button
        onClick={() => navigate(-1)}
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
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-green-300 bg-opacity-90 text-green-900 text-lg px-6 py-4 rounded-xl shadow-2xl">
                Thank you for your response!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
