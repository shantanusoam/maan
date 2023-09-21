// import { update } from '@/utils/actions'
import { analyse } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const data = await request.json()
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      content: 'Write about your day',
      user: {
        connect: {
          id: user.id,
        },
      },
       
    },
  })
  const analysis = await analyse(entry.content)
  await prisma.entryAnalysis.create({
    data:{
      entry: { connect: { id: entry.id } }, // Connect to the corresponding JournalEntry
      user: {
        connect: {
          id: user.id,
        },
      }, // Connect to the corresponding User
      ...analysis
    }
  })
  
  revalidatePath('/journal')
  // update(['/journal'])

  return NextResponse.json({ data: entry })
}