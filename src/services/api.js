import axios from 'axios';

// Tạo instance axios và export named
export const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const logout = () => api.post('/auth/logout');

// Vocabulary
export const listVocabulary = () => api.get('/vocab');
export const addVocabulary = (data) => api.post('/vocab', data);

// Tests
export const generateMCQ = () => api.get('/tests/mcq');
export const generateEssay = () => api.get('/tests/essay');
export const submitTest = (data) => api.post('/tests/submit', data);

// Dashboard
export const getOverview = () => api.get('/dashboard/overview');
export const setGoal = (data) => api.post('/dashboard/set-goal', data);