const API_URL = 'https://flavorforge-tgch.onrender.com';

export const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
};

export const getCurrentUser = async (token: string) => {
    const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    return response.json();
};
