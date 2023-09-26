'use client'
import { askQuestion } from '@/utils/api'
import React, { useState } from 'react'

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
      {response && (<div>{response.data}</div>)}

      </div>
  )
}

export default Question