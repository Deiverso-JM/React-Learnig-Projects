import EditProductFound from "@/components/products/EditProductFound"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id:number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    
    
    
    if(!product) return notFound()


    return product


}



async function EditProductsPage({params}: {params: {id: string}}) {
  const productFound = await   getProductById(+params.id)

  return (
    <>

      <Heading>Editar Producto: {productFound.name}</Heading>
      <GoBackButton/>

      <EditProductFound>
        <ProductForm Product={productFound}/>
        </EditProductFound>
    
    </>
  )
}

export default EditProductsPage