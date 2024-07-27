import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStores } from "../stores/useAppStore";

function FavoritesPage() {
  const favorities = useAppStores((state) => state.favorities);
  const hasFavorities = useMemo(() => favorities.length > 0, [favorities]);
  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>
      {hasFavorities ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {favorities.map((recipe) => (
            <DrinkCard key={recipe.idDrink} drink={recipe} />
          ))}
        </div>
      ) : (
        <p className=" text-center text-3xl">No hay favoritos seleccionados</p>
      )}
    </>
  );
}

export default FavoritesPage;
