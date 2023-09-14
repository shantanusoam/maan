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
  const analysisData = [
    {name: 'Summary', value: ''},
    {name: 'Subject', value: ''},
    {name: 'Mood', value: ''},
    {name: 'Negative', value: false}


  ]
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className='col-span-2'>
      <Editor entry={entry} />
      </div>
      <div className='border-l border-black/10 p-3'> <div className='bg-blue-300 px-6 py-10'>
        <h2>Analysis</h2>
        </div>
        <ul>
          <li></li>
        </ul>
        </div>
    </div>
  )
}

export default JournalEditorPage