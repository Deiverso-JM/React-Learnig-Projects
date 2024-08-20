import { ActionFunctionArgs, Form, redirect, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { curremcyMoney } from "../utils";
import { DeleteProductByID } from "../services/ProductSevice";

export async function action({params}: ActionFunctionArgs) {
  
  if(params.id !== undefined){
    await DeleteProductByID(+params.id)
  }
  
  
  return redirect('/')
  
}


function ProductDetails({ item }: { item: Product }) {
  const navigate = useNavigate();
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800  text-center">{item.name}</td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {curremcyMoney(item.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center  ">
        {item.availability ? "Disponible" : "Out Stock"}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center ">
          <button
            onClick={() => navigate(`/productos/${item.id}/editar`)}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </button>
          <Form className="w-full" method="POST" action={`productos/${item.id}/eliminar`} onSubmit={(e) => {
            if(!confirm('Delete?')){
              e.preventDefault()
            }
          }}>
            <input className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
              type="submit"
              value={'Eliminar'}

            />
            
          </Form>
        </div>
      </td>
    </tr>
  );
}

export default ProductDetails;
