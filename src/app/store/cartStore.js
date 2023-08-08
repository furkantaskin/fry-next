import { create } from "zustand";
import {immer} from "zustand/middleware/immer";

const useCartStore = create((set, get) => ({
  cart: [],
  product: {},
  addToCart: (params) => {
    const newItem = params;
    set((state) => {
      const newCart = [...state.cart, newItem];
      return {
        ...state,
        cart: newCart,
      };
    });
  },
  removeFromCart: (params) => {
    const {itemIndex} = params;
    set((state) => {
        const newCart = state.cart.filter((element, elementIndex)=>{
            return elementIndex !== itemIndex
        })
        return{
            ...state,
            cart: newCart
        }
    })
  }
}));


export {useCartStore}
