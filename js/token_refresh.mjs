const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

const setAccessToken = (token) => {
    localStorage.setItem('access_token', token);
};

export const refreshToken = async () => {
    const refresh_token = getRefreshToken();

    try {
        const response = await fetch('http://127.0.0.1:8000/accounts/token/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refresh_token }),
        });

        if (response.ok) {
            const data = await response.json();
            const newAccessToken = data.access_token;

            setAccessToken(newAccessToken);

            return newAccessToken;
        } else {
            console.error('Refresh failed:', response.statusText);
            throw new Error('Refresh failed');
        }
    } catch (error) {
        console.error('Refresh failed:', error.message);
        throw error;
    }
};