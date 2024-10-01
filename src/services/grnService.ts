// src/services/grnService.ts
import apiClient from '@/lib/axios';

export const fetchGrn = async () => {
  try {
    const response = await apiClient.get('/grn'); // Make sure the endpoint is correct for GRN
    if (response.data && response.data.data) {
      const { results, extras } = response.data.data;
      const {stockResult} = response.data
      return { grnData: results,grnStock:stockResult, total: extras.total }; // Adjusted for GRN data
    } else {
      console.error('No data in the response:', response.data);
      return { grnData: [], total: 0 };
    }
  } catch (error) {
    console.error('Error fetching GRN data:', error);
    throw error;
  }
};


export const addGrn = async (grnData: any) => {
  try{
    const response =  await apiClient.post('/grn',grnData);
    if (response.data && response.data.data) {
      const {results} = response.data.data
      return {stock:results}
    }
  }catch(error:any){
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
}