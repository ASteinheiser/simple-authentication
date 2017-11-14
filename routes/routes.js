var express = require('express')
var User = require('../models/user')

var router = express.Router()

// Register or Login user
router.post('/auth', function (req, res, next) {
  // Register
  if (req.body.newEmail && req.body.password) {
    User.create({
      email: req.body.newEmail,
      password: req.body.password
    },
    function (err, user) {
      if (err) return res.status(500).send({error: err.message})

      else {
        req.session.userId = user._id
        return res.status(201).send({token: req.session.userId})
      }
    })
  // Login
  } else if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {

      if (error || !user) return next(new Error('Wrong email or password'))
      else {
        req.session.userId = user._id
        return res.status(200).send({token: req.session.userId})
      }
    })
  }
  else return res.status(400).send({error: 'Request expects: { email/newEmail: string, password: string }'})
})

// Get the user
router.get('/user', function (req, res, next) {
  if (req.body.token) {
    User.findById(req.body.token)
      .exec(function (error, user) {
        if (error) return next(error)
        else return res.status(200).send({ email: user.email })
      })
  }
  else return res.status(400).send({error: 'Request expects: { token: string }'})
})

// Update the user
// router.post('/user', function (req, res, next) {
//   return res.status(201).send('POST user')
// })

// Delete the user
// router.delete('/user', function (req, res, next) {
//   return res.status(204).send('DELETE user')
// })

module.exports = router
