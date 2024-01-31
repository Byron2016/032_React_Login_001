import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout"
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import type { AuthResponseError } from "../types/types";

export default function Login(){
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("")

  const auth = useAuth()

  const goTo = useNavigate()

  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        })
      });

      if(response.ok){
        console.log("Login successfully");
        setErrorResponse("")
        goTo("/")
      } else {
        console.log("Something weng wrong");
        const json = await response.json() as AuthResponseError
        setErrorResponse(json.body.error)
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(auth.isAuthenticated){
    /* si ya está autentificado se va directo al dashboard. */
    return <Navigate to="/dashboard"/>
  }

  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
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