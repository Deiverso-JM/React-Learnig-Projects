import { useMemo } from "react";
import { useAppStores } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";

export default function IndexPage() {
  const drinks = useAppStores((state) => state.drinks);
  const hasRecipes = useMemo(
    () => drinks.drinks.length > 0,
    [drinks]
  );
  return (
    <>
      <h1 className="text-6xl font-extrabold">Recetas</h1>
      {hasRecipes ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10  gap-10  ">
          {drinks.drinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ):(
        <p className="my-10 text-center text-2xl">
          No hay recetas
        </p>
      )}
    </>
  );
}
