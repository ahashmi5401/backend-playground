import React from 'react'
import Navbar from '../src/components/Navbar'
import { Outlet } from 'react-router-dom'
const MainLayout = ({children}) => {
  return(
    <div className='flex flex-col  '>

        <Navbar/>
        <main>
        <Outlet /> 
      </main>
    </div>
  )
}

export default MainLayout