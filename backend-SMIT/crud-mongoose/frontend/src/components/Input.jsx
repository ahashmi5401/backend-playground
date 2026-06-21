import React from 'react'

const Input = ({type , field , handler , placeholder}) => {
  return (
   <input
              type={type}
              placeholder={placeholder}
              onChange={(e) => handler(e , field)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
  )
}

export default Input