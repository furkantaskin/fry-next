import Products from "@components/Products";

export default function Home() {
  return (
    <main className="bg-gray-200">
      <div className="container flex gap-4 py-5 md:py-20">
        <Products />
      </div>
    </main>
  );
}
