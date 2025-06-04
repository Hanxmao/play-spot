import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { Location } from "../types/entities";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = {
    lat: 49.24960531403115, // Default center at BCIT
    lng: -123.00133552649014,
};

const getColor = (status?: string) => {
    switch (status) {
        case "full":
            return "badge-error";
        case "crowded":
            return "badge-warning";
        case "moderate":
            return "badge-info";
        case "available":
            return "badge-success";
        default:
            return "badge-neutral";
    }
};

const getCrowdednessFromScore = (score: number | undefined): "full" | "crowded" | "moderate" | "available" => {
    if (score === undefined) return "available";
    if (score >= 90) return "full";
    if (score >= 70) return "crowded";
    if (score >= 40) return "moderate";
    return "available";
};

const MapPage : React.FC = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [selected, setSelected] = useState<Location | null>(null);

    const [locations, setLocations] = useState<Location[]>([]);
    const derivedCrowdedness = selected ? getCrowdednessFromScore(selected.fullnessScore) : undefined
    const [allSports, setAllSports] = useState<string[]>([]);

    const [userLocation, setUserLoaction] = useState<null | { lat: number; lng: number }>(null);
    const [mapCenter, setMapCenter] = useState<null | { lat: number; lng: number }>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        const sportName = searchParams.get("sportName");
        const locationId = searchParams.get("locationId");

        const fetchData = async () => {
            try {                
                const [locationsResponse, sportsResponse] = await Promise.all([
                    axios.get(sportName
                        ? `${import.meta.env.VITE_BACKEND_URL}/locations?sportName=${sportName}`
                        : `${import.meta.env.VITE_BACKEND_URL}/locations`
                    ),
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/sports`),
                ]);

                const fetchedLocations = locationsResponse.data as Location[];
                setLocations(fetchedLocations);
                
                const fetchedSports = sportsResponse.data as string[];
                setAllSports(fetchedSports);

                if (locationId) {
                    const match = fetchedLocations.find((loc: Location) => loc.locationId.toString() === locationId);
                    if (match) {
                        setSelected(match);
                        if (mapRef.current) {
                            mapRef.current.panTo({ lat: match.latitude, lng: match.longitude });
                        } else {
                            setMapCenter({ lat: match.latitude, lng: match.longitude });
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch locations:", error);
            }
        };
        fetchData();
    }, [searchParams]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLoaction({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams.toString());
        if (selected) {
            newParams.set("locationId", selected.locationId.toString());
            if (mapRef.current) {
                mapRef.current.panTo({ lat: selected.latitude, lng: selected.longitude });
            } else {
                setMapCenter({ lat: selected.latitude, lng: selected.longitude });
            }
        } else {
            newParams.delete("locationId");
        }
        setSearchParams(newParams, { replace: true });
    }, [mapRef, searchParams, selected, setSearchParams]);

    const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSportName = event.target.value;
        const newParams = new URLSearchParams(searchParams.toString());
        if (newSportName) {
            newParams.set("sportName", newSportName);
        } else {
            newParams.delete("sportName");
        }
        newParams.delete("locationId");
        setSelected(null);
        setSearchParams(newParams, { replace: true });
    }

    if (!isLoaded) return (
        <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="w-full h-[calc(100vh-theme(spacing.16))] relative">
            <div className="absolute top-20 right-2 z-10 bg-white bg-opacity-90 rounded shadow">
                <select
                    className="select select-base w-full max-w-xs"
                    value={searchParams.get("sportName") || ""}
                    onChange={handleSportChange}
                >
                    <option value="">All Sports</option>
                    {allSports.map((sport) => (
                        <option key={sport} value={sport}>{sport}</option>
                    ))}
                </select>
            </div>

            <GoogleMap 
                mapContainerStyle={containerStyle} 
                center={mapCenter || userLocation || defaultCenter} 
                zoom={14} 
                options={{ clickableIcons: false }}
                onClick={() => setSelected(null)}
                onLoad={(map) => { mapRef.current = map; }}
            >
                {locations.map((loc) => (
                    <Marker
                        key={loc.locationId}
                        position={{lat: loc.latitude, lng: loc.longitude}}
                        onClick={() => setSelected(loc)}
                    />
                ))}

                {selected && (
                    <InfoWindow
                        position={{ lat: selected.latitude + .00002, lng: selected.longitude }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div className="p-2">
                            <h1 className="font-bold text-lg">{selected.name}</h1>
                            <h3 className="text-base text-gray-600">Sports Available:</h3>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                {selected.sports && selected.sports.length > 0
                                ? selected.sports.map((sport, index) => (<li key={index}>{sport.name}</li>))
                                : <li>Sports unknown</li>}
                            </ul>
                            <div className="flex justify-center items-center mt-2">
                                <div className={`badge ${getColor(derivedCrowdedness)} capitalize`}>
                                    {derivedCrowdedness || ""}
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-1">
                                <button
                                    className="btn btn-primary btn-sm mt-2" 
                                    onClick={() => {
                                        navigate(`/locations/${selected.locationId}`, { state: {place: selected}})
                                    }}
                                >
                                    info
                                </button>
                            </div>
                        </div>
                    </InfoWindow>
                )}

                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 7,
                            fillColor: "#4285F4",
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: "#ffffff",
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    );
};

export default MapPage;
