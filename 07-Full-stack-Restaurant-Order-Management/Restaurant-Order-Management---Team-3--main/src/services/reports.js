import { axiosInstance as api } from "./axiosInstance";

export const getReports = async (params = {}) => {
  try {
    const response = await api.get(`/reports`, { params });
    if (response.data?.data.length) {
      return {
        success: true,
        data: response.data?.data,
        total: response.data?.total,
        limit: response.data?.limit,
        skip: response.data?.skip,
      };
    } else {
      return {
        success: false,
        message: response.response?.data?.detail || "Something went wrong.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: response.response?.data?.detail || "Something went wrong.",
    };
  }
};

export const getTransactions = async (params = {}) => {
  try {
    const response = await api.get(`/reports/transactions`, { params });
    if (response.data?.data.length) {
      return {
        success: true,
        data: response.data?.data,
        total: response.data?.total,
        limit: response.data?.limit,
        skip: response.data?.skip,
      };
    } else {
      return {
        success: false,
        message: response.response?.data?.detail || "Something went wrong.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: response.response?.data?.detail || "Something went wrong.",
    };
  }
};

export const getOverall = async (params = {}) => {
  try {
    const response = await api.get(`/reports/overall`, { params });
    if (response.data?.data.length) {
      return {
        success: true,
        data: response.data?.data,
        total: response.data?.total,
        limit: response.data?.limit,
        skip: response.data?.skip,
      };
    } else {
      return {
        success: false,
        message: response.response?.data?.detail || "Something went wrong.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: response.response?.data?.detail || "Something went wrong.",
    };
  }
};

export const getTrendingMenu = async (params = {}) => {
  try {
    const response = await api.get(`/reports/trending-menu`, { params });
    if (response.data?.data.length) {
      return {
        success: true,
        data: response.data?.data,
        total: response.data?.total,
        limit: response.data?.limit,
        skip: response.data?.skip,
      };
    } else {
      return {
        success: false,
        message: response.response?.data?.detail || "Something went wrong.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: response.response?.data?.detail || "Something went wrong.",
    };
  }
};

export const getIncome = async (params = {}) => {
  try {
    const response = await api.get(`/reports/income`, { params });
    if (response.data?.data.length) {
      return {
        success: true,
        data: response.data?.data,
        total: response.data?.total,
        limit: response.data?.limit,
        skip: response.data?.skip,
      };
    } else {
      return {
        success: false,
        message: response.response?.data?.detail || "Something went wrong.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: response.response?.data?.detail || "Something went wrong.",
    };
  }
};
