import apiClient from "@/lib/axios";


export const fetchVariants = async (categoryId:string) => {
    try {
      const params = {category_id:categoryId}
      const response = await apiClient.get('/variant-group' , {params}); // Relative URL to the base URL set in apiClient
      if (response.data && response.data.data) {
        const { results, extras  } = response.data.data;
        
        return { variants: results, total: extras.total,   variantsSet: results.map((item: any) => item.variant || [])};
      } else {
        console.error('No data in the response:', response.data);
        return { variants: [], total: 0 , variantsSet: [] };
      }
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw error;
    }
  };

