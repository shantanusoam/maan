'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import {useAutosave} from 'react-autosave'


const Editor = ({entry}) => {
  const [value,seValue] = useState(entry.content)
  const [isLoading,setIsLoading] = useState(false)
  useAutosave({

    data: value,
    onSave: async (_value) =>{
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)
       setIsLoading(false)
    },
    interval: 4000,
  })
  return (
    <div className="w-full h-full">
      {isLoading && <div>...loading</div>}
      <textarea className="w-full h-full p-8 text-xl outline-none" value={value} onChange={e => seValue(e.target.value)}/>
    </div>
    
  )
}

export default Editor