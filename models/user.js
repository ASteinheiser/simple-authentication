var bcrypt = require('bcrypt')
var mongoose = require('mongoose')

var UserModel = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
})

UserModel.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    user.password = hash
    next()
  })
})

UserModel.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) return callback(err)
      else if (!user) return callback(new Error('User not found'))

      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) return callback(null, user)
        else return callback()
      })
    })
}

var User = mongoose.model('User', UserModel)

module.exports = User
