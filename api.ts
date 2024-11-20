import axios from 'axios';

export const getVeteranServices = async (zipcode: string) => {
  try {
    const response = await axios.get(`/api/veteranServices?zipcode=${zipcode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching veteran services:', error);
    throw error;
  }
};