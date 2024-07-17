import {v4 as uuidv4} from 'uuid'

import { categories } from "../data/categories";
import { Activity, type category } from "../types";
import { ChangeEvent, useState,  useEffect } from "react";
import useCalory from '../hooks/useCalory';



const initialState = {   
   id: uuidv4(),
  category: 1,
  name: "",
  calorias: 0,

}


function Form() {
  const {state, dispatch} = useCalory()
  const [activity, setActivity] = useState<Activity>(initialState);
  useEffect(() => {

    if(state.actionState === "delete-activitiId"){
      setActivity(initialState)
      state.actionState = ''
    }

    if(state.actionState === "set-activitiId"){
      if(state.activitiId){
        const updateState = state.activities.filter((item) => item.id === state.activitiId)[0]
        setActivity(updateState)
      }
    }
    

    return 
  }, [state.activitiId])

  const handelChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calorias"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calorias } = activity;
    return name.trim() !== "" && calorias > 0;
  };

  const handelSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    dispatch({ type: "save-activity", payload: { newActivity: activity } });


    setActivity({
      ...initialState,
      id: uuidv4()
    });
  };

  return (
    <form
      className=" space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handelSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className=" font-bold">
          Categoria:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg bg-white"
          value={activity.category}
          onChange={handelChange}
        >
          {categories.map((categori: category) => (
            <option key={categori.id} value={categori.id}>
              {categori.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className=" font-bold">
          Actividad:
        </label>
        <input
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Enesala, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handelChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calorias" className=" font-bold">
          Calorias:
        </label>
        <input
          id="calorias"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias Ej: 200 o 500"
          value={activity.calorias}
          onChange={handelChange}
        />
      </div>

      <input
        type="submit"
        disabled={!isValidActivity()}
        className=" disabled:opacity-10 text-white bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase cursor-pointer"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
      />
    </form>
  );
}

export default Form;
