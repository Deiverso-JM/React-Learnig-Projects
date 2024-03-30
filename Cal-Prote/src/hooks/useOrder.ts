import { useState } from "react";
import { itemMenuT, orderItem } from "../types";

export default function useOrder() {
  const [order, setOrder] = useState<orderItem[]>([]);
  const [tip, setTip] = useState(0)

  const addItem = (item: itemMenuT) => {
    const itemExist = order.find((orderItem) => item.id === orderItem.id);
    if (itemExist) {
      const updateOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quiantity: orderItem.quiantity + 1 }
          : orderItem
      );
      setOrder(updateOrder);
    } else {
      const newItem: orderItem = { ...item, quiantity: 1 };
      setOrder([...order, newItem]);
    }
  };

  const removeItem = (id: orderItem['id']) => {
    const itemExist = order.find((orderItem) => orderItem.id === id);
    if (itemExist && itemExist?.quiantity > 1) {
      const updateOrder = order.map((orderItem) =>
        orderItem.id === id
          ? { ...orderItem, quiantity: orderItem.quiantity - 1 }
          : orderItem
      );
      setOrder(updateOrder);
    } else {
      const updateOrder = order.filter((orderItem) =>  orderItem.id !== id)
      setOrder(updateOrder);
      
    }
  };

  const placeOrder = () => {
    setOrder([])
  }

  


  

  return {
    placeOrder,
    addItem,
    tip,
    setTip,
    order,
    removeItem,

  };
}
