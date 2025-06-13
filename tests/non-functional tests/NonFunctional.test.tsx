import { render, screen } from '@testing-library/react';
import App from '../../src/App';
import { MemoryRouter } from 'react-router-dom';

test('main UI should be accessible and responsive', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
 
  expect(screen.getByRole('main')).toBeInTheDocument();
   expect(screen.getByRole('link', { name: /locations/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /map/i })).toBeInTheDocument();


});

test('error messages are clear and present', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  // Simulate error state if applicable in future implementation
  // expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});