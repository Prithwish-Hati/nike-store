

import { Button } from "@/components/ui/button";
import { MousePointerClick, ShoppingBag } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

interface Params {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: Params) => {
  const product = await client.fetch(
    groq`*[_type == 'product' && slug.current == '${params.slug}'][0]`
  );
  console.log(product.sizes[0]);

  return (
    <main className="mx-10 lg:mx-28 py-10">
      <section className="flex justify-between gap-5">
        <Image
          src={urlForImage(product.images[1]).url()}
          alt="Product Image"
          width={500}
          height={500}
          className="object-contain rounded-md"
        />
        <div>
          <div className="bg-product-heading bg-no-repeat bg-contain h-[120px] flex items-center">
            <h1 className="text-[40px] font-bold text-violet-950">
              {product.name}
            </h1>
          </div>

          <p className="mt-6">Select Size:</p>
          <div className="flex">
            {product.sizes.map((size: any) => (
              <button
                key={size}
                className="my-3 mr-3 p-3 border-2"
                // onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Link
              href="/checkout"
              className="rounded-full bg-violet-600 px-5 py-2 text-white inline-flex gap-1 font-semibold mt-6"
            >
              BUY NOW <MousePointerClick />
            </Link>
            <Link
              href="/"
              className="rounded-full bg-violet-600 px-5 py-2 text-white inline-flex gap-1 font-semibold mt-6"
            >
              ADD TO BAG <ShoppingBag />
            </Link>
          </div>

          <p className="mt-5">{product.description}</p>
        </div>
      </section>
    </main>
  );
};

export default Page;
