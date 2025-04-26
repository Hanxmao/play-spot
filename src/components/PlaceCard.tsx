import React from 'react';

interface PlaceCardProps {
  name: string;
  vicinity: string;
  crowdedness?: 'full' | 'crowded' | 'moderate' | 'available';
}

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
      return 'bg-gray-300'; // Unknown status
  }
};

const PlaceCard: React.FC<PlaceCardProps> = ({ name, vicinity, crowdedness }) => {
  return (
    <div className="p-4 rounded shadow bg-white border-l-4 border-blue-400 flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div
          className={`w-4 h-4 rounded-full ${getColor(crowdedness)}`}
          title={crowdedness || 'Unknown'}
        />
      </div>
      <p className="text-sm text-gray-600">{vicinity}</p>
    </div>
  );
};

export default PlaceCard;
