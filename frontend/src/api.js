const API_URL = "http://localhost:8000/api/";

export const fetchData = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            ...options.headers,
        },
        credentials: 'include', // Umożliwia wysyłanie ciasteczek
    });
    return response.json();
};

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}auth/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
    }
    return data;
};

export const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}user-info/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    });
    return response.json();
};