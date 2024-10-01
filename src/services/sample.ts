import axios from 'axios';

// Function to fetch stock data
const fetchStockData = async () => {
  const categoryId = 'Ch72gsb320000udocl363eofy'; // Replace with your dynamic value
  const variantIds = [
    'Ch72gsb320000udocl363eofy', // Replace with your dynamic values
    'Ch72gsb320000udocl363eofya',
  ];

  try {
    // Constructing the query parameters
    const params = {
      category_id: categoryId,
      variant_ids: variantIds,
    };

    // Making the GET request
    const response = await axios.get('http://localhost:8000/v1/stock', { params });

    console.log('Stock Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

// Call the function (you can call it in a useEffect or any event handler)
fetchStockData();

export default fetchStockData