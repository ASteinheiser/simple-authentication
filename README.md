# simple-authentication
A simple authentication app made with Express & Node.js

## Install & Run
### In one tab, run your MongoDB instance:
```
brew install mongodb
mongod
```
### In another tab, run your server:
```
npm install
npm start
```
### In a third tab, test the endpoints:
#### Register user (Returns an auth token)
```
curl -X POST -d '{"newEmail":"example@email.com", "password":"asdf"}' --header "Content-Type: application/json" --header "Accept: application/json" localhost:3000/auth
```
#### Login user (Returns an auth token)
```
curl -X POST -d '{"email":"example@email.com", "password":"asdf"}' --header "Content-Type: application/json" --header "Accept: application/json" localhost:3000/auth
```
#### Get user (Returns user.email)
```
curl -X GET -d '{"token": "some-token"}' --header "Content-Type: application/json" --header "Accept: application/json" localhost:3000/user
```
#### Update user (Returns success or error)
```
curl -X POST -d '{"token": "some-token", "newPassword": "new-password"}' --header "Content-Type: application/json" --header "Accept: application/json" localhost:3000/user
```
#### Delete user (Returns nothing or error)
```
curl -X DELETE -d '{"token":"some-token"}' --header "Content-Type: application/json" --header "Accept: application/json" localhost:3000/user
```
