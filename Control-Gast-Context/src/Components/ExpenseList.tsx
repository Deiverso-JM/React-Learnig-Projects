import { useMemo } from "react"
import { useBudget } from "../Hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

function ExpenseList() {
  
  const {state } = useBudget()
  const filterExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
  const isEmpity = useMemo(() => filterExpenses.length === 0 ,[filterExpenses])
    return (
    <div className="mt-10 bg-white shadow-lg p-5 w-full border-b">
      {isEmpity ? <p className=" text-gray-600 text-2xl font-bold">No Hay Gastos</p> : 
      (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
          Listado de Gastos.
          </p>
          {
          console.log(state.expenses)}
          {filterExpenses.map((expense) => (
            <ExpenseDetail
              key={expense.id}
              expense={expense}
            />
          ))}
        </>
      )}

    </div>
  )
}

export default ExpenseList