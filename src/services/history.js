// src/services/history.js
import { api } from './api';

export const getTestHistory = async () => {
  try {
    const response = await api.get('/history');
    return response;
  } catch (error) {
    console.error('Error fetching test history:', error);
    throw error;
  }
};