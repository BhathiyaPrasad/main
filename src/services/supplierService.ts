// src/services/supplierService.ts
import apiClient from '@/lib/axios';

export const fetchSuppliers = async () => {
  try {
    const response = await apiClient.get('/supplier'); // Relative URL to the base URL set in apiClient
    if (response.data && response.data.data && response.data.data.results) {
      return response.data.data.results;
    } else {
      console.error('No results in the response:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

// Add a new supplier
export const addSupplier = async (SupplierData: any) => {
    try {
      const response = await apiClient.post('/supplier', SupplierData);
      if (response.data && response.data.data) {
        return response.data.data; // Assuming the created supplier is returned in the response
      } else {
        console.error('No data in the response:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      throw error;
    }
  };