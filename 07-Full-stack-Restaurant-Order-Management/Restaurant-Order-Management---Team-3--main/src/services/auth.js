// services/auth.js
import { axiosInstance as api } from "./axiosInstance";

// helper to normalize axios error
const extractErrorMessage = (error) => {
    if (error?.response?.data?.detail) return error.response.data.detail;
    if (error?.response?.data?.message) return error.response.data.message;
    if (typeof error?.response?.data === "string") return error.response.data;
    if (error?.message) return error.message;
    return "Something went wrong.";
};

export const login = async (payload) => {
    try {
        const res = await api.post("/auth/login", payload);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: extractErrorMessage(error) };
    }
};

export const logout = async () => {
    try {
        const res = await api.post("/auth/logout");
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: extractErrorMessage(error) };
    }
};


export const register = async (payload) => {
    try {
        const res = await api.post("/auth/register", payload);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: extractErrorMessage(error) };
    }
};

export const checkAuth = async () => {
    try {
        const res = await api.get("/auth/me");
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: extractErrorMessage(error) };
    }
};

// update-password - user must be logged-in need to send current_password and new_password  ---- in response - password change massage

export const updatePassword = async ({ current_password, new_password }) => {
    try {
        const res = await api.post("/auth/update-password", {
            current_password,
            new_password,
        });
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, massage: extractErrorMessage(error) };
    }
};


// forgot-password - need to send email --- otp send successfully , error 

export const forgotPassword = async ({ email }) => {
    try {
        const res = await api.post("/auth/forgot-password", { email });
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, massage: extractErrorMessage(error) };
    }
};


// otp-verify  - need to send email and otp --- otp verified successfully

export const verifyOtp = async ({ email, otp }) => {
    try {
        const res = await api.post("/auth/otp-verify", { email, otp });
        return { success: true, data: res.data }; 
    } catch (error) {
        return { success: false, message: extractErrorMessage(error) };
    }
};


// set-new-password - need to send email and new_password --- new password has been set , you can login now

export const resetPassword = async ({ email , new_password }) => {
    try {
        const res = await api.post("/auth/reset-password", {
            email,
            new_password,
        });
        return { success: true, data: res.data };
    }catch (error) {
        return { success: false, message: extractErrorMessage(error)}
    }
};
