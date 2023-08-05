import { create } from "zustand";

const useCartStore = create((set) => ({
  items: 0,
  increaseItems: () => set((state) => ({ items: state.items + 1 })),
}));
