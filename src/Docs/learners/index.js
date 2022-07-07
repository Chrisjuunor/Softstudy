const signUp = require("./signUp")
const login = require("./login")
const changePassword = require("./changePassword")
const update = require("./update");
const addProfileImg = require("./addProfileImg");
const getProfileImg = require("./getProfileImg");
const learners = {
  paths: {
    "/api/learners/sign-up": {
      ...signUp,
    },
    "/api/learners/login": {
      ...login,
    },
    "/api/learners/me/change-password": {
      ...changePassword,
    },
    "/api/learners/me/update": {
      ...update,
    },
    "/api/learners/me/profile-img": {
      ...addProfileImg,
    },
    "api/learners/me/profile-img":{
      ...getProfileImg
    }
  },
};

module.exports = learners;