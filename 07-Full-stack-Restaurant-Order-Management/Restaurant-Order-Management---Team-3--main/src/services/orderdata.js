import { axiosInstance } from "./axiosInstance";

const getOrderData = async (params = {}) => {
  // params will include skip, limit, search, date if provided
  const res = await axiosInstance.get("/orders", { params });
  if (res.data) {
    return {
      success: true,
      data: res.data.data,
      total: res.data.total,
      limit: res.data.limit,
      skip: res.data.skip,
    };
  } else {
    return { success: false, message: "Something went wrong" };
  }
};

export { getOrderData };
