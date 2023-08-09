"use client";
import { useLoginModalStore } from "@/store/modalStore";
import { useSession } from "next-auth/react";

import { useCartStore } from "@/store/cartStore";

export default function ProdCard({ prod }) {
  const { data: session } = useSession();

  const openLoginModal = useLoginModalStore((state) => state.openModal);
  const addItemToCart = useCartStore(state => state.addToCart);
  const handleAddToCart = () => {
    addItemToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
    })
  }

  return (
    <div className="group col-span-1 h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="p-4 md:p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
          {prod.name}
        </h3>
        <p className="mt-3 text-gray-500">{prod.description}</p>
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
        <span className="w-1/2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-b-xl font-medium bg-white text-gray-700 shadow-sm align-middle transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
          {prod.price} ₺
        </span>
        <button
          className="w-1/2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-slate-700 text-white shadow-sm align-middle hover:bg-slate-900 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white "
          onClick={session ? () => handleAddToCart() : openLoginModal}
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}
