import {NextResponse,NextRequest} from "next/server"
import { join } from "path";

export async function POST(request:NextRequest) {
   const data = await request.formData();
   const file: File | null = data.get('file') as unknown as File 

   if (!file){
    return NextResponse.json({success: false})
   }

   const bytes = await file.arrayBuffer()
   const buffer = Buffer.from(bytes)

   const path = join('/','tmp',file.name)

   

   /*
   attachments : [
   {
   filename: 'file.name'
   path: ''
   }
   ]
   */
}