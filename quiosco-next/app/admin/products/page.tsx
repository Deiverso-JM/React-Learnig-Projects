import ProductPagination from "@/components/products/ProductPagination";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProdutsTable from "@/components/products/ProdutsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {

  return await prisma.product.count()
}

async function getProductsPage(page: number, pagesize: number) {
  const skip = (page - 1) * pagesize;

  const products = await prisma.product.findMany({
    take: pagesize,
    skip,
    include: {
      category: true,
    },
  });

  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProductsPage>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  if(page < 0 ) redirect('/admin/products')


  const totalData = productCount()
  const productsData =  getProductsPage(page, pageSize);


  const [products, totalProduct] =  await Promise.all([productsData, totalData])
  const totalPages = Math.ceil(totalProduct/ pageSize)


  if(page > totalPages){
    redirect('/admin/products')
  }

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between ">
        <Link
          href={'/admin/products/new'} 
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold
           cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductSearchForm/>
      </div>
      <ProdutsTable products={products} />
      <ProductPagination page={page} total={totalPages}/>
    </>
  );
}
