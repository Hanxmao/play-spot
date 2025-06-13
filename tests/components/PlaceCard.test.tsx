import { render, screen } from '@testing-library/react';
import PlaceCard from '../../src/components/PlaceCard';
import type { Location } from '../../src/types/entities';
import '@testing-library/jest-dom';

const mockLocation: Location = {
  locationId: 1,
  name: 'Tennis Court A',
  address: '123 Court St',
  latitude: 49.123,
  longitude: -123.456,
  sports: [],
  locationActivities: [],
  fullnessScore: 3,
};

test('renders PlaceCard with location data', () => {
  render(<PlaceCard location={mockLocation} />);
  expect(screen.getByText('Tennis Court A')).toBeInTheDocument();
  expect(screen.getByText('123 Court St')).toBeInTheDocument();
  expect(screen.getByText(/available/i)).toBeInTheDocument(); // based on fullnessScore = 3
});

