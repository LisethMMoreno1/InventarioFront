import config from "../config/config.json";  

const baseUrl = config.baseUrl;

 const fetchFromAPI = async (endpoint: string, options?: RequestInit) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      ...options, // Opciones adicionales como headers, method, etc.
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};


export default fetchFromAPI