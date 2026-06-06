import Feed from "./pages/Feed.jsx";
import CreatePost from "./pages/CreatePost";

import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "../layout/MainLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Home />}/>
      <Route path='/create-post' element={<CreatePost/>}/>
      <Route path='/feed' element={<Feed/>}/>
      </Route>
    </Routes>
  )
}

export default App