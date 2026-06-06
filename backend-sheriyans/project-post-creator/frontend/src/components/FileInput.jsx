import React from 'react'

const FileInput = ({field , onChange}) => {
  return (
   <input type='file' field={field} onChange={(e) => onChange(field , e)}
   className="w-full text-sm text-gray-500 border border-gray-200 p-1.5 rounded-lg file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all cursor-pointer"/>
  )
}

export default FileInput