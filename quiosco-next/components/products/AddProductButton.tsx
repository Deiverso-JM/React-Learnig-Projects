"use client"

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
    product: Product
}


function AddProductButton({product}: AddProductButtonProps) {
    const addtoOrder = useStore(state => state.addToCart)
    return (
    <button
      type="button"
      className=" bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        onClick={() => addtoOrder(product)}
    >
      Agregar
    </button>
  );
}

export default AddProductButton;
