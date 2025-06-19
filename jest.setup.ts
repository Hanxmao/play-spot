// jest.setup.ts
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
// Polyfill for Vite's virtual PWA module
jest.mock('virtual:pwa-register', () => ({
  registerSW: () => {},
}));