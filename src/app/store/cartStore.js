import { create } from "zustand";


const initialCart = [];

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
  },
  reset: () => {
    set({cart: initialCart})
  }
}));


export {useCartStore}
