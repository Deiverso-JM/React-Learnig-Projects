import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { EditProductById, getProductsById } from "../services/ProductSevice";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const productFound = await getProductsById(+params.id);
    if (!productFound) {
      redirect("/");
    }
    return productFound;
  }
  return {};
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params, request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los capos son obligatorios";
  }
  if (error.length) {
    return error;
  }
  if (params.id !== undefined) {
    await EditProductById(+params.id, data);
  }

  return redirect("/");
}

export default function EditProduct() {
  const error = useActionData() as string;
  const productFound = useLoaderData() as Product;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to={"/"}
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 "
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form method="POST" action="" className="mt-10">
        <ProductForm productFound={productFound} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={productFound?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Actualizar Producto"
        />
      </Form>
    </>
  );
}
