export const getApiBaseUrl = (): string => {
  // Use process.env for testing or fallback
  if (process.env.NODE_ENV === 'test') {
    return 'http://localhost:5102';
  }

  // ✅ At build time, Vite will replace this string literal
  return __APP_BACKEND_URL__;
};
