// src/services/supplierService.ts
import apiClient from '@/lib/axios';

export const fetchReps = async () => {
  try {
    const response = await apiClient.get('/rep'); // Relative URL to the base URL set in apiClient
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
