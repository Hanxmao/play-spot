import axios from 'axios';
import React, { useEffect, useState, FormEvent } from 'react';

interface LocationDTO {
    locationId: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
};

interface SportDTO {
    sportId: number;
    locationId: number;
    name: string;
};

const AdminPage : React.FC = () => {
    const [locations, setLocations] = useState<LocationDTO[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<LocationDTO | null>(null);
    const [sports, setSports] = useState<SportDTO[]>([]);
    const [newLocation, setNewLocation] = useState({ name: '', address: '', latitude: 0, longitude: 0 });
    const [newSport, setNewSport] = useState({ name: '', locationId: 0 });

    // Fetch all Locations
    const fetchLocations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL_LOCATION}/api/Location/simple`);
            setLocations(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        };
    };

    // Fetch sports for the selected location
    const fetchSports = async (locationId: number) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL_SPORT}/api/Sport?locationId=${locationId}`);
            setSports(response.data);
        } catch (error) {
            console.error("Error fetching sports:", error);
        };
    };
    
    useEffect(() => {
        fetchLocations();
    }, []);

    useEffect(() => {
        if (selectedLocation) {
            fetchSports(selectedLocation.locationId);
        } else {
            setSports([]);
        }
    }, [selectedLocation]);

    // CRUD operations for Locations
    const handleCreateLocation = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_LOCATION}/api/Location`, newLocation);
            const createdLocation: LocationDTO = response.data;
            setLocations([...locations, createdLocation]);
            setNewLocation({ name: '', address: '', latitude: 0, longitude: 0 });
        } catch (error) {
            console.error("Error creating location:", error);
        }
    };
    const handleDeleteLocation = async (locationId: number) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL_LOCATION}/api/Location/${locationId}`);
            setLocations(locations.filter(loc => loc.locationId !== locationId));
            if (selectedLocation && selectedLocation.locationId === locationId) {
                setSelectedLocation(null);
            }
        } catch (error) {
            console.error("Error deleting location:", error);
        }
    };

    // CRUD operations for Sports
    const handleCreateSport = async (e: FormEvent) => {
        e.preventDefault();
        if (selectedLocation) {
            try {
                console.log("Creating sport for location:", selectedLocation);
                console.log("New sport data:", newSport);
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL_SPORT}/api/Sport`, newSport);
                setSports([...sports, response.data]);
                setNewSport({ name: '', locationId: 0 });
            } catch (error) {
                console.error("Error creating sport:", error);
            }
        }
    };

    const handleDeleteSport = async (sportId: number) => {
        if (!selectedLocation) return;
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL_SPORT}/api/Sport/${sportId}`);
            setSports(sports.filter(sport => sport.sportId !== sportId));
        } catch (error) {
            console.error("Error deleting sport:", error);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <div className='flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0'>
                <div className='w-full md:w-1/3'>
                    <h2 className='text-xl font-semibold mb-2'>Locations</h2>
                    <ul>
                        {locations.map(location => (
                            <li
                                key={location.locationId}
                                className={`p-1 mb-1 border rounded cursor-pointer ${selectedLocation?.locationId === location.locationId ? 'bg-gray-200' : ''}`}
                                onClick={() => {
                                    if (selectedLocation && selectedLocation.locationId === location.locationId) {
                                        setSelectedLocation(null);
                                    } else {
                                        setSelectedLocation(location);
                                    }
                                }}
                            >
                                {location.name}
                            </li>
                        ))}
                    </ul>
                    <button
                        className='btn mt-2 px-2 py-1 bg-red-500 text-white rounded'
                        disabled={!selectedLocation}
                        onClick={() => selectedLocation && handleDeleteLocation(selectedLocation.locationId)}
                    >
                        Delete Location
                    </button>

                    <form className='mt-4 space-y-2' onSubmit={handleCreateLocation}>
                        <h3 className='text-lg'>New Location</h3>
                        <input className='w-full border p-1' placeholder='Name' value={newLocation.name} onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })} required />
                        <input className='w-full border p-1' placeholder='Address' value={newLocation.address} onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })} required />
                        <input className='w-full border p-1' placeholder='Latitude' type='number' value={newLocation.latitude} onChange={(e) => setNewLocation({ ...newLocation, latitude: parseFloat(e.target.value) })} required />
                        <input className='w-full border p-1' placeholder='Longitude' type='number' value={newLocation.longitude} onChange={(e) => setNewLocation({ ...newLocation, longitude: parseFloat(e.target.value) })} required />
                        <button type='submit' className='btn mt-2 px-2 py-1 bg-green-500 text-white rounded'>Create Location</button>
                    </form>
                </div>

                {selectedLocation && (
                    <div className='w-full md:w-2/3'>
                        <h2 className='text-xl mb-2'>Manage Sports for {selectedLocation.name}</h2>
                        <ul className='border rounded p-2 mb-2 flex flex-col gap-2'>
                            {sports.map(sport => (
                                <li
                                    key={sport.sportId}
                                    className='flex items-center justify-between p-3 border-b last:border-b-0'
                                    style={{ minHeight: '3rem' }}
                                >
                                    <span>{sport.name}</span>
                                    <button className='btn text-red-500' onClick={() => handleDeleteSport(sport.sportId)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        <div className='mb-4'>
                            <form onSubmit={handleCreateSport} className='space-y-2'>
                                <h3 className='text-lg'>Add New Sport</h3>
                                <input className='w-full border p-1' placeholder='Sport Name' value={newSport.name} onChange={(e) => setNewSport({ ...newSport, name: e.target.value, locationId: selectedLocation.locationId })} required />
                                <button type='submit' className='btn mt-2 px-2 py-1 bg-green-500 text-white rounded'>Add Sport</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
