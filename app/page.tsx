import Image from "next/image";
import { client } from "../sanity/lib/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";

export default async function Home() {
  const products = await client.fetch(groq`*[_type == 'product']`, {
    next: { revalidate: -1 },
  });

  console.log(products);

  return (
    <main
      id="store"
      className="mx-10 lg:mx-28 py-10 flex flex-col items-center"
    >
      <section>
        <h1 className="text-5xl font-bold text-center">Store</h1>
        <div className="grid gap-7 grid-cols-4">
          {products.map((product: any) => (
            <Link
              key={product._id}
              href={`/product/${product.slug.current}`}
              className="rounded-md shadow-md hover:shadow-2xl mt-5 transition-all"
            >
              <Image
                src={urlForImage(product?.images[0]).url()}
                alt="product-image"
                width={200}
                height={200}
                className="rounded-t-md w-full"
              />
              <h3 className="m-4 font-bold">{product.name}</h3>
              <div className="flex justify-between items-center mx-4 mt-5 mb-4 text-sm">
                <p>{product.category}</p>
                <p>
                  {product.currency} {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
