const fetchWithAuth = async (url, options = {}) => {
  // Get the token from localStorage
  const token = localStorage.getItem("token");
  // Add Authorization header with bearer token
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      ...options,
      headers,
    });

    // Check if response status is 401
    if (response.status === 401) {
      // Remove token from localStorage
      localStorage.removeItem("token");
      // Handle unauthorized access (e.g., redirect to login page)
      window.location.href = "/login";
    }

    // Check if response status is 500
    if (response.status === 500) {
      // Handle server error (e.g., display error message to user)
      throw new Error("Server Error");
    }

    // Return the response
    return response;
  } catch (error) {
    throw error;
  }
};

export default fetchWithAuth;
