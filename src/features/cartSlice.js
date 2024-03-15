import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) :  [],
    qty: 0,
    totalPrice:0
    }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.items[itemIndex].cartQuantity += 1;
            }else{
                const tempProd = { ...action.payload, cartQuantity: 1 };
                state.items.push(tempProd);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const nextItems = state.items.filter(item => item._id !== action.payload._id);
            state.items = nextItems;
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        incrementCartQTY: (state, action) =>{
            const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.items[itemIndex].cartQuantity += 1;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        decrementCartQTY: (state, action) =>{
            const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
            if (state.items[itemIndex].cartQuantity > 1) {
                state.items[itemIndex].cartQuantity -= 1;
            } else if (state.items[itemIndex].cartQuantity === 1) {
                const nextItems = state.items.filter(item => item._id !== action.payload._id);
                state.items = nextItems;    
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.remove("cartItems");
        },
        getTotals: (state) => {
            let { total, qty } = state.items.reduce((cartTotal, item) => {
                const { price, cartQuantity } = item;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.qty += cartQuantity;
                
                return cartTotal;
            }, {
                total: 0,
                qty: 0,
            });

            state.qty = qty;
            state.totalPrice = total;
        }
    }
});

export const { addToCart, clearCart, decrementCartQTY, getTotals ,incrementCartQTY, removeFromCart  } = cartSlice.actions;

export default cartSlice.reducer;