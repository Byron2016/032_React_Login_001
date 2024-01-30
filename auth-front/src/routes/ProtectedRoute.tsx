/* Su única función será validar si el usaurio está autentificado, si no lo está te redirigirá */

import { useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

export default function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(false)

  return isAuth ? <Outlet /> : <Navigate to="/" />
}