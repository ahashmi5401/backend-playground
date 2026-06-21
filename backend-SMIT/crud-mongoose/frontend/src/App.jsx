import React from 'react'
import {Routes , Route} from "react-router-dom"
import CreateUser from './pages/CreateUser'
import AllUsers from './pages/AllUsers'
import MainLayout from './layout/MainLayout'
const App = () => {
  return (
   <Routes>
    <Route element={<MainLayout/>}>
    <Route path='/' element={ <CreateUser />} />
    <Route path='/users' element={<AllUsers/>}/>
    </Route>
    </Routes>
  )
}

export default App