"use server"
import { eq, asc, getTableColumns } from "drizzle-orm";
import { db } from "../db";
import { InsertProduct, products as productsTable, productsImages } from "../db/schema";
import { revalidatePath } from "next/cache";

interface CreateProductRequest extends InsertProduct {
    path: string;
}

export async function createProduct(data: CreateProductRequest){
    const {path, ...productData} = data

    const [product] = await db
          .insert(productsTable)
          .values(productData).returning()

    if(product){
        await db.insert(productsImages).values({product_id: product.id, path})
        revalidatePath("/products")
    }
}

export async function getProductsWithImages(){
    const products = db.select(
        {
            ...getTableColumns(productsTable),
            imageUrl: productsImages.path,
        }
    ).from(productsTable).leftJoin(productsImages, eq(productsTable.id, productsImages.product_id))
    .groupBy(productsTable.id, productsImages.path)
    .orderBy(asc(productsTable.id));

    return products
}

export default async function deleteProduct({id}: {id: number}){
    const response = await fetch(`http://localhost:3000/api/product_image/delete/${id.toString()}`, {
        method: "DELETE",
      });

    const data = await response.json();
    
    if(data.success){
        await db.delete(productsTable).where(eq(productsTable.id, id));
        revalidatePath("/products")
        return {success: true}
    }else {
        return {success: false}
    }
 }