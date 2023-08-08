import {create} from "zustand";

const useProductStore = create((set,get) => ({
  products: [],
  addProduct: (newItems) => {
    set((state) => ({
      ...state,
      products: Array.isArray(newItems)
        ? [...state.products, ...newItems]
        : [...state.products, newItems],
    }));
  },
}));

export { useProductStore };
