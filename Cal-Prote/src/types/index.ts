export type itemMenuT = {
    id: number,
    name: string,
    price: number
}


export type orderItem = itemMenuT & {
    quiantity: number,
    
}