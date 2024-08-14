import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProdutsTable from "@/components/products/ProdutsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchPProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const products = await searchPProducts(searchParams.search);
  return (
    <>
      <Heading>Resultados de busqueda</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between ">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold
           cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>
      {products.length ? (
        <ProdutsTable products={products} />
      ) : (
        <p className="text-center text-lg ">No hay resultados</p>
      )}
    </>
  );
}
