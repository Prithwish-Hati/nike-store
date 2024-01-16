"use client";

import Link from "next/link";
import Image from "next/image";

import { headerLogo } from "@/assets/images";
import { shoppingBag } from "@/assets/icons";
import { useStateContext } from "@/context/StateContext";
import Cart from "@/components/Cart";

const navLinks = [
    { href: "/", label: "Home" },
];

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <header className="padding-x py-8 z-10 w-full sticky">
      <nav className="flex justify-between items-center max-container">
        <Link href="/">
          <Image
            src={headerLogo}
            alt="logo"
            width={129}
            height={29}
            className="m-0 w-[129px] h-[29px]"
          />
        </Link>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item: any) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setShowCart(true)}>
          <Image
          src={shoppingBag}
          height={30}
          width={30}
          alt="cart-icon"
          className="cursor-pointer"
          />
          <span className="">{totalQuantities}</span>
        </button>
        {/* <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
          <Link href="/">Sign In</Link>
          <span>/</span>
          <Link href="/">Sign Up</Link>
        </div> */}
        {showCart && <Cart />}
      </nav>
    </header>
  );
};

export default Navbar;