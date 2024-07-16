import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} 
from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useMemo } from "react";
import { formtDate } from "../helpers";
import { Expense } from "../Types";
import { categories } from "../Data/categories";
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../Hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
};

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const {dispatch} = useBudget()

  const leadingActions  = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type: 'update-expense-id', payload: {id: expense.id}}) }>Actualizar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions  = () => (
    <TrailingActions>
      <SwipeAction  destructive={true} onClick={() => dispatch({type: 'delete-expense', payload: {id: expense.id}})} >
        Eliminar
      </SwipeAction>
    </TrailingActions>

  );

  

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        maxSwipe={30}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 ">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="Icono gasto"
              className="w-20"
            />
          </div>

          <div className="flex-1 space-y-1">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formtDate(expense.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default ExpenseDetail;
