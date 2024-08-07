import { Dispatch } from "react";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";
import { orderItem } from "../types";

type OrderContentsPrps = {
  order: orderItem[];
  dispatch: Dispatch<OrderActions>
};


function OrderContents({ order, dispatch }: OrderContentsPrps) {
  

  return (
    <>
      <h2 className=" text-4xl font-black">Consumo</h2>
      <div className=" space-y-3 mt-5">
        {order.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-t border-gray-200 py-5 last-of-type:border-b "
          >
            <div>
              <p className="text-lg ">
                {item.name} - {formatCurrency(item.price)}
              </p>
              <p className=" font-black">
                Cantidad: {item.quiantity} -{" "}
                {formatCurrency(item.quiantity * item.price)}
              </p>
            </div>
            <button
              onClick={() => dispatch({ type: 'remove-item', payload:{ id: item.id} })}
              className=" mr-4 bg-red-600 h-8 w-8 rounded-2xl text-center   text-white"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderContents;
