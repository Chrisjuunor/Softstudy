const signUp = require("./signUp");
const login = require("./login");
const changePassword = require("./changePassword");
const update = require("./update");
const addProfileImg = require("./addProfileImg");
const getProfileImg = require("./getProfileImg");
const addPersonalityTest = require("./addPersonalityTest");
const getLearnerDetails = require("./getLearnerDetails");
const logout = require("./logout");
const logoutAll = require("./logoutAll");
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
    "/api/learners/me/profile-img": {
      ...getProfileImg,
    },
    "/api/learners/me/personality-test": {
      ...addPersonalityTest,
    },
    "/api/learners/me": {
      ...getLearnerDetails,
    },
    "/api/learners/me/logout": {
      ...logout,
    },
    "/api/learners/me/logout-all": {
      ...logoutAll,
    },
  },
};

module.exports = learners;
