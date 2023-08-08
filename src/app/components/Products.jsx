"use client";
import axios from "axios";
import { useEffect } from "react";

import ProdCard from "@components/ProdCard";
import { useProductStore } from "@/store/productsStore";

export default function Products() {
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);

  useEffect(() => {
    const getProds = async () => {
      const PRODUCTS_URL = `https://firiyaapi-1-d9568468.deta.app/products`
      const res = await axios.get(PRODUCTS_URL);
      const { data } = res;
      addProduct(data.prods);
    };

    getProds();
  }, [addProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {products.map((item, index) => <ProdCard key={index} prod={item} />)}
    </div>
  );
}
