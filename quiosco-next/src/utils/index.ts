import { products } from "@/prisma/data/products"

export function formatCurrency(amout:number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amout)
    
}

export function getImagePath(imagePath: string){
    const cloudinaryBaseUrl = 'hhtps//res.cloudinary.com'
    if(imagePath.startsWith(cloudinaryBaseUrl)){

        return imagePath
    }else{
        return `/products/${imagePath}.jpg`
    }

}