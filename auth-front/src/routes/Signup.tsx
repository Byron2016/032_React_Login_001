import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout"
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Signup(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const auth = useAuth()

  if(auth.isAuthenticated){
    /* si ya está autentificado se va directo al dashboard. */
    return <Navigate to="/dashboard"/>
  }

  return (
    <DefaultLayout>
      <form className="form">
          <h1>Signup</h1>
          <label >Name</label>
          <input type="text" value={name} 
          onChange={(e) => setName(e.target.value)}/>

          <label >UserName</label>
          <input type="text"  value={username} 
          onChange={(e) => setUsername(e.target.value)}/>

          <label >Password</label>
          <input type="password" value={password} 
          onChange={(e) => setPassword(e.target.value)} />

          <button>Create User</button>
      </form>
    </DefaultLayout>
  )
}