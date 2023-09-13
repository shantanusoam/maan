import Editor from "@/components/Editor"
import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async id => {
  const user = await getUserFromClerkID() 
 const entry = await prisma.journalEntry.findUnique({
  where: {
    userId_id: {
      userId: user.id,
      id, 
    }
  }
 })
}

const EntryPage = ({params}) => {
return <div>
  <Editor/>
</div>
}
export default EntryPage