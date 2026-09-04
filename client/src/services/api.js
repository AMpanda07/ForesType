

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = async () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (localStorage.getItem('jwtToken')) {
    headers['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
  }
  
  return headers;
};

export const apiService = {
  syncFirebaseUser: async (firebaseToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${firebaseToken}`
        }
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getProfile: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  getLeaderboard: async (limit = 50, page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard?limit=${limit}&page=${page}`);
      return await response.json();
    } catch (error) {
      return { success: false, data: [] };
    }
  }
};

export const fetchRecords = async (mode = 'all', limit = 50) => {
  try {
    const response = await fetch(`${API_BASE_URL}/records?mode=${mode}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.warn('⚠️ Fetching records failed, using local offline fallback:', err.message);
    return {
      success: false,
      source: 'offline',
      error: err.message,
      data: []
    };
  }
};

export const getMyRecords = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/records/me`, {
      headers
    });
    return await response.json();
  } catch (err) {
    return { success: false, data: [] };
  }
};

export const submitRecord = async (recordData) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/records`, {
      method: 'POST',
      headers,
      body: JSON.stringify(recordData)
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to submit record to leaderboard',
        errors: data.errors || []
      };
    }

    return data;
  } catch (err) {
    console.error('❌ Network error submitting record:', err.message);
    return {
      success: false,
      message: 'Network connection error. High score saved locally.',
      error: err.message
    };
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) return { status: 'down' };
    return await response.json();
  } catch (err) {
    return { status: 'offline', error: err.message };
  }
};
