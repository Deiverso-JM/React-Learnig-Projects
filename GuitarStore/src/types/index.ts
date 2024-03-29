type Guitar = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number
}

type CartGuitar = Guitar & {
    quantity: number
}







export type {
    CartGuitar,
    Guitar
}