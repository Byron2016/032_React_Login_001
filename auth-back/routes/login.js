const router = require('express').Router()
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
