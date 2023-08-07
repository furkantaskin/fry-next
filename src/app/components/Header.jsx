"use client";

import Link from "next/link";
import Image from "next/image";

import logo from "@static/logo.png";
import Loginmodal from "./LoginModal";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <>
      <p>{session ? `${session, session?.user.auth_level === 1 ? "admin": "user"}` : "session yok"}</p>
      <header className="none md:block py-6">
        <div className="container flex justify-between items-center">
          <Image src={logo} alt="Logo" priority="high"></Image>
          <Loginmodal />
        </div>
      </header>
      <header className="block md:none"></header>
    </>
  );
}
