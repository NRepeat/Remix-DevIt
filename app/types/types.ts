/*
{
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
*/

export type Product ={
id:number,
title:string
description:string,
price:number,
discountPercentage:number,
reting:number,
stock:number,
brand:string,
category:string,
thumbnail:string,
images:string[]    
}

export type ProductResponse = { 
    limit:number,
    skip:number,
    total:number,
    products:Product[]
}
