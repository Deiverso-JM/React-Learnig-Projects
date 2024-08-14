import { prisma } from "@/src/lib/prisma";
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

async function getCategories() {
    return await prisma.category.findMany()
}


type ProductFormProps = {
  Product?: Product
}

async function ProductForm({Product} : ProductFormProps) {

    const categories = await getCategories();

  return (
    <>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100"
          placeholder="Nombre Producto"
          defaultValue={Product?.name}
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100"
          placeholder="Precio Producto"
          defaultValue={Product?.price}
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="categoryId">
          Categoría:
        </label>
        <select
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          name="categoryId"
          defaultValue={Product?.categoryId}

        >
          <option value="">-- Seleccione --</option>
          {categories.map((item) =>(
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>


      <ImageUpload image={Product?.image}
      />
    </>
  );
}

export default ProductForm;
