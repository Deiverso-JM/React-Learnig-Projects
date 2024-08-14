import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { XCircleIcon, PlusIcon, MinusIcon } from "@heroicons/react/16/solid";
import { useMemo } from "react";


type ProductDetailProps = {
  item: OrderItem;
};

const MAX_ITEMS = 5

function ProductDetails({ item }: ProductDetailProps) {

    const incrementQuantity = useStore(state => state.incrementQuantity) 
    const decrementQuantity = useStore(state => state.decrementQuantity) 
    const removeitem = useStore(state => state.removeItem) 

    const maxQuantity = useMemo(() => item.quantity < MAX_ITEMS ? false : true, [item]) 

    const disableButton = useMemo(() => item.quantity === 1 , [item])


  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeitem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">{formatCurrency(item.price)}</p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button type="button" disabled={disableButton} onClick={() => decrementQuantity(item.id)}>
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button type="button" disabled={maxQuantity} onClick={() => incrementQuantity(item.id)}>
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">
            {formatCurrency(item.subtotal)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
