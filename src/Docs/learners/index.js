const signUp = require("./signUp")
const login = require("./login")
const changePassword = require("./changePassword")
const learners = {
paths:{
  "/api/learners/sign-up":{
      ...signUp
  },
  "/api/learners/login":{
    ...login
  },
  "/api/me/learners/change-password":{
    ...changePassword
  }
}
}

module.exports = learners;