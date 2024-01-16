"use client";

import { useRef } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

import { useStateContext } from "@/context/StateContext";
import {
  chevronLeft,
  minus,
  plus,
  removeItem,
  shoppingCart,
} from "@/assets/icons";

import Button from "./Button";
import { urlForImage } from "@/sanity/lib/image";
import { redirect } from "next/navigation";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  const handleCheckout = () => {
    toast.loading("Redirecting...");
    redirect("/");
  };

  return (
    <div className=" fixed right-0 top-0 z-50 bg-slate-100">
      <div className="h-screen w-[600px] py-10 px-3">
        <button
          type="button"
          className="flex items-center cursor-pointer font-medium  "
          onClick={() => setShowCart(false)}
        >
          <Image src={chevronLeft} width={50} height={50} alt="close-arrow" />
          <span className="text-xl">Your Cart</span>
          <span className="ml-3 text-coral-red">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className=" flex flex-col p-10 items-center">
            <Image
              src={shoppingCart}
              height={150}
              width={150}
              alt="cart-icon"
              className="cursor-pointer"
            />
            <h3 className="mt-5 text-2xl">Your Shopping Cart is Empty</h3>
            <Link href="/" className="mt-5">
              <Button
                label="Continue Shopping"
                handleClick={() => setShowCart(false)}
              />
            </Link>
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-4 mt-5 w-full">
          {cartItems.length >= 1 &&
            cartItems.map((item: any) => (
              <div className="flex gap-8 p-5" key={item._id}>
                <Image
                  src={urlForImage(item?.images[1]).url()}
                  width={150}
                  height={150}
                  alt={item.name}
                  className=" rounded-2xl"
                />
                <div className="w-80 ">
                  <h5 className="mt-8 text-xl font-bold">{item.name}</h5>
                  <h4 className="font-medium mt-2">
                    {item.currency}
                    {item.price}
                  </h4>
                  <p className="mt-1">Quanity: {item.quantity}</p>
                  <div className="flex justify-between">
                    <div className="flex items-center mt-4">
                      <span className="border-2 px-3 py-2 border-slate-200">
                        <Image
                          src={minus}
                          width={16}
                          height={16}
                          alt="minus-btn"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                          className="cursor-pointer"
                        />
                      </span>

                      <span className="border-y-2 px-3 py-1 border-slate-200">
                        {item.quantity}
                      </span>
                      <span className="border-2 px-3 py-2 border-slate-200">
                        <Image
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                          src={plus}
                          width={16}
                          height={16}
                          alt="plus-btn"
                          className="cursor-pointer ml-1"
                        />
                      </span>
                    </div>
                    <button
                      type="button"
                      className="mt-3"
                      onClick={() => onRemove(item)}
                    >
                      <Image
                        src={removeItem}
                        width={25}
                        height={25}
                        alt="remove-item"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div>
            <div className="flex justify-between text-xl font-bold px-5 my-5">
              <h3>Subtotal:</h3>
              <h3>₹{totalPrice}</h3>
            </div>

            <Button
              label="Pay with Stripe"
              fullWidth
              handleClick={() => redirect("/product")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;