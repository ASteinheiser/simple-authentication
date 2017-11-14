# simple-authentication
A simple authentication app made with Express & Node.js

## Install & Run
In one tab, run your MongoDB instance:
```
brew install mongodb
mongod
```
In another tab, run your server:
```
npm install
npm start
```
In a third tab, test the endpoints:
```
// Register
curl -X POST -d '{"newEmail":"example@email.com", "password":"asdf"}' --header "Content-Type: application/json" --header "Accept: application/json" localhost:3000/auth

// Login
curl -X POST -d '{"email":"example@email.com", "password":"asdf"}' --header "Content-Type: application/json" --header "Accept: application/json" localhost:3000/auth

// Get user
curl -X GET localhost:3000/user

// Update user
curl -X POST -d '{"oldPassword":"asdf", "newPassword":"ghjk"}' --header "Content-Type: application/json" --header "Accept: application/json" localhost:3000/user

// Delete user
curl -X DELETE -d '{"email":"example@email.com"}' --header "Content-Type: application/json" --header "Accept: application/json" localhost:3000/user
```
