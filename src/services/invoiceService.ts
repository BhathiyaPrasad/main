// src/services/invoiceService.ts
import apiClient from '@/lib/axios';

export const fetchInvoices = async () => {
  try {
    const response = await apiClient.get('/invoice'); // Relative URL to the base URL set in apiClient
    if (response.data && response.data.data) {
      const { results, extras } = response.data.data;
      return { invoices: results, total: extras.total };
    } else {
      console.error('No data in the response:', response.data);
      return { invoices: [], total: 0 };
    }
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

// Add a new invoice
export const addInvoice = async (invoiceData: any) => {
    try {
      const response = await apiClient.post('/invoice', invoiceData);
      if (response.data && response.data.data) {
        return response.data.data; // Assuming the created invoice is returned in the response
      } else {
        console.error('No data in the response:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Error adding invoice:', error);
      throw error;
    }
  };