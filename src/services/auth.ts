import apiClient from "@/lib/axios";


export const checkAuth = async () => {
  try {
    // Make the GET request to check if the user is authenticated
    const response = await apiClient.get('/auth/me');
    
    // Assuming the server returns a status code or a token to indicate auth success
    if (response.status === 200 && response.data) {
      console.log('User is authenticated:', response.data);
      return response.data; // Return the response data (e.g., token, user info)
    } else {
      console.error('Authentication failed:', response.data);
      throw new Error('Authentication failed');
    }
  } catch (error: any) {
    console.error('Error during authentication:', error.message || error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


// Login function

export const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
      },{ withCredentials: true });
  
      if (response.data) {
        return response.data; // Assuming the token and user details are returned
      } else {
        throw new Error('Login failed, no token received');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Propagate the error to the caller
    }
  };