const router = require("express").Router();
const learnersAuth = require("../middleware/learnersAuth");
const { imgUpload } = require("../utils/uploadFiles");
const learnerController = require("../controllers/learnerController");

router.post("/sign-up", learnerController.create);
router.post("/login", learnerController.login);
router.post(
  "/me/profile-img",
  learnersAuth,
  imgUpload.single("profileImg"),
  learnerController.addProfileImg
);
router.get("/me/profile-img", learnersAuth, learnerController.getProfileImg);
router.delete(
  "/me/profile-img",
  learnersAuth,
  learnerController.removeProfileImg
);
router.get("/me", learnersAuth, learnerController.getLearnerDetails);
router.post("/me/personality-test", learnersAuth, learnerController.addPersonalityTest);
router.post("/me/logout", learnersAuth, learnerController.logout);
router.post("/me/logout-all", learnersAuth, learnerController.logoutAll);
router.patch("/me/update", learnersAuth, learnerController.update);
router.patch("/me/change-password", learnersAuth, learnerController.changePassword);

module.exports = router;
