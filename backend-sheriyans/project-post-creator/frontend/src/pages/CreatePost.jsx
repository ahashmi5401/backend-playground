import React, { useState } from 'react'
import Input from '../components/Input'
import FileInput from '../components/FileInput'
import axios from 'axios'
const CreatePost = () => {
 const [post,setPost] = useState({
    caption : '',
    image : null
  })

function handleInputChange(field , e){
const { type, value, files } = e.target
  // if(e.target.type == 'text'){
  //   setPost((prev) => ({
  //     ...prev,
  //     [field] : value
  //   }))
  // }else if(e.target.type == "file"){
  //   setPost((prev) => ({
  //     ...prev,
  //     [field] : files[0]
  //   }))
  // }

setPost((prev) => ({
    ...prev,
    [field]: type === 'file' ? files[0] : value 
  }))
}

  async function submitHandler(e){
    e.preventDefault()
    console.log('hello submission hgyi kiyaaa')

    const formData = new FormData()
    //use for to send file bcz if dont use this we cant able to send file to server
    formData.append('caption' , post.caption)
    formData.append('image' , post.image)
     const response = await axios.post('http://localhost:3000/create-post' , formData)
    console.log(response);
    console.log("post " , post)
    setPost({ caption: '', image: '' })
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
  <h2 className="text-xl font-semibold text-gray-800 mb-5">Create New Post</h2>
  
  <div className="flex flex-col gap-4">
    {/* Caption Input */}
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Caption</label>
      <Input
        field={'caption'} 
        placeholder={'What\'s on your mind?'} 
        type="text" 
        onChange={handleInputChange} 
      />
    </div>

    {/* File Input */}
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Image</label>
      <FileInput field='image' onChange={handleInputChange}/>
    </div>

    {/* Submit Button */}
    <button onClick={(e) => submitHandler(e)} className="mt-2 w-full bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm">
      Publish Post
    </button>
  </div>
</div>
  )
}

export default CreatePost