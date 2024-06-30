"use server"
import { eq, asc, getTableColumns, count } from "drizzle-orm";
import { db } from "../db";
import { guests as guestsTable, InserGuest, guestCompanions as guestCompaniosTable } from "../db/schema";
import { revalidatePath } from "next/cache";

export interface CreateGuestRequest extends InserGuest {
    children_names?: {name: string}[];
    adults_names?: {name: string}[];
}

export async function createGuest(data: CreateGuestRequest){
    const {children_names, adults_names, ...guestData} = data

    const toBeAddedCompanions: string[] = []

    if(children_names && children_names.length > 0){
        children_names.map(({name}) => toBeAddedCompanions.push(name))
    }
    if(adults_names && adults_names.length > 0){
        adults_names.map(({name}) => toBeAddedCompanions.push(name))
    }

    const [guest] = await db
          .insert(guestsTable)
          .values(guestData).returning()

    if(guest){
        if(toBeAddedCompanions.length > 0){
            Promise.all(toBeAddedCompanions.map(async (name) => {
                await db.insert(guestCompaniosTable).values({name, guest_id: guest.id})
            }))
        }

        revalidatePath("/guests")
    }    
}

export async function getGuests({page}: {page: number}){
    const guestsPerPage = 6

    const productsRows = await db.select(
        {
            ...getTableColumns(guestsTable),
        }
    ).from(guestsTable)
    .limit(guestsPerPage)
    .offset((page - 1) * guestsPerPage);

   const [objectCount] = await db.select({ guestsCount: count() }).from(guestsTable);
   const guestsCount = objectCount?.guestsCount ?? 0
   const canFetchMore = page * guestsPerPage < guestsCount

    return {
        products: productsRows,
        canFetchMore
    }
} 


/* export async function updateProduct({data,id}: UpdateProductRequest){
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
 */




