import { itemMenuT } from "../types"

type menuItemsProps =  {
  item: itemMenuT,
  addItem: (item: itemMenuT) => void
}


function MenuItems({item, addItem} : menuItemsProps) {
  return (
    <button  onClick={() => addItem(item)} className=" hover:bg-teal-400 bg-slate-200 border-2 rounded-xl flex w-full p-3 justify-between ">
      <p>{item.name}</p>
      <p className=" font-black">${item.price}</p>
    </button>

  )
}

export default MenuItems