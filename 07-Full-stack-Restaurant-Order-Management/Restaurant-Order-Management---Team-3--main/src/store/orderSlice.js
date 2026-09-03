import { createSlice } from "@reduxjs/toolkit";

// make a object in which - customer , table , orderType

const initialState = {
    "customer": "Rahul",
    "table": "T-01",
    "orderType": "Dine In",
    "items": [
        {
            "title": "Crispy Dory Sambal Matah",
            "price": 25,
            "quantity": 3,
            "flavorProfile": "Medium - Not spicy",
            "image": "https://rms-backend-1ilc.onrender.com/images/crispydory.jpg"
        },
    ],
    "subTotal": 985,
    "taxPercent": 18,
    "taxAmount": 177.3,
    "discountAmount": 20,
    "totalPayable": 1142.3,
    "status": "waiting",
    "paymentStatus": "paid"
}


const orderSlice = createSlice({
    name: 'order',
    initialState: 'initial state',
    reducers: {
        // add note
        // add to order details
        // remove from order 
        // update quantity
        // add table 
        // payment method add
        // 


    }
})



export default orderSlice.reducer
export const { } = orderSlice.actions