import axios from "axios"
import { CategoriesApiResponseShema, RecipeAPIResponseSchema, recipesApiShema } from "../utils/recipes-schema"
import { Recipe, SearchData } from "../types"

export async function getCategories() {

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url)
    const result = CategoriesApiResponseShema.safeParse(data)  
    if(result.success){
        return result.data

    }
    return 
    
}


export async function getRecipes(SearchData: SearchData){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${SearchData.category}&¡=${SearchData.ingredient}`
    const {data} = await axios(url)
    const result = recipesApiShema.safeParse(data)  
    if(result.success){
        return result.data
    }
    return
}

export async function getRecipeById(id: Recipe['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data: {drinks}}= await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(drinks[0])
    if(result.success){
        return result.data
    }    
    return
}