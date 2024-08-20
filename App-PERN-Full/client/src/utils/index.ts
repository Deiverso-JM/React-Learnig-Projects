export function curremcyMoney(value: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value )
    
}


export function toBoolean(str: string ){
    return str.toLowerCase() === 'true'
}