export function formatCurrency(quiantity: number){
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(quiantity)
}