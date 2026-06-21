import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const res = await axios.get("http://localhost:3000/users");
    const { data } = res.data;
    setUsers(data);
  }

  async function deleteHandler(username){
    try{
      await axios.delete(`http://localhost:3000/users/${username}`);
      setUsers((prev) => prev.filter((u) => u.username !== username))
    }catch(error){
      console.log(error.message);
      
    }
  }
  useEffect(() => {
    getUsers();
  },[])

  return (
   <div className="min-h-screen bg-gray-100 p-6">

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {users.map((user) => (
      <div
        key={user._id}
        className="relative bg-white rounded-xl shadow-sm p-5 border"
      >
        {/* Trash Icon */}
        <button
          onClick={() => deleteHandler(user.username)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <FaTrash />
        </button>

        {/* Edit Button */}
        <button
          className="absolute top-3 right-10 text-gray-500 hover:text-blue-500"
        >
          Edit
        </button>

        {/* Content */}
        <h2 className="text-lg font-semibold text-gray-800">
          {user.username}
        </h2>

        <p className="text-gray-600 mt-2">
          <span className="font-medium">Email:</span> {user.email}
        </p>

        <p className="text-gray-600">
          <span className="font-medium">Password:</span> {user.password}
        </p>
      </div>
    ))}
  </div>
</div>
  )
};

export default AllUsers;