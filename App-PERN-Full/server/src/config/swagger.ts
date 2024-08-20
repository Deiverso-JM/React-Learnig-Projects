import swaggerJSDoc from "swagger-jsdoc";


const options : swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi: '3.0.2',
        tags:[
            {
                name:'Products',
                description:'API operations relates to products'
            }
        ],
        info: {
            title: 'REST API NET',
            version: "1.0.0",
            description: "API docs for products",
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec  