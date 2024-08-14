import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";





interface Store {
    order: OrderItem[]
    addToCart: (product: Product) => void
    incrementQuantity: (id: Product['id']) => void
    decrementQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void

}


export const useStore = create<Store>()(devtools((set, get) => ({
    order: [],
    addToCart: (product) => {
        const productFound = get()
        const { categoryId, image, ...data } = product
        let items: OrderItem[] = []

        if (get().order.find((item) => item.id === product.id)) {

            items = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {

            items = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]

        }

        set(() => ({
            order: items
        }))

    },

    incrementQuantity: (id) => {

        let items = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: item.price * (item.quantity + 1)
        } : item)

        set((state) => ({
            order: items
        }))

    },
    decrementQuantity: (id) => {
        let items = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)

        set((state) => ({
            order: items
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter((item) => item.id !== id)

        }))
    },

    clearOrder: () => (
        set(() => ({
            order: []
        }))
    )


})))
