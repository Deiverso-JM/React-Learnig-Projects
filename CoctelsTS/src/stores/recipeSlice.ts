import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { Category, Recipe, RecipeDetail, Recipes, SearchData } from "../types"
import { FavoritiesSliceType } from "./favoritesSlice"


export type RecipesSlicesType = {
    categorias: Category
    drinks: Recipes
    recipeDetail: RecipeDetail,
    modal: boolean
    fetchCategories: () => Promise<void>,
    fetchRecipes: (SearchFilters: SearchData) => Promise<void>
    selectRecipe: (recepiId: Recipe['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipesSlice  : StateCreator<RecipesSlicesType & FavoritiesSliceType, [],[], RecipesSlicesType> =(set) => ({
    categorias: { 
        drinks: []
    },
    drinks: {
        drinks: []
    },
    modal: false,
    
    recipeDetail: { } as RecipeDetail,
    fetchCategories: async () => {
        const categorias = await getCategories()
        set({
            categorias
        })

    },
    fetchRecipes: async (SearchFilters) =>{
       const drinks =  await getRecipes(SearchFilters)
       set({
        drinks
       })
    },
    selectRecipe: async (recepiId) => {
       const recipeDetail = await getRecipeById(recepiId)
       set({
            recipeDetail,
            modal: true
       })
    },
    closeModal: () => {
        set({
            modal: false,
            recipeDetail: {} as RecipeDetail
        })
    }
})