"use server"

import { asc, count, eq } from "drizzle-orm";
import { db } from "../db"
import { InsertMessage, messages as messagesTable } from "../db/schema"

interface GetMessagesRequest {
    page: number;
    onlyActives?: boolean
}

export async function createMessage(data: InsertMessage) {
    await db.insert(messagesTable).values(data)
}

export async function updateMessage({id, data}: {id: number; data: InsertMessage}){
    await db.update(messagesTable).set(data).where(eq(messagesTable.id, id))
}

export async function getMessages({page, onlyActives}: GetMessagesRequest){
    const itemsPerPage = 6

    let orderBy = asc(messagesTable.user_name)

    const messagesRows = await db.query.messages.findMany({
    where: onlyActives ? eq(messagesTable.active, true) : undefined,
    orderBy: [orderBy],
    limit: itemsPerPage,
    offset: ((page - 1) * itemsPerPage)
    })
    

   const [objectCount] = await db.select({ messagesCount: count() }).from(messagesTable);
   const messagesCount = objectCount?.messagesCount ?? 0
   const canFetchMore = page * itemsPerPage < messagesCount

    return {
        messages: messagesRows,
        canFetchMore
    }
}