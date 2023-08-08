import {create} from "zustand";

const useProductStore = create((set) => ({
    productList: [],
    addProduct: (newProduct) => set((state) => ({productList: [...state.products, newProduct]})),
}))

export default useProductStore