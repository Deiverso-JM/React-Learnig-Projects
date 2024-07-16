import { ChangeEvent } from "react"
import { categories } from "../Data/categories"
import { useBudget } from "../Hooks/useBudget"

function FilterBy() {

    const {dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
        dispatch({type: 'add-filter-category', payload: {id: e.target.value}})



    }
  return (
    <div className="bg-white shadow-lg p-10 w-full border-b  ">
        <form action="">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="category">Filtrar Gastos</label>
                <select name="" id="category" 
                className=" bg-slate-100 p-3 flex-1 rounded"
                onChange={handleChange}
                >
                    <option value=""> -- Todas las categorias --</option>
                    {categories.map(category => (
                        <option
                            value={category.id}
                            key={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}

export default FilterBy