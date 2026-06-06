import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  // Helper function to dynamically highlight the active link
  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:to-zinc-200 transition-all">
            Postify
          </h2>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link 
            to="/" 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive('/') 
                ? 'bg-zinc-900 text-white shadow-inner' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            Home
          </Link>
          
          <Link 
            to="/feed" 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive('/feed') 
                ? 'bg-zinc-900 text-white shadow-inner' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            Feed
          </Link>

          <Link 
            to="/create-post" 
            className="ml-2 px-4 py-2 text-sm font-semibold bg-white text-black rounded-lg hover:bg-zinc-200 active:scale-95 transition-all duration-200 shadow-sm"
          >
            Create Post
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar