import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import OrdersTotals from "./components/OrdersTotals";
import TipPercentageForm from "./components/TipPercentageForm";
import { menuItems } from "./data/data";
import useOrder from "./hooks/useOrder";
import { itemMenuT } from "./types";

function App() {
  const { addItem, order, removeItem, tip, setTip, placeOrder} = useOrder();
  return (
    <>
      <header className="bg-teal-400 py-5 ">
        <h1 className="text-center text-4xl font-black">
          Calculadora de Propinas y Consumo
        </h1>
      </header>
      <main className="max-w-7xl mx-auto py-20  grid md:grid-cols-2  gap-x-16  ">
        <div  className="p-5">
          <h2 className=" text-4xl font-black">Menu</h2>
          <div className=" space-y-3 mt-3">
            {menuItems.map((item: itemMenuT) => (
              <MenuItem key={item.id} item={item} addItem={addItem} />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {order.length > 0 ? (
            <>
              <OrderContents order={order}  removeItem={removeItem}/>
              <TipPercentageForm  setTip={setTip} tip={tip} />
              <OrdersTotals order={order} tip={tip} placeOrder={placeOrder}/>
            </>

          ): (
            <h2 className=" text-center font-bold text-3xl">No se a asignado una orden</h2>
          ) }

        </div>
      </main>
    </>
  );
}

export default App;
