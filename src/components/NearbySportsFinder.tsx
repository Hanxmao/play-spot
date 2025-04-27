import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import PlaceCard from './PlaceCard';
import { CustomPlace } from '../types/CustomPlace';

const NearbySportsFinder: React.FC = () => {
  const [sportType, setSportType] = useState('');
  const [places, setPlaces] = useState<CustomPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCw09DACyXcLPQieL7vQFqmSC7F7NDnvdg&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSport = e.target.value;
    setSportType(selectedSport);
    setPlaces([]);

    if (!selectedSport || !scriptLoaded) return;

    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const location = new window.google.maps.LatLng(latitude, longitude);
        sessionStorage.setItem('userLat', latitude.toString());
        sessionStorage.setItem('userLng', longitude.toString());
        
        if (mapRef.current) {
          const service = new window.google.maps.places.PlacesService(mapRef.current);

          service.nearbySearch(
            {
              location,
              radius: 5000,
              keyword: selectedSport,
            },
            (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                const formattedPlaces = results.map((place) => ({
                  name: place.name || 'Unknown Place',
                  vicinity: place.vicinity || 'Unknown Address',
                  lat: place.geometry?.location?.lat() || 0,
                  lng: place.geometry?.location?.lng() || 0,
                  sport: selectedSport,
                }));
                setPlaces(formattedPlaces);
              } else {
                console.error('PlacesService failed:', status);
              }
              setLoading(false);
            }
          );
        }
      }, (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 relative">
      <div ref={mapRef} style={{ display: 'none' }} />

      <div className="max-w-md mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Find Nearby Sports</h2>

        <label htmlFor="sport" className="block text-xl font-semibold mb-2">
          Choose a Sport:
        </label>
        <select
          id="sport"
          className="w-full p-2 border rounded shadow"
          value={sportType}
          onChange={handleSportChange}
          disabled={!scriptLoaded}
        >
          <option value="">-- Select a Sport --</option>
          <option value="tennis court">Tennis</option>
          <option value="swimming pool">Swimming</option>
          <option value="soccer field">Soccer</option>
          <option value="lacrosse field">Lacrosse</option>
          <option value="basketball court">Basketball</option>
        </select>
      </div>

      {loading && <p className="text-center">Loading nearby places...</p>}

      {!loading && places.length > 0 && (
        <div className="grid gap-4 max-w-2xl mx-auto">
          {places.map((place, idx) => (
            <div key={idx} onClick={() => navigate(`/locations/${idx}`, { state: { place } })} className="cursor-pointer">
              <PlaceCard
                name={place.name}
                vicinity={place.vicinity}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && sportType && places.length === 0 && (
        <p className="text-center text-gray-500">No locations found for {sportType}.</p>
      )}
    </div>
  );
};

export default NearbySportsFinder;
