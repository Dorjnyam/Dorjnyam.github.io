const API_BASE_URL = "https://doko.xxk.app"; 


const ApiConstants = {
    apiLogin: "/users/login",
    apiToken: "/users/token/profile",
    apiRegister: "/users/register",
    apiUserProfile: "/users",
    apiUpdateProfile: "/users/update/",
    apiResetPassword: "/users/reset-password",
    apiTransactions: "/users/transactions",
    apiAddCard: "/users/card/add-card",
    apiGetCards: "/users/card/cards",
};


function saveSession(token, userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
}


function getSession() {
    return {
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId"),
    };
}


function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}


async function loginUser(userData) {
    const url = API_BASE_URL + ApiConstants.apiLogin;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Login failed: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.token || !data.userId) {
            throw new Error("Invalid response from the server. Missing token or userId.");
        }

        saveSession(data.token, data.userId);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Login error:", error.message);
        alert(`Error: ${error.message}`);
    }
}

async function registerUser(userData) {
    const url = API_BASE_URL + ApiConstants.apiRegister;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        alert("Registration successful! Please log in.");
        window.location.href = "index.html";
    } catch (error) {
        alert(error.message);
    }
}


async function resetPassword(email) {
    const url = API_BASE_URL + ApiConstants.apiResetPassword;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error(`Failed to reset password: ${response.statusText}`);
        }

        alert("Password reset email sent.");
    } catch (error) {
        alert(error.message);
    }
}


async function getUserData() {
    const { token } = getSession();
    const url = API_BASE_URL + ApiConstants.apiToken;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}


async function updateUserProfile(firstName, lastName, photoUrl) {
    const { token, userId } = getSession();
    const url = `${API_BASE_URL}${ApiConstants.apiUpdateProfile}${userId}`;
    const updatedData = { first_name: firstName, last_name: lastName, photo_url: photoUrl };

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update profile: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}


async function addCard(cardData) {
    const { token, userId } = getSession();
    const url = API_BASE_URL + ApiConstants.apiAddCard;

    const cardPayload = { ...cardData, user_id: userId };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cardPayload),
        });

        if (!response.ok) {
            throw new Error(`Failed to add card: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}


async function getCards() {
    const { token } = getSession();
    const url = API_BASE_URL + ApiConstants.apiGetCards;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch cards: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}
