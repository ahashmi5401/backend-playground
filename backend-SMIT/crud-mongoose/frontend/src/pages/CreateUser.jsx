import Input from "../components/Input"
import axios from "axios"
import { useState } from "react";
const CreateUser = () => {
    const [user, setuser] = useState({
        username:"",
        email:"",
        password:""
    })
    function handleInputChange(e , field){
        setuser((prev) => ({
            ...prev,
            [field] : e.target.value
            }
        ))
    }
    async function submitHandler (e){
        e.preventDefault();
        try {
            if(!user.username || !user.email || !user.password){
                return 'fill all field'
            }
            let data = await axios.post("http://localhost:3000/users" , user)
            setuser({
        username:"",
        email:"",
        password:""
    })
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create User
        </h2>

        <form onSubmit={(e) => submitHandler(e)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Username
            </label>
            <Input type="text" placeholder="Enter Username" field="username" handler={handleInputChange}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>
            <Input type="email" placeholder="Enter Email" field="email" handler={handleInputChange}/>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>
             <Input type="password" placeholder="Enter password" field="password" handler={handleInputChange}/>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;