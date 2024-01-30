import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout"

export default function Login(){
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <DefaultLayout>
      <form className="form">
          <h1>Login</h1>
          <label >UserName</label>
          <input type="text"  value={username} 
          onChange={(e) => setUsername(e.target.value)}/>

          <label >Password</label>
          <input type="password" value={password} 
          onChange={(e) => setPassword(e.target.value)} />

          <button>Login</button>
      </form>
    </DefaultLayout>
  )
}