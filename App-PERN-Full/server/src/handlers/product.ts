import { Response, Request } from "express"
import Produts from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const foundProducts = await Produts.findAll({
            order: [
                ['price', 'ASC']
            ]
        })
        res.json({data: foundProducts})

    } catch (error) {
        console.log(error)
    }
}


export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const foundProduct = await Produts.findByPk(id)

        if(!foundProduct){
            return res.status(404).json({
                error: 'Producto No encontrado'
            })
        }
        res.json({data: foundProduct})

    } catch (error) {
        console.log(error)
    }
}



export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Produts(req.body)
        const saveProduct = await product.save()
        res.status(201).json({ data: saveProduct })

    } catch (error) {
        console.log(error)
    }
}



export const updateProduct = async (req: Request, res: Response ) => {
    const { id } = req.params
    const foundProduct = await Produts.findByPk(id)

    //Validacion
    if(!foundProduct) {
        return res.status(400).json({
            error: 'Producto no encontrado' 
        })
    }

    //Update
    await foundProduct.update(req.body)
    await foundProduct.save()

    res.status(200).json({data: foundProduct})
}


export const deleteProduct = async  (req: Request, res: Response ) => {
    const { id } = req.params
    const foundProduct = await Produts.findByPk(id)

    //Validacion
    if(!foundProduct) {
        return res.status(400).json({
            error: 'Producto no encontrado' 
        })
    }


    await foundProduct.destroy()
    await foundProduct.save()


    res.json('Registro eliminado correctamente')
}