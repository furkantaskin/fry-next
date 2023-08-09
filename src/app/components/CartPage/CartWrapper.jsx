import { useCartStore } from "@/store/cartStore";
import CartTable from "./CartTable";
import Checkout from "./Checkout";
export default function CartWrapper() {
  const cartList = useCartStore((state) => state.cart);

  const rows = cartList.reduce((result, current) => {
    const checkItem = result.find((item) => item.name === current.name);

    if (checkItem) {
      checkItem.quantity++;
      checkItem.totalPrice += current.price;
    } else {
      const { id, price, ...spare } = current;
      result.push({
        ...spare,
        key: String(id),
        quantity: 1,
        totalPrice: price,
      });
    }

    return result;
  }, []);

  return (
    <div className="relative overflow-x-auto w-full grid grid-cols-6 gap-8">
      {cartList.length > 0 ? (
        <>
          <CartTable items={rows} />
          <Checkout />
        </>
      ) : (
        <p className="text-slate-900 text-xl font-bold text-center w-full col-span-6">
          Sepetinizde ürün bulunmamaktadır.
        </p>
      )}
    </div>
  );
}
