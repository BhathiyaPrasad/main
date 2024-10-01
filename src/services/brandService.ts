import apiClient from '@/lib/axios';

export const fetchBrands = async () => {
  try {
    const response = await apiClient.get('/brand'); // Relative URL to the base URL set in apiClient
    if (response.data && response.data.data) {
      const { results, extras } = response.data.data;
      return { brands: results, total: extras.total };
    } else {
      console.error('No data in the response:', response.data);
      return { brands: [], total: 0 };
    }
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const addBrand = async (brandData: any) => {
    try {
      const response = await apiClient.post('/brand', brandData);
      if (response.data && response.data.data) {
        return response.data.data; // Assuming the created brands is returned in the response
      } else {
        console.error('No data in the response:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Error adding invoice:', error);
      throw error;
    }
  };