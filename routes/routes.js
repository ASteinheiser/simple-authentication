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

      if (error || !user) return res.status(401).send({ error: 'Invalid Email or Password.' })
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
        else if (!user) return res.status(401).send({ error: 'User not found.' })
        else return res.status(200).send({ user: { token: user._id, email: user.email } })
      })
  }
  else return res.status(400).send({error: 'Request expects: { token: string }'})
})

// Delete the user
router.delete('/user', function (req, res, next) {
  if (req.body.token) {
    User.findByIdAndRemove(req.body.token)
      .exec(function (error, user) {
        if (error) return next(error)
        else if (!user) return res.status(401).send({ error: 'User not found.' })
        else return res.status(204).send('User Deleted.')
      })
  }
  else return res.status(400).send({error: 'Request expects: { token: string }'})
})

// Update the user
router.post('/user', function (req, res, next) {
  if (req.body.token) {
    User.findById(req.body.token)
      .exec(function (error, user) {
        if (error) return next(error)
        else if (!user) return res.status(401).send({ error: 'User not found.' })
        else {
          if (req.body.newEmail) user.email = req.body.newEmail
          if (req.body.newPassword) user.password = req.body.newPassword
          user.save(function (err, updatedUser) {
            if (error) return next(error)
            return res.status(200).send({user: {id: updatedUser.id, email: updatedUser.email}})
          })
        }
      })
  }
  else return res.status(400).send({error: 'Request expects: { token: string }'})
})

module.exports = router
