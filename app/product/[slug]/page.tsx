

import { Button } from "@/components/ui/button";
import { MousePointerClick, ShoppingBag } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import ProductInfo from "@/components/ProductInfo";

interface Params {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: Params) => {
  const product = await client.fetch(
    groq`*[_type == 'product' && slug.current == '${params.slug}'][0]`
  );
  //console.log(product.sizes[0]);

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
          <div>
            <ProductInfo product={product} />
          </div>
          
        </div>
      </section>
    </main>
  );
};

export default Page;
