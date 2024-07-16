import React, { useMemo, useState } from "react";
import { useBudget } from "../Hooks/useBudget";

function BudgelForm() {
  const [budget, setBudget] = useState(0);
  const {dispatch} = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setBudget(e.target.valueAsNumber)

  };

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
    
  }, [budget]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({type: 'add-budget', payload: {budget}})
  }

  return (
    <form className="space-y-5 " onSubmit={handleSubmit}>
      <div className=" space-y-5  flex flex-col ">
        <label
          htmlFor="budget"
          className=" text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          type="number"
          className=" w-full bg-white border border-gray-200 p-2"
          placeholder="Define tu presupuesto"
          name="budget"
          id="budget"
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        disabled={isValid}
        value="Definir Presupuesto"
        className=" disabled:opacity-40 bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black  uppercase"
      />
    </form>
  );
}

export default BudgelForm;
