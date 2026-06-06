import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      {/* Premium subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Header Section */}
      <div className="text-center mb-10 max-w-xl z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Welcome to <span className="bg-gradient-to-r from-zinc-200 to-zinc-500 bg-clip-text text-transparent">Postify</span>
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          A minimalist platform to capture moments, write your thoughts, and share updates with a clean developer-centric workflow.
        </p>
      </div>

      {/* Main Feature Navigation Card */}
      <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl z-10 hover:border-zinc-700 transition-all duration-300 group">
        <div className="flex flex-col items-center text-center">
          {/* Decorative Icon Wrapper */}
          <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-xl mb-4 group-hover:bg-white group-hover:text-black transition-colors duration-300">
            ⚡
          </div>

          <h2 className="text-xl font-bold text-white mb-2">Explore the Feed</h2>
          <p className="text-xs text-zinc-500 mb-6 max-w-[240px]">
            Dive straight into public posts, media collections, and latest updates from users.
          </p>

          {/* Action Link Button */}
          <Link 
            to="/feed" 
            className="w-full py-3 px-6 bg-white hover:bg-zinc-200 text-black font-semibold rounded-xl text-center text-sm transition-all duration-200 shadow-md active:scale-[0.98]"
          >
            Enter Feed Page →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home