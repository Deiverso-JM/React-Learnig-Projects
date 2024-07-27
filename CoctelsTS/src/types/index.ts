import {z} from 'zod'
import { CategoriesApiResponseShema, RecipeAPIResponseSchema, recipeApiShema, recipesApiShema, SearchFilterSchema } from '../utils/recipes-schema'
export type Category =z.infer<typeof CategoriesApiResponseShema>
export type SearchData = z.infer<typeof SearchFilterSchema>
export type Recipes = z.infer<typeof recipesApiShema>
export type Recipe = z.infer<typeof recipeApiShema>
export type RecipeDetail = z.infer<typeof RecipeAPIResponseSchema>