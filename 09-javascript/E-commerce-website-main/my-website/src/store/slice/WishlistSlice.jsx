import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { userid: 1, wishlistItems: [] },
    reducers: {
        addItemToWishlist: (state, action) => {
            const p = action.payload;
            const newItem = {
                id: uuid(),                 // only for React key/display
                productID: p.id,            // canonical key
                title: p.title,
                thumbnail: p.thumbnail,
                price: p.price,             // keep price so Cart can show it
            };
            const exists = state.wishlistItems.some(i => i.productID === newItem.productID);
            if (!exists) state.wishlistItems.push(newItem);
        },
        removeItemFromWishlist: (state, action) => {
            const productID = action.payload.productID ?? action.payload.id;
            state.wishlistItems = state.wishlistItems.filter(i => i.productID !== productID);
        },
    },
});

export const { addItemToWishlist, removeItemFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
