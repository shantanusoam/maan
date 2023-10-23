'use client'
import { askQuestion } from '@/utils/api'
import React, { useState } from 'react'
import KittyStamp from './kittyComponents/kittyStamp'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()
 
  const onChange = (e) => {
    setValue(e.target.value)
 }
 const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  const answer = await askQuestion(value)
  setResponse(answer)
  setValue('')
  setLoading(false)
 }
  return (
    <div><form onSubmit={handleSubmit}>
      <input disabled={loading} value={value} onChange={onChange} className='border border-black/20 px-4 py-2 mr-2 text-lg rounded-lg' type='text' placeholder='Ask a Question'/>
      <button disabled={loading} type='submit' className='bg-blue-400 px-4 py-2 rounded-lg text-lg'>Ask</button>
      </form>
      {loading && (<div>Loading...</div>)}
      {response && (
        
     <div className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 shadow-lg transform transition duration-300 ease-in-out hover:scale-105 group m-8">
    <div className="relative aspect-w-16 aspect-h-9 mb-4">
        {/* <img src="hello-kitty-image.jpg" alt="Hello Kitty" class="object-cover rounded-lg"> */}
    </div>
    <h2 className="text-xl font-semibold mb-2">kittty insight</h2>
    <p className="text-gray-600 mb-4">{response.data}</p>
    {/* <div className="flex justify-between items-center text-sm text-pink-500">
        <span>Emotion: Happy</span>
        <span>Created: 2023-10-20</span>
    </div> */}
    <div className="absolute top-0 right-0 p-2 transform translate-x-2 -translate-y-2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
       <KittyStamp baseColour={"#212121"}/>
    </div>
</div>
      
      )}

      </div>
  )
}

export default Question