"use client";

import LastOrderItem from "@/components/order/LastOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";
function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
  });

  if (isLoading) return <p>Cargando...</p> 

  if (data) return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black">
          Ordenes Listas
        </h1>
        <Logo />
        
        {data.length ? (
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
                {data.map((order)  => (
                    <LastOrderItem key={order.id} order={order}/>

                ))}

            </div>  
                      
        ) :  <p className="text-center my-10 "></p>}
      </> 
    );
}

export default OrdersPage;
