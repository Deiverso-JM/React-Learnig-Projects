import { useMemo, Dispatch } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-Reducer";

type ActivityListProps = {
  state: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

function ActivityList({ state, dispatch }: ActivityListProps) {
  const categoriName = useMemo(
    () => (categoria: Activity["category"]) =>
      categories.map((cat) => (cat.id === categoria ? cat.name : "")),
    []
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {state.length > 0 ? (
        state.map((item: Activity) => (
          <div
            key={item.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between"
          >
            <div className=" space-y-2 relative">
              <p
                className={` absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                  item.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoriName(+item.category)}
              </p>
              <p className=" text-2xl font-bold pt-5">{item.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {item.calorias} {""}
                <span>Calorias</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({ type: "set-activitiId", payload: { id: item.id } })
                }
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
              </button>

              <button
                onClick={() => dispatch({type: 'delete-activitiId', payload: {id: item.id}})}>
                <XCircleIcon className="h-8 w-8  text-red-600"/>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className=" text-center mt-10 text-2xl text-white font-bold">
          No hay registros aun
        </p>
      )}
    </>
  );
}

export default ActivityList;
