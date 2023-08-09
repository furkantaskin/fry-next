export default function CartTable({ items }) {
  let totalVal = 0;
  items.forEach((item) => {
    totalVal += item.totalPrice;
  });
  return (
    <table className="w-full col-span-6 lg:col-span-4 text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs md:text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {}
          <th scope="col" className="px-6 py-3 text-center">
            Ürün Adı
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            Ürün Adedi
          </th>
          <th scope="col" className="px-6 py-3 text-center">
            Ürün Fiyatı
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            key={index}
            className="text-xs md:text-xl text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4">{item.name}</td>
            <td className="px-6 py-4">{item.quantity}</td>
            <td className="px-6 py-4">{item.totalPrice} ₺</td>
          </tr>
        ))}
        <tr>
          <td className="px-6 py-4 text-xs md:text-xl font-bold text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            Toplam Tutar
          </td>
          <td className="px-6 py-4 text-xs md:text-xl font-bold text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"></td>
          <td className="px-6 py-4 text-xs md:text-xl font-bold text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">{totalVal.toFixed(2)} ₺</td>
        </tr>
      </tbody>
    </table>
  );
}
