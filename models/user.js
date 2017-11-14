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

var User = mongoose.model('User', UserModel)

module.exports = User
