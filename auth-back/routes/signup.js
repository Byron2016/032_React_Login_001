const router = require('express').Router()
const { jsonResponse } = require('../libs/jsonResponse')
const User = require('../schema/user')

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!username || !name || !password) {
    return res.status(400).json(jsonResponse(400, {
      error: 'Fields are required'
    }))
  }

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

module.exports = router
