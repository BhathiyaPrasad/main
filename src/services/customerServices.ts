import apiClient from "@/lib/axios";

export const fetchCustomers = async () => {
    try {
        const response = await apiClient.get('/customer');
        return response.data.data.results
    } catch (error) {
        console.error("Error fetching invoices", error)
        throw error
    }
}


export const addCustomer = async (customerData: any) => {
    try {
        const response = await apiClient.post('/customer', customerData);
        return response.data;
    } catch (error: any) {
        console.error("Error details:", error.response?.data || error.message);
        throw error;
    }
}
