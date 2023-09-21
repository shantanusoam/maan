import { analyse } from "@/utils/ai"
import { updateEntry } from "@/utils/api"
import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, {params}) => {
const {content} =  await request.json()
console.log('content inside update', content)
const user = await getUserFromClerkID()
const updatedEntry = await prisma.journalEntry.update({
  where:{
    userId_id: {
      userId: user.id,
      id: params.id,
    },
    
  },
  data:{
    content    
  },
})
   const analysis = await analyse(updatedEntry.content)
  const savedAnalysis = await prisma.entryAnalysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: { ...analysis },
    create: {
      entryId: updatedEntry.id,
      userId: user.id,
      ...analysis,
    },
  })
  revalidatePath(`/journal/${entry.id}`)
console.log(savedAnalysis )
return NextResponse.json({data: updatedEntry})
}