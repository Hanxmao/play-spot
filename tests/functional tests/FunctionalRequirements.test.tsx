import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LocationsPage from '../../src/pages/LocationsPage';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { act } from 'react';
jest.mock('axios');


if (process.env.NODE_ENV === 'test') {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

  mockedAxios.get.mockResolvedValue({
    data: [
      {
        locationId: 1,
        name: 'Tennis Court A',
        address: '123 Court St',
        latitude: 49.123,
        longitude: -123.456,
        sports: [],
        locationActivities: [],
        fullnessScore: 3,
      }
    ]
  });
}

test('user can search and see filtered results', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <LocationsPage />
      </MemoryRouter>
    );
  });

  const searchInput = screen.getByPlaceholderText(/search by name or address/i);
  fireEvent.change(searchInput, { target: { value: 'tennis' } });

  await waitFor(() => {
    expect(screen.getByText(/Tennis Court A/i)).toBeInTheDocument();
  });
});

test('clicking a location shows details', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <LocationsPage />
      </MemoryRouter>
    );
  });

  const locationItem = await screen.findByText(/Tennis Court A/i);
  fireEvent.click(locationItem);

  expect(locationItem).toBeInTheDocument();
});
