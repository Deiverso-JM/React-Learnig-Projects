import { StateCreator } from "zustand";
import { RecipeDetail } from "../types";
import { createRecipesSlice, RecipesSlicesType } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritiesSliceType = {
    favorities: RecipeDetail[]
    handleClickFavorite: (recipe: RecipeDetail) => void
    favoriteExist: (id: RecipeDetail['idDrink']) => boolean
    loadFromStorage: () => void
}


export const createFavoritiesSlice: StateCreator<FavoritiesSliceType & RecipesSlicesType & NotificationSliceType, [], [], FavoritiesSliceType    > = (set, get, api) => ({
    favorities: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExist(recipe.idDrink)) {
            set((state) => ({
                favorities: state.favorities.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se Elimino de favoritos', error: false
            })
     

        } else {
            set((state) => ({
                favorities: [...state.favorities, recipe],
                
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agrego a favoritos', error: false
            })
            

        }

        createRecipesSlice(set,get,api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorities))
    },
    favoriteExist: (id) => {
        return get().favorities.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorities: JSON.parse(storedFavorites)
            })
        }
    }

})