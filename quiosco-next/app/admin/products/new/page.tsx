import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";




 function CreateProductPage() {


  
  return (
    <>
      <Heading>Nuevos Producto</Heading>
      <AddProductForm> <ProductForm/> </AddProductForm>
      

    </>
  );
}

export default CreateProductPage;
