import Products from "@components/Products";
import { Suspense } from "react";
import Loading from "./loading";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <main className="bg-gray-200">
      <div className="container flex gap-4 py-5 md:py-20">
        <Products />
      </div>
    </main>
  );
}
