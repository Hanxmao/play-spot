import { render } from '@testing-library/react';
import App from '../../src/App';
import { MemoryRouter } from 'react-router-dom';

test('renders main app under 300ms', () => {
  const start = performance.now();
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const end = performance.now();
  expect(end - start).toBeLessThan(300);
});