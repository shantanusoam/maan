// import { update } from '@/utils/actions'
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
  revalidatePath('/journal')
  // update(['/journal'])

  return NextResponse.json({ data: entry })
}