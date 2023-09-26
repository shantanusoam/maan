import Editor from '@/components/Editor'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

const JournalEditorPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  console.log('entry', entry)
  return (
    <div className="w-full h-full ">
      <div >
      <Editor entry={entry} />
      </div>
     
    </div>
  )
}

export default JournalEditorPage 