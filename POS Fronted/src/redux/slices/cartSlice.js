// import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];

// const cartSlice = createSlice({
//     name : "cart",
//     initialState,
//     reducers : {
//         addItem : (state, action) => {
//             state.push(action.payload);
//         },

//         removeItem: (state, action) => {
//             return state.filter(item => item.id != action.payload);
//         }
//     }
// })

// export const getTotalPrice = (state) => state.cart.reduce((total,item) => total + item.price, 0);
// export const {addItem, removeItem} = cartSlice.actions;
// export default cartSlice.reducer;


// ==================================================================================================================================
// ==================================================================================================================================
// ==================================================================================================================================
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        // ADD ITEM
        addItem: (state, action) => {
            state.push(action.payload);
        },

        // REMOVE SINGLE ITEM
        removeItem: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },

        // CLEAR CART (AFTER PAYMENT)
        clearCart: () => {
            return [];
        }
    }
});

// TOTAL PRICE SELECTOR
export const getTotalPrice = (state) =>
    state.cart.reduce((total, item) => total + item.price, 0);

// SAFE CART ITEM CREATOR
export const createCartItem = (item) => ({
    ...item,
    id: Date.now(),                         // serializable ID
    createdAt: new Date().toISOString()     // serializable date
});

// EXPORTS
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
