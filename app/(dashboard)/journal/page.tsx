import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import Question from '@/components/Question'
import bg from '../../../public/helloKitty.jpg'
import { analyse } from '@/utils/ai'
// import Question from '@/components/Question'
// import { qa } from '@/util/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserFromClerkID()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })
  // await analyse('so today i wake up pretty late there was lot of things to do and i was confused as it was pretty sacry idk what to for fuck shake it was not horrible but then i start making things up nto the mark in easy way go on a course completed my job then downloaded some games of cause illegally and then try to play it but got nothing in exitment but then i got something a kiss it was fulffilling')
  return data
}

const JournalPage = async () => {
  const data = await getEntries()
  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full" style={{
      backgroundImage: `url(${bg})`
    }}>
      <h1 className="text-4xl mb-12">Journals</h1>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NewEntry />
        {data.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JournalPage