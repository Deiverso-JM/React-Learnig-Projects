import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";
import { body, param } from "express-validator";


const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: the product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: the product name
 *                      example: monitor 50 pulgadas
 *                  price:
 *                      type: number
 *                      description: the product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: the product availability
 *                      example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      applications/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/product'
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by Id
 *          tags:
 *              - Products
 *          description: The ID of the product to retrieve
 *          parameters:
 *           -  in: path
 *              name: id
 *              description: The ID of the produyct to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200: 
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/product'
 *              400: 
 *                  description: bad request - invalid ID
 *              404:
 *                  description: Not Found
 */
router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products: 
 *      post:
 *          summary: Create product
 *          tags:
 *              - Products
 *          description: The create new Product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor de pc"
 *                              price: 
 *                                  type: number
 *                                  example: 200              
 *          responses:
 *              201:  
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/product'
 *              400: 
 *                  description: bad request - invalid input data
 */

router.post('/',

    //Validacion
    body('name').notEmpty().withMessage('El nombre de el producto es requerido'),
    body('price').
        notEmpty().withMessage('El precio del producto es requerido')
        .isNumeric().withMessage('Valor no valido')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Edit product by ID
 *          tags:
 *              - Products
 *          description: Edit prodcut in the BD
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the produyct to retrieve
 *              required: true
 *              schema:
 *                  type: integer          
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor de pc"
 *                              price: 
 *                                  type: number
 *                                  example: 200
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              201: 
 *                  description: Successful update Product Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/product'
 *              400: 
 *                  description: bad request - invalid input data
 *              404: 
 *                  description: Producto Not Found
 * 
 */


router.put('/:id',
    //Validacion
    body('name').notEmpty().withMessage('El nombre de el producto es requerido'),
    body('price').
        notEmpty().withMessage('El precio del producto es requerido')
        .isNumeric().withMessage('Valor no valido')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad des requerido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}: 
 *      delete:
 *          summary: Delete product
 *          tags:
 *              - Products
 *          description: Delete Product Exist
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the produyct to retrieve
 *              required: true
 *              schema:
 *                  type: integer   
 *          responses:
 *              200:  
 *                  description: Delte Product Successful Response
 *              400: 
 *                  description: bad request - invalid input data
 */

router.delete('/:id',    
    param('íd').not().isInt().withMessage('Id no valido'),
    handleInputErrors,
    deleteProduct
)






export default router