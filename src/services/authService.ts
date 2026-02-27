const API_URL = 'https://flavorforge-tgch.onrender.com';

export const loginWithGoogle = () => {
    window.location.href =
        "https://flavorforge-tgch.onrender.com/auth/google";
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

export const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await fetch(
        "https://flavorforge-tgch.onrender.com/auth/register",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    );

    return res.json();
};

export const loginUser = async (data: {
    email: string;
    password: string;
}) => {
    const res = await fetch(
        "https://flavorforge-tgch.onrender.com/auth/login",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }
    );

    return res.json();
};
