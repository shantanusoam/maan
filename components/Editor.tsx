'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import {useAutosave} from 'react-autosave'
import Spinner from "./Spinner"


const Editor = ({entry}) => {
  const [value,seValue] = useState(entry.content)
  const [isLoading,setIsLoading] = useState(false)
  const [analysis,setAnalysis] = useState(entry?.analysis)
   const {mood, summary, color, subject, negative} = analysis
  const analysisData = [
    {name: 'Summary', value: summary},
    {name: 'Subject', value: subject},
    {name: 'Mood', value: mood},
    {name: 'Negative', value: negative ? 'True' : 'False'}


  ]
  useAutosave({

    data: value,
    onSave: async (_value) =>{
      setIsLoading(true)
      const data = await updateEntry(entry.id, _value)
      setAnalysis(data.analysis)
       setIsLoading(false)
    },
    interval: 3000,
  })
  return (
    <div className="w-full h-full grid grid-cols-3">
     <div className="col-span-2">
       {isLoading &&     <Spinner />}
      <textarea className="w-full h-full p-8 text-xl outline-none" value={value} onChange={e => seValue(e.target.value)}/>
     </div>
       <div className='border-l border-black/10'> <div className='py-10 px-2' style={{backgroundColor: color}}>
        <h2 className='text-xl'>Analysis</h2>
        </div>
        <ul>
          
          {analysisData.map((item) => (
            <li key={item.name} className='px-2 py-4 flex items-center justify-between border-b border-t border-black/10'>
              <span className='text-lg font-semibold'>{item.name}</span>
                <span>{item.value}</span>

            </li>
          ))}
        </ul>
        </div>
    </div>
    
  )
}

export default Editor