const API_URL = 'http://auth-service:3000'; // Docker network address for auth-service

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Save JWT to local storage or AsyncStorage (React Native)
    await AsyncStorage.setItem('access_token', data.access_token);

    return data;  // This will contain the JWT
  } catch (error) {
    console.error('Login error:', error);
    throw error;  // You can handle this error in your component as needed
  }
};
