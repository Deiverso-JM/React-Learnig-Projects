import Link from "next/link";

function ProductPagination({ page, total }: { page: number; total: number }) {

  const pages = Array.from({length:total}, (_, i) => i+1)
  return (
    <nav className="flex justify-center py-10 gap-1">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9"
        >
          &laquo;
        </Link>
      )}

      {pages.map((currentPage) => (
        <Link href={`/admin/products?page=${currentPage}`} key={currentPage} 
        className={`${page === currentPage ? 'font-black bg-amber-400' :  'bg-white'}  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9`}>
        {currentPage}
        </Link>      
      ))}

      {page < total && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}

export default ProductPagination;