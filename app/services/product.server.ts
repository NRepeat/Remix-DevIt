export const  getProducts = async ()=>{
    return fetch('https://dummyjson.com/products')
    .then(res => res.json())
    
}