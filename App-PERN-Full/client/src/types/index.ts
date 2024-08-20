import { boolean, number, object, string, InferOutput, array } from "valibot";

export const DraftproductSchema = object({
    name: string(),
    price: number()
})


export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)


//Types
export  type Product = InferOutput<typeof ProductSchema>