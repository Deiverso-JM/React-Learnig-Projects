'use client'

import { createProduct } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/shemas";
import { redirect } from "next/navigation";
import { Router } from "next/router";
import { ReactNode } from "react";
import { toast } from "react-toastify";

export default function AddProductForm({children} : {children: ReactNode}) {

    const handleSumbit = async (formData :FormData ) => {

        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')

            
        }

        const result  = ProductSchema.safeParse(data)
        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
        }



        const response = await createProduct(result.data)
        if(response?.errors) return response.errors.forEach(issue => { toast.error(issue.message)})
        
        toast.success('Producto creado correctamente')
        redirect('/admin/products')
        
    }


  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-sm max-w-3xl mx-auto ">
        <form action={handleSumbit} className="space-y-5">
            
            {children}



            <input type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                value='Registro Producto'
                />

        </form>

    </div>
  )
}
