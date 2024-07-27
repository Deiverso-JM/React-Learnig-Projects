import {  ChangeEvent, FormEvent, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppStores } from "../stores/useAppStore";

export default function Header() {

  //Paginas
  const location = useLocation();

  //States
  const isHome = useMemo(() => location.pathname === "/", [location.pathname]);
  const categorias = useAppStores((state) => state.categorias.drinks);
  const fechDataCategories = useAppStores((state) => state.fetchCategories);
  const fechDataRecipes = useAppStores((state) => state.fetchRecipes);
  const showNotification = useAppStores((state) => state.showNotification);



  //Formulario State
  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })

  //Recoleccion datos
  useEffect(() => {
    fechDataCategories();
  }, []);

 
  //submit and data

  const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{

    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    })


  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    //Validacio datos
    if(Object.values(searchFilters).includes('')){
      return showNotification({
        error:true,
        text: 'Todos los campos son obligatorios'
      })
    }

    //Consultar recetas
    fechDataRecipes(searchFilters)


  }

  return (
    <header
      className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}
    >
      <div className=" mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <img src="./logo.svg" className="w-32" alt="Logotipo" />
          </div>

          <nav className="flex gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
              to={"/"}
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
              to={"/favoritos"}
            >
              {" "}
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form 
            onSubmit={handleSubmit}
            className=" md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6
          "
          >
            <div className=" space-y-4">
              <label
                htmlFor="ingredient"
                className="text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingrendientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o Ingredientes. Ej: VodKa, Tequila, Cafe"
                value={searchFilters.ingredient}
                onChange={handleChange}
              />
            </div>

            <div className=" space-y-4">
              <label
                htmlFor="category"
                className="text-white uppercase font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                value={searchFilters.category}
                onChange={handleChange}
              >
                <option value=""> -- Seleccionar Categoria: --</option>
                {categorias.map((item) => (
                  <option value={item.strCategory} key={item.strCategory}>{item.strCategory}</option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              className=" cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2  rounded-lg uppercases"
              value={"Buscar Recetas"}
            />
          </form>
        )}
      </div>
    </header>
  );
}
