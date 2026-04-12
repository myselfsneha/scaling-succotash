const API_BASE_URL = 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const authApi = {
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }),
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
};

export const studentApi = {
  list: (token) =>
    request('/students', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  create: (token, payload) =>
    request('/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }),
  update: (token, id, payload) =>
    request(`/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }),
  remove: (token, id) =>
    request(`/students/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
};

export const dashboardApi = {
  stats: (token) =>
    request('/dashboard/stats', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
};

export const feeApi = {
  create: (token, payload) =>
    request('/fees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }),
  list: (token) =>
    request('/fees', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  summary: (token) =>
    request('/fees/summary', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
};

export const attendanceApi = {
  create: (token, payload) =>
    request('/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }),
  list: (token) =>
    request('/attendance', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
  summary: (token) =>
    request('/attendance/summary', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
};
