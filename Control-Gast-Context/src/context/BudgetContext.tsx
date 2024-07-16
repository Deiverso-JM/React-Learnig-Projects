import  { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { BudgeState, BudgetActions, budgetReducer, initialState } from "../reducers/budged-reducer"


type BudgetContextProps = {
    state: BudgeState 
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgelProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({children} : BudgelProviderProps) => {



    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0 ) ,[state.expenses])
    const remainingBudget = state.budget - totalExpenses
    return(

        <BudgetContext.Provider
            value={{state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}>
                {children}
        </BudgetContext.Provider>
    )

    
}