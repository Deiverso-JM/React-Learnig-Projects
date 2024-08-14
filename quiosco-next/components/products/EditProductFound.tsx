'use client'

import { updateProduct } from "@/actions/update-Product-action";
import { ProductSchema } from "@/src/shemas";
import { redirect, useParams } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "react-toastify";

export default function EditProductFound({children} : {children: ReactNode}) {


    const params = useParams()
    const id = +params.id!


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

        const response = await updateProduct(result.data, id)
        if(response?.errors) return response.errors.forEach(issue => { toast.error(issue.message)})


        
        toast.success('Producto actualizado correctamente')
        redirect('/admin/products')
        
    }


  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-sm max-w-3xl mx-auto ">
        <form action={handleSumbit} className="space-y-5">
            
            {children}



            <input type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                value='Guardar Cambios'
                />

        </form>

    </div>
  )
}
