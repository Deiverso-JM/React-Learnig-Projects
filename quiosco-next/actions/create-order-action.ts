"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderShema } from "@/src/shemas"


export async function createOrder(Data: unknown) {
    const result = OrderShema.safeParse(Data)

    if(!result.success){
        return{
            errors: result.error.issues
        }
    }


    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    })) 
                }
            }
        })
    } catch (error) {
        console.log(error)
    }

    

    
}