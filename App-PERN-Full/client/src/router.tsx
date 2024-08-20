import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Products, {loader as productLoader} from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {loader as  EditProductLoader, action as EditProductAction} from "./views/EditProduct";
import { action as DeleteProductAction } from "./components/ProductDetails";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productLoader
                
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: newProductAction
            },
            {
                path: 'productos/:id/editar',
                element: <EditProduct/> ,
                loader:  EditProductLoader,
                action: EditProductAction
                
            },
            {
                path: 'productos/:id/eliminar',
                action:DeleteProductAction
            }
        ]
    }
])