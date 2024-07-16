import { categories } from "../Data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import  React, { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense,Value } from "../Types/index";
import ErorrMessage from "./ErorrMessage";
import { useBudget } from "../Hooks/useBudget";



function ExpenseForm() {

    
    const [expense, setExpense ] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })
    
    const [error, setError] = useState('')
    const [previosAmount, setPreviosAmount] = useState(0)
    const {dispatch, state, remainingBudget} = useBudget()

    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter((currentExpense => currentExpense.id === state.editingId))[0]
            setExpense(editingExpense)
            setPreviosAmount(editingExpense.amount)
        }
    },[state.editingId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) =>{
        const {name, value } = e.target

        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value): value
        })
    } 


    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date:  value
        })

    }

    const handleSumbit  = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        
        //Valid
        if(Object.values(expense).includes('') || Object.values(expense).includes(NaN)){
            setError('Todos los elementos son obligatorios')
            return
        }

        //No pasar limite
        if((expense.amount - previosAmount) > remainingBudget){
            setError('Este Gasto se salio del presupuesto')
            return
        }


        if(state.editingId){
            dispatch({type: 'update-expense', payload: {expense: { id: state.editingId, ...expense}}})
        }else{
            dispatch({type: 'add-expense', payload: {expense}})
        }


        setPreviosAmount(0)
    }


  return (
    <form className=" space-y-5" onSubmit={e => handleSumbit(e)}>
        <legend 
        className=" uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            {state.editingId ? 'Guardar Cambio' : 'Nuevo Gasto'}
        </legend>

        {error && <ErorrMessage>{error}</ErorrMessage>}
        
        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName"
            className="text-xl">
                Nombre Gasto:
            </label>
            <input 
                type="text" 
                id="expenseName" 
                placeholder="Añade el Nombre del  gasto"   
                className="bg-slate-100 p-2"
                name="expenseName"
                onChange={handleChange}
                value={expense.expenseName}
            />
        </div>
        {/* Termina aqui */}

        <div className="flex flex-col gap-2">
            <label htmlFor="amount"
            className="text-xl">
                Cantidad:
            </label>
            <input 
                type="text" 
                id="amount" 
                placeholder="Añade la cantidad del gasto: Ej: 300"   
                className="bg-slate-100 p-2"
                name="amount"
                onChange={handleChange}
                value={expense.amount}

            />
        </div>
        {/* Termina aqui */}

        <div className="flex flex-col gap-2">
            <label htmlFor="category"
            className="text-xl">
                Categoria:
            </label>
            <select 
                id="category" 
                className="bg-slate-100 p-2"
                name="category"
                onChange={handleChange}
                value={expense.category}
            >
                <option value="">-- Seleccione --</option>
                {categories.map(categoria  => (
                    <option
                        value={categoria.id}
                        key={categoria.id}
                    >{categoria.name}</option>
                ))}
            </select>
        </div>
        {/* Termina aqui */}

        <div className="flex flex-col gap-2">
            <label htmlFor="amount"
            className="text-xl">
                Fecha Gastos:
            </label>
            <DatePicker 
            className="bg-slate-100 p-2  border-0"
            value={expense.date}
            onChange={handleChangeDate}/>
            
        </div>
        {/* Termina aqui */}

        <input 
            type="submit"
            className="bg-blue-600 cursor-pointer  w-full p-w text-white uppercase font-bold rounded-lg"
            value={state.editingId ? 'Actualizar Gasto' : 'Registrar Gasto'} 
             />
    </form>
  )
}
export default ExpenseForm