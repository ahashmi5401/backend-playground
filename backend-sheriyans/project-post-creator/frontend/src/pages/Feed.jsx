import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Feed = () => {
  const [post, setPost] = useState([])
  async function getData(){
    
    const response = await axios.get('http://localhost:3000/posts')
    const {post} = response.data
    console.log(post)
    setPost(post)
  }

  useEffect(()=> {
    getData()
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
  {post.map((each, idx) => {
    return (
      <div 
        key={each._id || idx} 
        className="bg-black border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        {/* Post Image Container */}
        <div className="aspect-video w-full bg-gray-100 relative overflow-hidden">
          {each.image ? (
            <img 
              src={each.image} 
              alt={each.caption || "Post image"} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No Image Provided
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="p-4 flex flex-col gap-2">
          {/* Caption */}
          <p className="text-sm text-gray-800 font-medium line-clamp-3">
            {each.caption || <span className="text-gray-400 italic">No caption provided</span>}
          </p>

          {/* Footer Metadata (Optional/Placeholder) */}
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100 text-xs text-gray-500">
            <span>Post #{idx + 1}</span>
            <button className="text-black hover:underline font-medium">
              View Detail
            </button>
          </div>
        </div>
      </div>
    )
  })}
</div>
  )
}

export default Feed