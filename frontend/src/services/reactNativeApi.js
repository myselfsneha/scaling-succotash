const DEFAULT_BASE_URL = 'http://localhost:5000/api';

export const createApiService = (baseUrl = DEFAULT_BASE_URL) => {
  const normalizeBaseUrl = baseUrl.replace(/\/+$/, '');

  const request = async (path, options = {}) => {
    const response = await fetch(`${normalizeBaseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || 'API request failed');
    }

    return data;
  };

  return {
    login: ({ email, password }) =>
      request('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
  };
};

export const apiService = createApiService();
