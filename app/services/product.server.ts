import { ProductResponse } from "~/types/types"

export const  getProducts = async ():Promise<ProductResponse>=>{
    return fetch('https://dummyjson.com/products')
    .then(res => res.json())
    
}