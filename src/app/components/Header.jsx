"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import logo from "@static/logo.png";
import { ShoppingCart } from "lucide-react";

export default function Header() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <header className="none md:block py-6">
        <div className="container flex justify-between items-center">
          <Image src={logo} alt="Logo" priority="high"></Image>
        </div>
      </header>
      <header className="block md:none"></header>
    </>
  );
}
