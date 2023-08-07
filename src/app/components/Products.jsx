import axios from "axios";
import ProdCard from "@components/ProdCard";

async function getProds() {
  const PRODUCTS_URL = "https://firiyaapi-1-d9568468.deta.app/products";

  return await axios.get(PRODUCTS_URL).then((response) => {
    return response.data.prods;
  });
}

export default async function Products() {
  const data = await getProds();
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {data && data.map((item, index) => <ProdCard key={index} prod={item} />)}
    </div>
  );
}
