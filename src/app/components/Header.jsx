"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@static/logo.png";
import Loginmodal from "./LoginModal";
import LoadScreen from "./LoadScreen";
import { useLoginModalStore, useProductModalStore } from "@/store/modalStore";

import { ToastContainer } from "react-toastify";
import { ShoppingCart, LogIn, LogOut, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Productmodal from "./ProductModal";

export default function Header() {
  const { data: session, status } = useSession();
  const openLoginModal = useLoginModalStore(
    (loginState) => loginState.openModal
  );
  const openProductModal = useProductModalStore(
    (productState) => productState.openModal
  );
  return (
    <>
      {status === "loading" && <LoadScreen give={session} />}
      <div className="fixed inset-0 pointer-events-none select-none z-50">
        <ToastContainer />
      </div>
      <header className="none md:block py-6">
        <div className="container flex justify-between items-center">
          <Link href="/" title="Ana sayfaya git" className="w-1/2 md:w-auto">
            <Image
              src={logo}
              alt="Logo"
              priority="high"
              className="w-full"
            />
          </Link>
          <div
            className={`flex gap-0 ${
              session && "fixed w-screen bottom-0 left-0"
            }  justify-end md:gap-4 md:justify-end md:relative`}
          >
            {session?.user.auth_level === 1 && (
              <button
                type="button"
                onClick={openProductModal}
                className="flex flex-1 md:flex-initial items-center gap-3 py-5 md:py-2 justify-center rounded-none md:rounded-md bg-blue-700 transition-all duration-300 pr-3 pl-2 text-sm font-medium text-white hover:bg-slate-900 "
              >
                <Plus className="hidden md:block" />
                <span className="text-lg md:text-base">Ürün Ekle</span>
              </button>
            )}
            {session && (
              <>
                <button
                  type="button"
                  onClick={session ? () => console.log("dursun") : openModal}
                  className="flex flex-1 md:flex-initial justify-center py-2 md:py-2  items-center gap-3 rounded-none md:rounded-md bg-slate-700 transition-all duration-300 px-4 text-sm font-medium text-white hover:bg-slate-900 "
                >
                  <ShoppingCart className="hidden md:block" />
                  <Link href="/sepet" className="text-lg md:text-base">
                    Sepete Git
                  </Link>
                </button>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="flex flex-1 md:flex-initial justify-center items-center py-2 md:py-2 gap-3 rounded-none md:rounded-md bg-red-500 transition-all duration-300 px-4  text-sm font-medium text-white hover:bg-red-900 "
                >
                  <LogOut className="hidden md:block" />
                  <span className="text-lg md:text-base">Çıkış Yap</span>
                </button>
              </>
            )}
            {!session && (
              <button
                type="button"
                onClick={openLoginModal}
                className="flex items-center gap-3 rounded-md bg-green-500 transition-all duration-300 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 "
              >
                <LogIn />

                <span className="text-lg md:text-base">Giriş Yap</span>
              </button>
            )}
          </div>
          <Loginmodal />
          <Productmodal />
        </div>
      </header>
      <header className="block md:none"></header>
    </>
  );
}
