/* Su única función será validar si el usaurio está autentificado, si no lo está te redirigirá */

// import { useState } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"

export default function ProtectedRoute() {
  // const [isAuth, setIsAuth] = useState(false)
  const auth = useAuth()

  //return isAuth ? <Outlet /> : <Navigate to="/" />
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" /> 
}