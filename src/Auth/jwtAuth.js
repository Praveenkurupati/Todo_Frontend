import jwtDecode from "jwt-decode";

export const fetchWithAuthorization = async (url, method, token) => {
    try {
        if (isTokenExpired(token)) {
            // logoutUser(); 
            throw new Error('Token expired');
        }
        const response = await fetch(url, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch with authorization error:', error);
        throw error;
    }
};



const isTokenExpired = (token) => {
    if (!token) return true; 
    try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.exp) {
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        }
        return true;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};

const logoutUser = () => {
    localStorage.clear()
    window.location.href = '/login'; 
};