import {api} from '../services/api';

export const getOverview = async () => {
  try {
    const response = await api.get('/dashboard/overview');
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    console.error('Dashboard service error:', error);
    throw new Error(error.response?.data?.message || 'Lỗi tải dữ liệu dashboard');
  }
};

// Các hàm service khác cho dashboard có thể thêm ở đây