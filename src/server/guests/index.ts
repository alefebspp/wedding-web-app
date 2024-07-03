"use server"
import { eq, count, and, ilike, asc, } from "drizzle-orm";
import { db } from "../db";
import { guests as guestsTable, InserGuest, guestCompanions as guestCompaniosTable, guestCompanions } from "../db/schema";
import { revalidatePath } from "next/cache";

export interface CreateGuestRequest extends InserGuest {
    children_names?: {name: string}[];
    adults_names?: {name: string}[];
}

export interface GetGuestsParams  {
    page: number; 
    onlyConfirmed: boolean;
    search?: string;
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

export async function getGuests({page, onlyConfirmed, search}: GetGuestsParams){
    const guestsPerPage = 6

    let where = eq(guestsTable.confirmation, onlyConfirmed)
    const searchWhere = ilike(guestsTable.name, `%${search}%`)
    

   const guests = await db.query.guests.findMany({
    orderBy: [asc(guestsTable.name)],
    where: search ? and(where, searchWhere) : where,
    with: {
      guestCompanions: true
    },
    limit: guestsPerPage,
    offset: (page - 1) * guestsPerPage,
  });

  const [objectCount] = await db.select({ guestsCount: count() }).from(guestsTable).where(where);
   const guestsCount = objectCount?.guestsCount ?? 0
   
   return {
    guests,
    count: guestsCount
   }
}

export default async function deleteGuest({id}: {id: number}){
    
        await db.delete(guestsTable).where(eq(guestsTable.id, id));
        
        revalidatePath("/guests")
        return {success: true}
 }





