"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Sepet() {
    const {session, status} = useSession();
    if(!session && status==="unauthenticated"){
      redirect("/")
    }
  return (
    <main className="bg-gray-200">
      <div className="container flex gap-4 py-5 md:py-20">
      </div>
    </main>
  );
}
