import { del } from '@vercel/blob';
import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import { productsImages } from '~/server/db/schema';
  
export async function DELETE(request: Request, { params }: { params: { id: string } }
) {

    const productImage = await db.selectDistinct().from(productsImages).where(eq(productsImages.product_id, parseInt(params.id)))

    const imageUrl = productImage[0]?.path ?? ''

   try {
    await del(imageUrl, {token: process.env.BLOB_READ_WRITE_TOKEN,
    }); 
   } catch (error) {
    console.log("ERROR:", error)
    return Response.json({success: false})
   }

 
  return Response.json({success: true})
}