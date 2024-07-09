import { Dispatch, useMemo } from "react"
import { orderItem } from "../types"
import { formatCurrency } from "../helpers"
import { OrderActions } from "../reducers/order-reducer"

type OrdersTotalsProps = {
    order: orderItem[],
    tip: number
    dispatch: Dispatch<OrderActions>

}


function OrdersTotals({order, tip, dispatch} : OrdersTotalsProps) {
    
    const subtotalAmount = useMemo(()=> order.reduce((total, item) =>  total + (item.price* item.quiantity), 0 ), [order])
    const tipAmount = useMemo(() =>  subtotalAmount * tip, [subtotalAmount, tip])
    const totalAmount = useMemo(() => tipAmount + subtotalAmount ,[subtotalAmount, tipAmount]) 
    return (
    <>
        <div className=" space-y-3 ">
            <h2 className=" font-black text-2xl">Totales y Propina:</h2>
            <p>Subtotal a pagar: {''} <span className=" font-bold">${formatCurrency(subtotalAmount)}</span></p>
            <p>Propina: {''} <span className=" font-bold">${formatCurrency(tipAmount)}</span></p>
            <p>Total a Pagar: {''} <span className=" font-bold">${formatCurrency(totalAmount)}</span></p>


        </div>

        <button  className=" w-full bg-black p-3 uppercase text-white font-bold disabled:opacity-10 mt-10 "
        disabled={totalAmount === 0}
        onClick={() => dispatch({type: 'place-order'})}>
            Guardar Orden
        </button>
    
    </>
  )
}

export default OrdersTotals