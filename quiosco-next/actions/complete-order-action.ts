"use server"
import { prisma } from "@/src/lib/prisma"
import { OrderIdShema } from "@/src/shemas"
import { revalidatePath } from "next/cache"


export async function completeOrder(formData: FormData) {
    const data = {
        orderId: formData.get('order_id')
    }

    const result = OrderIdShema.safeParse(data)
    if (result.success) {
        try {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })
            revalidatePath('/admin/orders')
        } catch (error) {
            console.log(error)
        }
    }

}  