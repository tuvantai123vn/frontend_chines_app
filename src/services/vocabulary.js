import {api} from '../services/api';

export const listVocabulary = async () => {
  try {
    const response = await api.get('/vocab');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch vocabulary');
  }
};

export const addVocabulary = async (wordData) => {
  try {
    const response = await api.post('/vocab', wordData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add vocabulary');
  }
};

export const updateVocabulary = async (id, updates) => {
  try {
    const response = await api.patch(`/vocab/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update vocabulary');
  }
};

export const deleteVocabulary = async (id) => {
  try {
    const response = await api.delete(`/vocab/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete vocabulary');
  }
};