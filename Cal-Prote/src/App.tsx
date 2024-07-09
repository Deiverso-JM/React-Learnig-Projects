import { useReducer } from "react";
import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import OrdersTotals from "./components/OrdersTotals";
import TipPercentageForm from "./components/TipPercentageForm";
import { menuItems } from "./data/data";
import { itemMenuT } from "./types";
import { initialState, orderReducer } from "./reducers/order-reducer";

function App() {
  
  const [state, dispatch] = useReducer(orderReducer, initialState)


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
              <MenuItem key={item.id} item={item} dispatch={dispatch}  />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {state.order.length > 0 ? (
            <>
              <OrderContents order={state.order} dispatch={dispatch}  />
              <TipPercentageForm  dispatch={dispatch} tip={state.tip} />
              <OrdersTotals order={state.order} tip={state.tip} dispatch={dispatch}/>
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
