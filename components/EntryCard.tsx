const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 shadow-lg transform transition duration-300 ease-in-out hover:scale-105 group">
    <div className="relative aspect-w-16 aspect-h-9 mb-4">
        {/* <img src="hello-kitty-image.jpg" alt="Hello Kitty" class="object-cover rounded-lg"> */}
    </div>
    <h2 className="text-xl font-semibold mb-2">Hello Kitty's Diary Entry</h2>
    <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    <div className="flex justify-between items-center text-sm text-pink-500">
        <span>Emotion: Happy</span>
        <span>Created: {date}</span>
    </div>
    <div className="absolute top-0 right-0 p-2 transform translate-x-2 -translate-y-2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-pink-500">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8v4m0 0v4m0-4h4m-4 0H5.293a1 1 0 01-.707-.293l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01.293.707V8z" />
        </svg>
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