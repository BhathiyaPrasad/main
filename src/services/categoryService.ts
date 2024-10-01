import apiClient from "@/lib/axios";


export const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/category'); // Relative URL to the base URL set in apiClient
      if (response.data && response.data.data) {
        const { results, extras } = response.data.data;
        return { categories: results, total: extras.total };
      } else {
        console.error('No data in the response:', response.data);
        return { categories: [], total: 0 };
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };




export const addCategory = async (categoryData: any) => {
    try {
        const response = await apiClient.post('/catalog', categoryData);
        return response.data;
    } catch (error: any) {
        console.error("Error details:", error.response?.data || error.message);
        throw error;
    }
}
