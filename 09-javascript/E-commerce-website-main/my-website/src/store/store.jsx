import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slice/WishlistSlice";
import cartReducer from "./slice/CartSlice";
import couponReducer from "./slice/CouponSlice";
import authReducer from "./slice/AuthSlice";

export const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        cart: cartReducer,
        coupon: couponReducer,
        auth: authReducer,
    },
});
