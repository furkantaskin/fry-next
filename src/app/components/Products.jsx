"use client";
import axios from "axios";
import { useEffect } from "react";

import ProdCard from "@components/ProdCard";
import { useProductStore } from "@/store/productsStore";

import { toast } from "react-toastify";

export default function Products() {
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const reset = useProductStore((state) => state.reset);
  useEffect(() => {
    const getProds = async () => {
      try {
        const PRODUCTS_URL = `https://firiyaapi-1-d9568468.deta.app/products`;
        const res = await axios.get(PRODUCTS_URL);
        const { data } = res;
        reset();
        addProduct(data.prods);
      } catch (error) {
        toast.error(`Sayfa yüklenirken bir hata oluştu: ${error}`, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnFocusLoss: false,
          autoClose: 2000,
        });
      }
    };

    getProds();
  }, [addProduct, reset]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {products.map((item, index) => (
          <ProdCard key={index} prod={item} />
        ))}
      </div>
    </>
  );
}
