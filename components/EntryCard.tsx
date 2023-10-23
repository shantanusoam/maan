import KittyStamp from './kittyComponents/kittyStamp.jsx'
const EntryCard = ({ entry }) => {
  console.log(entry)
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 shadow-lg transform transition duration-300 ease-in-out hover:scale-105 group">
    <div className="relative aspect-w-16 aspect-h-9 mb-4">
        {/* <img src="hello-kitty-image.jpg" alt="Hello Kitty" class="object-cover rounded-lg"> */}
    </div>
    <h2 className="text-xl font-semibold mb-2" style={{color: entry.analysis.color}}>{entry.analysis.subject}</h2>
    <p className="text-gray-600 mb-4">{entry.analysis.summary}</p>
    <div className="flex justify-between items-center text-sm text-pink-500">
        <span>Emotion: {entry.analysis.mood}</span>
        <span>Created: {date}</span>
    </div>
    
    <div className="absolute top-0 right-0 p-2 transform translate-x-2 -translate-y-2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
        
        <KittyStamp baseColour={entry.analysis.color}/>
       
    </div>
</div>
    // <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
    //   <div className="px-4 py-5 sm:px-6">{date}</div>
    //   <div className="px-4 py-5 sm:p-6">summary</div>
    //   <div className="px-4 py-4 sm:px-6">mood</div>
    // </div>
  )
}

export default EntryCard