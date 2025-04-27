import React from 'react';

interface PlaceCardProps {
  name: string;
  vicinity: string;
  crowdedness?: 'full' | 'crowded' | 'moderate' | 'available';
}

const getColor = (status?: string) => {
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
      return 'badge-ghost'; // gray/neutral
  }
};

const PlaceCard: React.FC<PlaceCardProps> = ({ name, vicinity, crowdedness }) => {
  return (
    <div className="card bg-base-100 shadow-md border hover:shadow-lg transition">
      <div className="card-body p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-primary">{name}</h3>
          {crowdedness && (
            <div className={`badge ${getColor(crowdedness)} capitalize`}>
              {crowdedness}
            </div>
          )}
        </div>
        <p className="text-gray-600">{vicinity}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
