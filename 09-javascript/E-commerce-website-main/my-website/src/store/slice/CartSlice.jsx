// src/store/slice/CartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const pid = (p) => p?.productID ?? p?.id; // prefer productID, fallback to id

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        totalItems: 0,
    },
    reducers: {
        addItemToCart: (state, action) => {
            const p = action.payload;
            const productID = pid(p);
            if (productID == null) return;

            const exist = state.cartItems.find(i => i.productID === productID);

            if (exist) {
                exist.quantity += 1;               // just increase qty if already in cart
            } else {
                state.cartItems.push({
                    ...p,
                    productID,                       // normalized key
                    quantity: 1,
                });
            }

            // keep totalItems consistent
            state.totalItems = state.cartItems.reduce((s, i) => s + i.quantity, 0);
        },

        removeItemFromCart: (state, action) => {
            const productID = pid(action.payload);
            state.cartItems = state.cartItems.filter(i => i.productID !== productID);
            state.totalItems = state.cartItems.reduce((s, i) => s + i.quantity, 0);
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalItems = 0;
        },

        increaseQuantity: (state, action) => {
            const productID = pid(action.payload);
            const item = state.cartItems.find(i => i.productID === productID);
            if (item) item.quantity += 1;
            state.totalItems = state.cartItems.reduce((s, i) => s + i.quantity, 0);
        },

        decreaseQuantity: (state, action) => {
            const productID = pid(action.payload);
            const item = state.cartItems.find(i => i.productID === productID);
            if (!item) return;
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter(i => i.productID !== productID);
            }
            state.totalItems = state.cartItems.reduce((s, i) => s + i.quantity, 0);
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
