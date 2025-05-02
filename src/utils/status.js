// utils/status.js
const STATUS = {
    CREATED: {
      code: 201,
      message: 'Tạo thành công'
    },
    OK: {
      code: 200,
      message: 'Thành công'
    },
    BAD_REQUEST: {
      code: 400,
      message: 'Yêu cầu không hợp lệ'
    },
    UNAUTHORIZED: {
      code: 401,
      message: 'Chưa xác thực'
    },
    FORBIDDEN: {
      code: 403,
      message: 'Bạn không có quyền truy cập'
    },
    NOT_FOUND: {
      code: 404,
      message: 'Không tìm thấy'
    },
    INTERNAL_SERVER_ERROR: {
      code: 500,
      message: 'Lỗi server'
    },
    CONFLICT: {
      code: 409,
      message: 'Xung đột dữ liệu'
    },
    UNPROCESSABLE_ENTITY: {
      code: 422,
      message: 'Dữ liệu không hợp lệ'
    },
    TOO_MANY_REQUESTS: {
      code: 429,
      message: 'Quá nhiều yêu cầu'
    },
    SERVICE_UNAVAILABLE: {
      code: 503,
      message: 'Dịch vụ không khả dụng'
    }
  };
  
  export default STATUS; // Xuất default
  