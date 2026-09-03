import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appliedCoupon: null,
    discount: 0,
};

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        applyCoupon: (state, action) => {
            const { code } = action.payload;

            // Example coupon codes (you can fetch from API later)
            if (code === "discount10") {
                state.appliedCoupon = code;
                state.discount = 10; // percentage
            } else if (code === "discount20") {
                state.appliedCoupon = code;
                state.discount = 20; // percentage
            } else if (code === "discount50") {
                state.appliedCoupon = code;
                state.discount = 50; // percentage
            } else {
                state.appliedCoupon = null;
                state.discount = 0;
            }
        },

        removeCoupon: (state) => {
            state.appliedCoupon = null;
            state.discount = 0;
        },
    },
});

export const { applyCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;
