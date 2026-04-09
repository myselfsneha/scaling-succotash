import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_BASE_URL = 'http://localhost:5000/api';
const TOKEN_KEY = 'auth_token';

export const createApiService = (baseUrl = DEFAULT_BASE_URL) => {
  const normalizeBaseUrl = baseUrl.replace(/\/+$/, '');

  const getAuthToken = async () => AsyncStorage.getItem(TOKEN_KEY);

  const setAuthToken = async (token) => {
    if (!token) {
      return;
    }

    await AsyncStorage.setItem(TOKEN_KEY, token);
  };

  const clearAuthToken = async () => AsyncStorage.removeItem(TOKEN_KEY);

  const request = async (path, options = {}) => {
    const token = await getAuthToken();

    const response = await fetch(`${normalizeBaseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
    getAuthToken,
    setAuthToken,
    clearAuthToken,
    login: async ({ email, password }) => {
      const data = await request('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      await setAuthToken(data?.token);
      return data;
    }
  };
};

export const apiService = createApiService();
