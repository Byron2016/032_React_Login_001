const router = require('express').Router()
const { jsonResponse } = require('../libs/jsonResponse')

router.post('/', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json(jsonResponse(400, {
      error: 'Fields are required'
    }))
  }

  // autenticar usuario.
  res
    .status(200)
    .json(jsonResponse(200, {
      message: 'User Login successfully'
    }))
  // res.send('login')
})

module.exports = router
