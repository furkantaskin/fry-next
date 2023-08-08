import {create} from "zustand";

const useLoginModalStore = create((set) => ({
    isOpen: false,
    openModal: () => set({isOpen: true}),
    closeModal: () => set({isOpen: false}),
}))

 const useProductModalStore = create((set) => ({
    isOpen: false,
    openModal: () => set({isOpen: true}),
    closeModal: () => set({isOpen: false}),
}))


export {
    useLoginModalStore,
    useProductModalStore
}