import apiClient from "@/lib/axios";

export const fetchStock = async (categoryId: string, selectedVariants: string[]) => {
  try {
    // Prepare the params object
    
    const params = {
      category_id: categoryId,
      variant_ids: selectedVariants,
       // Use an array for multiple values
    };
  

    // Send the GET request with params
        // Send the GET request with params
        const response = await apiClient.get('/stock', {
          params,
          paramsSerializer: (params) => {
            // Custom serializer to handle repeated params
            return Object.entries(params)
              .map(([key, value]) => {
                // If the value is an array, join it as repeated parameters
                if (Array.isArray(value)) {
                  return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&');
                }
                return `${key}=${encodeURIComponent(value)}`;
              })
              .join('&');
          }
        }); // Updated the URL to match your endpoint

    // Check the response data and return accordingly
    if (response.data && response.data.data) {
      const { results, extras } = response.data.data;

      return { 
        stock: results, 
        total: extras.total, 
        
      };
    } else {
      console.error('No data in the response:', response.data);
      return { stock: [], total: 0};
    }
  } catch (error) {
    console.error('Error fetching variants:', error);
    throw error;
  }
};


export const addStock = async (stock: any) => {
  try {
    // Send the POST request with the stock data
    const response = await apiClient.post('/grn', stock); // Updated the URL to match your endpoint

    // Check the response data and return accordingly
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      console.error('No data in the response:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error adding stock:', error);
    throw error;
  }
}
