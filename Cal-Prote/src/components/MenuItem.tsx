import { Dispatch } from "react"
import { itemMenuT } from "../types"
import { OrderActions } from "../reducers/order-reducer"

type menuItemsProps =  {
  item: itemMenuT,
  dispatch: Dispatch<OrderActions>
}


function MenuItems({item, dispatch} : menuItemsProps) {
  return (
    <button  onClick={() => dispatch({type: 'add-item', payload: {item}})} className=" hover:bg-teal-400 bg-slate-200 border-2 rounded-xl flex w-full p-3 justify-between ">
      <p>{item.name}</p>
      <p className=" font-black">${item.price}</p>
    </button>

  )
}

export default MenuItems