"use server"
import { eq, asc, getTableColumns, count } from "drizzle-orm";
import { db } from "../db";
import { InsertProduct, SelectProduct, products as productsTable, productsImages } from "../db/schema";
import { revalidatePath } from "next/cache";

interface UpdateProductData extends Partial<Omit<SelectProduct, 'id'>> {
    path?: string;
}

interface CreateProductRequest extends InsertProduct {
    path: string;
}

interface UpdateProductRequest extends Partial<Omit<SelectProduct, 'id'>>{
    data: UpdateProductData;
    id: number;
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

export async function updateProduct({data,id}: UpdateProductRequest){
    const {path, ...productData} = data

    if(path){
        const response = await fetch(`http://localhost:3000/api/product_image/delete/${id.toString()}`, {
        method: "DELETE",
      });

    const data: {success: boolean} = await response.json(); // eslint-disable-line no-use-before-define

        if(!data.success){
            return
        }

        await db.update(productsImages).set({path}).where(eq(productsImages.product_id, id));
    }

    await db.update(productsTable).set(productData).where(eq(productsTable.id, id));

    revalidatePath("/products")
}




export async function getProductsWithImages({page}: {page: number}){
    const productsPerPage = 6

    const productsRows = await db.select(
        {
            ...getTableColumns(productsTable),
            imageUrl: productsImages.path,
        }
    ).from(productsTable).leftJoin(productsImages, eq(productsTable.id, productsImages.product_id))
    .groupBy(productsTable.id, productsImages.path)
    .orderBy(asc(productsTable.id))
    .limit(productsPerPage)
    .offset((page - 1) * productsPerPage);

   const [objectCount] = await db.select({ productsCount: count() }).from(productsTable);
   const productsCount = objectCount?.productsCount ?? 0
   const canFetchMore = page * productsPerPage < productsCount

    return {
        products: productsRows,
        canFetchMore
    }
}

export default async function deleteProduct({id}: {id: number}){
    const response = await fetch(`http://localhost:3000/api/product_image/delete/${id.toString()}`, {
        method: "DELETE",
      });

    const data: {success: boolean} = await response.json(); // eslint-disable-line no-use-before-define
    
    if(data.success){
        await db.delete(productsTable).where(eq(productsTable.id, id));
        revalidatePath("/products")
        return {success: true}
    }else {
        return {success: false}
    }
 }