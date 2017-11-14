var express = require('express')
var User = require('../models/user')

var router = express.Router()

// Register or login user
router.post('/auth', function (req, res, next) {

  if (req.body.newEmail && req.body.password) {
    User.create({
      email: req.body.newEmail,
      password: req.body.password
    }, function (err, user) {
      if (err) return res.status(500).send({error: err.message})

      else return res.status(200).send({ CreatedAccount: user.email })
    })
  } else {
    return res.status(400).send({error: 'Request expects: { email: string, password: string }'})
  }
})

// Get the user
router.get('/user', function (req, res, next) {
  return res.status(200).send('GET user')
})

// Update the user
router.post('/user', function (req, res, next) {
  return res.status(201).send('POST user')
})

// Delete the user
router.delete('/user', function (req, res, next) {
  return res.status(204).send('DELETE user')
})

module.exports = router
