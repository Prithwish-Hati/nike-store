"use client";

import Image from "next/image";
import { getSizeName } from "@/utils";
import { useState } from "react";
import { minus, plus, shoppingBag } from "@/assets/icons";
import { useStateContext } from "@/context/StateContext";
import Button from "./Button";
import { useRouter } from "next/navigation";

const ProductInfo = ({ product }: any) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { decQty, incQty, qty, onAdd } = useStateContext();
  const router = useRouter()

  return (
    <div className="font-montserrat">
      <p className="text-xl font-semibold mt-4">
        MRP: {product.currency}
        {product.price}
      </p>
      <p className="text-slate-gray">
        incl. of taxes
        <br />
        (Also includes all applicable duties)
      </p>

      <p className="mt-4 mb-1">
        <strong> Size: </strong>
        {getSizeName(selectedSize)}
      </p>
      {product.sizes.map((size: string) => (
        <button
          key={size}
          onClick={() => setSelectedSize(size)}
          className="px-4 py-2 mr-2 border-2 border-slate-200 hover:border-slate-900 focus:outline-none focus:ring focus:ring-coral-red"
        >
          {getSizeName(size)}
        </button>
      ))}

      <p className="mt-4 mb-8 mr-4 font-medium">{product.description}</p>

      {/* Quantity of Items */}
      <div className="flex items-center mb-5">
        <strong>Quantity:</strong>
        <span className=" ml-2 border-2 px-3 py-2 border-slate-200">
          <Image
            src={minus}
            width={16}
            height={16}
            alt="minus-btn"
            onClick={decQty}
            className="cursor-pointer"
          />
        </span>

        <span className="border-y-2 px-3 py-1 border-slate-200">{qty}</span>
        <span className="border-2 px-3 py-2 border-slate-200">
          <Image
            onClick={incQty}
            src={plus}
            width={16}
            height={16}
            alt="plus-btn"
            className="cursor-pointer ml-1"
          />
        </span>
      </div>

        <Button label="Buy Now" handleClick={() => router.push("/checkout")}/>
      
      {/* <Button label="Add to Cart" iconURL={shoppingBag} handleClick={() => onAdd(product, qty)} /> */}
    </div>
  );
};

export default ProductInfo;