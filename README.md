<div>
	<div>
		<img src=https://raw.githubusercontent.com/Byron2016/00_forImages/main/images/Logo_01_00.png align=left alt=MyLogo width=200>
	</div>
	&nbsp;
	<div>
		<h1>032_React_Login_001</h1>
	</div>
</div>

&nbsp;

# Table of contents

--- 

- [Table of contents](#table-of-contents)
- [Project Description](#project-description)
- [Technologies used](#technologies-used)
- [References](#references)
- [Steps](#steps)



[⏪(Back to top)](#table-of-contents)

# Project Description

**032_React_Login_001** is a practice to build a **Login and register appliction with Mongo DB** React, HTLM, CSS, Nodejs following Youtube Vida MRR - Programacion web's tutorial [CURSO DE LOGIN y REGISTRO COMPLETO CON REACT](https://www.youtube.com/watch?v=q4ywr3eZmk0) and the other help that you can find into **Reference** section.

[⏪(Back to top)](#table-of-contents)
&nbsp;

# Technologies used

--- 

- [x] ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- [x] ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- [x] ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- [x] ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- [x] ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- [X] ![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) 
- [ ] ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

[⏪(Back to top)](#table-of-contents)

# References

- Vida MRR - Programacion web tutorial and Github repositories

  - [CURSO DE LOGIN y REGISTRO COMPLETO CON REACT](https://www.youtube.com/watch?v=q4ywr3eZmk0)
  - [ Github: marcosrivasr / auth-react-node](https://github.com/marcosrivasr/auth-react-node)

- Shields.io

  - [Shields.io](https://shields.io/)

  - [Github Ileriayo markdown-badges](https://github.com/Ileriayo/markdown-badges)

  - [Github Ileriayo markdown-badges WebSite](https://ileriayo.github.io/markdown-badges/)

[⏪(Back to top)](#table-of-contents)

# Steps

- **Install and Setup Vite React**

  - **Create Vite Project For React**

    ```bash
      pnpm create vite
    ```


		- Name: auth-front 
		- Project: React
		- TypeScript Option: TypeScript + SWC 
		- Finish configuration
  		- cd auth-front
  		- pnpm install
  		- pnpm run dev 

  - **Add Routes Management**

    ```bash
      pnpm add react-router-dom
    ```
- **Front-End:**
  - **Add CSS and delete some files**
  - **Add Routes to main.tsx**

    ```js
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';

    const router = createBrowserRouter([
      {
        path: "/",
        element: <App/>,
      }
    ]);

    ReactDOM.createRoot(document.getElementById('root')   !).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    )
    ```

  - **Add new Routes to main.tsx**
    - Create a new folder src/routes
      - Create new file Login.tsx
      - Create new file Signup.tsx
      - Create new file Dashboard.tsx
    - Add this new routes to the last routes that we created.

    ```js
    ....
    const router = createBrowserRouter([
      {
        path: "/dashboard",
        element: <Dashboard/>,
      }
    ]);

    ....
    ```
  - **Add a Protected route to main.tsx**
    - Create a new folder src/routes
      - Create new file ProtectedRoute.tsx

    ```js
      /* Su única función será validar si el usaurio está autentificado, si no lo está te redirigirá */

      import { useState } from "react"
      import { Outlet, Navigate } from "react-router-dom"

      export default function ProtectedRoute() {
        const [isAuth, setIsAuth] = useState(false)

        return isAuth ? <Outlet /> : <Navigate to="/" />
      }
    ```

    - Add this new routes to the last routes that we created.

    ```js
    ....
    const router = createBrowserRouter([
      ....
      {
        path: "/",
        element: <ProtectedRoute/>,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard/>,
          }
        ]
      },
    ]);
    ....
    ```
 

  - **Add a Global State for AuthProvider**
    - Create an AuthProvider and a Context.
      - Create a new file in this route src/auth/AuthProvider.tsx 

    ```js
      import { useContext, createContext, useState, useEffect } from "react";

      interface AuthProviderProps{
        children: React.ReactNode;
      }

      const AuthContext = createContext({
        isAuthenticated: false
      })

      export function AuthProvider({children}:AuthProviderProps){
      
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        return (
          <AuthContext.Provider value={{isAuthenticated}}>
            {children}
          </AuthContext.Provider>
        )
      }

      export const useAuth = () => useContext(AuthContext)
    ```

    - Enable AuthProvider to main.tsx

    ```js
      ....
      import { AuthProvider } from './auth/AuthProvider.tsx'

      ....

      ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </React.StrictMode>,
      )
    ```

    - Use AuthContext into ProtectedRoute.tsx

    ```js
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
    ```

  - **Create a Default layout**
    - Create a new file in this route src/layout/DefaultLayout.tsx

    ```js
      import { Link } from "react-router-dom";

      interface DefaultLayoutProps {
        children?: React.ReactNode;
      }
      export default function DefaultLayout({ children }:       DefaultLayoutProps) {
        return (
          <>
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </ul>
              </nav>
            </header>

            <main>{children}</main>
          </>
        );
      }
    ```

  - **Update Login and Signup to use a Default layout**
    ```js
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

    ```

  - **Validate protected routes for Login and Signup**
    -  Update Login and Signup to use a Default layout
      ```js
        ....
        import { useAuth } from "../auth/AuthProvider";
        import { Navigate } from "react-router-dom";

        export default function Login(){
          ....

          const auth = useAuth()

          if(auth.isAuthenticated){
            /* si ya está autentificado se va directo al      dashboard. */
            return <Navigate to="/dashboard"/>
          }

          ....
        }
      ```


- **Back-End:**
  - **Create a Back-End project**

    ```bash
      mkdir auth-back
      cd auth-back 
      pnpm init
      echo  "node_modules" > .gitignore
      
    ```

  - **Add some modules to out back-end project**
    ```bash
      pnpm add express cors bcrypt dotenv jsonwebtoken mongoose 
      pnpm add nodemon -D 
    ```

  - **Add eslint standard**
    ```bash
      pnpm add eslint -D 
      npm init @eslint/config
    ```

  - **Add a server**
    ```js
      const express = require('express')
      const cors = require('cors')
      const app = express()
      const mongoose = require('mongoose')

      require('dotenv').config()

      const port = process.env.PORT || 5000

      app.use(cors())
      app.use(express.json())

      app.get('/', (req, res) => {
        res.send('Hello World!!')
      })

      app.listen(port, () => {
        console.log(`Server is running on port: ${port}. http://localhost:${port}/`)
      })
    ```

  - **Add new routes**
    - Create new files for each route src/routes/login.js
      ```js
        const router = require('express').Router()

        router.get('/', (req, res) => {
          res.send('login')
        })

        module.exports = router
      ```

    - Use the new routes in app.js.
      ```js
        ....
        app.use(express.json())

        app.use('/api/signup', require('./routes/signup'))
        app.use('/api/login', require('./routes/login'))
        app.use('/api/user', require('./routes/user'))
        app.use('/api/todos', require('./routes/todos'))
        app.use('/api/refresh-token', require('./routes/refreshToken'))
        app.use('/api/signout', require('./routes/signout'))
        ....
      ```

  - **Unified responses**
    - Create new file into this path src/libs/jsonResponse.js
      ```js
        exports.jsonResponse = function (statuscode, body) {
          return {
            statuscode,
            body
          }
        }
      ```

    - Use jsonResponse into signup route (Do the same for login route).
      ```js
        const { jsonResponse } = require('../libs/jsonResponse')

        const router = require('express').Router()

        router.post('/', (req, res) => {
          const { username, name, password } = req.body

          if (!username || !name || !password) {
            return res.status(400).json(jsonResponse(400, {
              error: 'Fields are required'
            }))
          }

          // crear usuario.
          res
            .status(200)
            .json(jsonResponse(200, {
              message: 'User created successfully'
            }))
          res.send('signup')
        })

        module.exports = router
      ```

- **Front-End:**
  - **Call and use Back-End**
    - Create a new constats file: src/auth/constants.ts with API URL

      ```js
        export const API_URL ="http://localhost:5000/api"
      ```

    - Create a new types file: src/types/types.ts with API URL

      ```js
        export interface AuthResponse {
          body: {
            user: User;
            accessToken: string;
            refreshToken: string;
          };
        }


        export interface AuthResponseError {
          body: {
            error: string;
          };
        }

        export interface User {
          _id: string;
          name: string;
          username: string;
        }
      ```

    - Modifyed Signup and Login files to event on form´s submit

      ```js
        ....
        import { Navigate, useNavigate } from "react-router-dom";
        import { API_URL } from "../auth/constants";
        import type { AuthResponseError } from "../types/types";

        export default function Signup(){
          ....
          const [errorResponse, setErrorResponse] = useState("")

          const auth = useAuth()

          const goTo = useNavigate()

          if(auth.isAuthenticated){
            /* si ya está autentificado se va directo al dashboard. */
            return <Navigate to="/dashboard"/>
          }

          async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
            e.preventDefault();
            try {
              const response = await fetch(`${API_URL}/signup`,{
                method:"POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  username,
                  password,
                })
              });

              if(response.ok){
                console.log("User created successfully");
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

          return (
            <DefaultLayout>
              <form className="form" onSubmit={handleSubmit}>
                  <h1>Signup</h1>
                  {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                  ....
              </form>
            </DefaultLayout>
          )
        }
      ```

- **Back-End:**
  - **User's Authentication**
    - You need to send 3 things: 
      - Access Token
      - Refresh Token
      - User

      ```js
        ....
        
        /* login.js back-end project */
        router.post('/', (req, res) => {
          ....

          // autenticar usuario.
          const accessToken = 'access_token'
          const refreshToken = 'refresh_token'
          const user = {
            id: '1',
            name: 'John Doe',
            username: 'JohnDoe'
          }
          res
            .status(200)
            .json(jsonResponse(200, {
              user, accessToken, refreshToken
            }))
          // res.send('login')
        })
        ....
      ```

- **MongoDB**
  - **Configuration**
    - Go to this URL: [MongoDB Atlas](https://www.mongodb.com/es/ cloud/atlas/lp/try4?utm_ad_campaign_id=19647047924&  adgroup=148795219147&cq_cmp=19647047924&gad_source=1)
    - Press: Visit MongoDB Atlas 
      - Database: Create a Database / Build your Database 
      - Free
      - Credentias:
        - Username 
        - Password 
      - Deploy Database 
      - Press Connect button
        - Select connect to Cluster 
          - Select your driver and version
            - Driver: Node.js 
            - Version: 5.5 or later 
          - Install your driver 
            - It is recomended to use mongodb, we are using   mongose
          - Add your connection string into your application
            - Copy this connection string.
    - **Conect Back-End to MongoDB**
      - Create a new .env file.
        ```js
          DB_CONNECTION_STRING=myDBConnectionString
          ACCESS_TOKEN_SECRET=myAccessToken
          REFRESH_TOKEN_SECRET=myRefreshToken
        ```

        - To generate secure Tokens, you can go to [Online UUID Generator](https://www.uuidgenerator.net/)
      - Generate a new conection 
        - Into App.js create a new function.
          ```js
            ....
            app.use(express.json())

            async function main () {
              await mongoose.connect(process.env.DB_CONNECTION_STRING)
              console.log('Connected to MongoDB')
            }

            main().catch(console.error)

            app.use('/api/signup', require('./routes/signup'))
            ....
          ```
      - **Generate a new user** 
        - Create a new Schema 
          - Create a new file into "./schema/user.js"
            ```js
              const Mongoose = require('mongoose')
              const bcrypt = require('bcrypt')

              const UserSchema = new Mongoose.Schema({
                id: { type: Object },
                username: { type: String, required: true, unique: true },
                password: { type: String, required: true },
                name: { type: String, required: true }
              })

              UserSchema.pre('save', function (next) {
                if (this.isModified('password') || this.isNew) {
                  const document = this

                  bcrypt.hash(document.password, 10, (err, hash) => {
                    if (err) {
                      next(err)
                    } else {
                      document.password = hash
                      next()
                    }
                  })
                } else {
                  next()
                }
              })

              UserSchema.methods.usernameExists = async function (username) {
                const result = await Mongoose.model('User').find({ username })
                return result.length > 0
              }

              UserSchema.methods.isCorrectPassword = async function (password, hash) {
                console.log(password, hash)
                const same = await bcrypt.compare(password, hash)

                return same
              }

              module.exports = Mongoose.model('User', UserSchema)
            ```
        - Update "signup.js" to create a new user. 
          ```js
            ....
            const User = require('../schema/user')
            /*  now it is a async function*/
            router.post('/', async (req, res) => {
              ....

              // crear usuario.
              try {
                const user = new User()
                const userExists = await user.usernameExists(username)
                if (userExists) {
                  return res.status(409).json(
                    jsonResponse(409, {
                      error: 'Username already exists'
                    })
                  )
                } else {
                  const newUser = new User({ username, name, password })

                  newUser.save()

                  res
                    .status(200).json(
                      jsonResponse(200, {
                        message: 'User created successfully'
                      })
                    )
                  // res.send('signup')
                }
              } catch (error) {
                return res.status(500).json(
                  jsonResponse(500, {
                    error: 'Error creating user'
                  })
                )
              }
            })
            ....
          ```

  - **Generate Tokens**
    - Create a new method to getUserInfo into file libs/getUserInfo.js . 
      ```js
        function getUserInfo (user) {
          return {
            username: user.username,
            name: user.name,
            id: user.id || user._id
          }
        }

        module.exports = getUserInfo
      ```
    - Create a new Schema named token into file schema/token.js . 
      ```js
        const Mongoose = require('mongoose')

        const TokenSchema = new Mongoose.Schema({
          id: { type: Object },
          token: { type: String, required: true }
        })

        module.exports = Mongoose.model('Token', TokenSchema)
      ```
    - Create a new methods to generate tokens into file auth/sign.js . 
      ```js
        const jwt = require('jsonwebtoken')
        require('dotenv').config()

        function sign (payload, isAccessToken) {
          console.log('payload', payload)
          return jwt.sign(
            payload,
            isAccessToken
              ? process.env.ACCESS_TOKEN_SECRET
              : process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: 3600,
              algorithm: 'HS256'
            }
          )
        }

        // Función para generar un token de acceso utilizando jsonwebtoken
        function generateAccessToken (user) {
          return sign({ user }, true)
        }
        function generateRefreshToken (user) {
          return sign({ user }, false)
        }

        module.exports = { generateAccessToken, generateRefreshToken }
      ```
    - Create two new methods into User.js Schema. 
      ```js
        ....
        const { generateAccessToken, generateRefreshToken } = require('../auth/sign')
        const getUserInfo = require('../libs/getUserInfo')
        const Token = require('../schema/token')

        ....


        UserSchema.methods.createAccessToken = function () {
          return generateAccessToken(getUserInfo(this))
        }

        UserSchema.methods.createRefreshToken = async function () {
          const refreshToken = generateRefreshToken(getUserInfo(this))

          console.error('refreshToken', refreshToken)

          try {
            await new Token({ token: refreshToken }).save()
            console.log('Token saved', refreshToken)
            return refreshToken
          } catch (error) {
            console.error(error)
            // next(new Error("Error creating token"));
          }
        }

        // module.exports = Mongoose.model('User', UserSchema)

        const MyUserModel = Mongoose.models.User || Mongoose.model('User', UserSchema)
        module.exports = MyUserModel
      ```
    - Update login.js . 
      ```js
        ....
        const User = require('../schema/user')
        const { jsonResponse } = require('../libs/jsonResponse')
        const getUserInfo = require('../libs/getUserInfo')

        router.post('/', async (req, res) => {
          const { username, password } = req.body

          if (!username || !password) {
            return res.status(400).json(jsonResponse(400, {
              error: 'Fields are required'
            }))
          }

          try {
            let user = new User()
            const userExists = await user.usernameExists(username)

            if (userExists) {
              user = await User.findOne({ username })

              const passwordCorrect = await user.isCorrectPassword(
                password,
                user.password
              )

              if (passwordCorrect) {
                const accessToken = user.createAccessToken()
                const refreshToken = await user.createRefreshToken()

                console.log({ accessToken, refreshToken })

                return res.json(
                  jsonResponse(200, {
                    accessToken,
                    refreshToken,
                    user: getUserInfo(user)
                  })
                )
              } else {
                // res.status(401).json({ error: "username and/or password incorrect" });

                return res.status(401).json(
                  jsonResponse(401, {
                    error: 'username and/or password incorrect'
                  })
                )
              }
            } else {
              return res.status(401).json(
                jsonResponse(401, {
                  error: 'username does not exist'
                })
              )
            }
          } catch (err) {
            console.log(err)
          }
        })
        module.exports = router

      ```

- **Front-End:**
  - **Work with access and refresh tokens**
    - Access token must not be saved, it must be in memory (1.37.00), it is active during time our tab's browser is open.
    - Refresh Token there are some alternatives we are going to save it in localStorage.

[⏪(Back to top)](#table-of-contents)
