import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const generateUniqueDomain = async (businessName) => {
  try {
    const response = await api.post('/businesses/generate-domain', { businessName });
    return response.data
  } catch (error) {
    console.error('Error generating domain:', error);
    throw error;
  }
};

export const checkDomainAvailability = async (domain) => {
  try {
    const response = await api.get(`/businesses/check-domain/${domain}`);
    return response.data;
  } catch (error) {
    console.error('Error checking domain:', error);
    throw error;
  }
};

export const saveBusinessData = async (data) => {
  try {
    const response = await api.post('/businesses', data);
    return response.data;
  } catch (error) {
    console.error('Error saving business:', error);
    throw error;
  }
};

export const updateBusinessData = async (id, data) => {
  try {
    const response = await api.put(`/businesses/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating business:', error);
    throw error;
  }
};

export const uploadImage = async (file, fieldName) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('fieldName', fieldName);

    const response = await api.post('/businesses/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


export const login = async (user) => {
  try {
    const response = await api.post('/auth/login', user);
    return response.data;
  } catch (error) {
    console.error('Error saving business:', error);
    throw error;
  }
};

export default api;