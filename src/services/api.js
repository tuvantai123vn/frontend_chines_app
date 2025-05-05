import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const loginAPI = (data) => api.post('/auth/login', data);
export const registerAPI = (data) => api.post('/auth/register', data);
export const logoutAPI = () => api.post('/auth/logout');

// Vocabulary
export const listVocabulary = () => api.get('/vocab');
export const addVocabulary = (data) => api.post('/vocab', data);
export const getWordMeaning = (params) => api.get('/vocab/get-pinyin-meaning', params);

// Tests
export const generateMCQ = () => api.get('/tests/mcq');
export const generateEssay = () => api.get('/tests/essay');
export const submitTest = (data) => api.post('/tests/submit', data);
export const getTestHistory = () => api.get('/tests/test-history');
export const getTestResultById = (id) => api.get(`/tests/test-result/${id}`);

// Dashboard
export const getOverview = () => api.get('/dashboard/overview');
export const setGoal = (data) => api.post('/dashboard/set-goal', data);
