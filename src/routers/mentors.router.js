const router = require("express").Router();
const mentorsAuth =require("../middleware/mentorsAuth")
const mentorsController = require("../controllers/mentorsController");
const {imgUpload} = require("../utils/uploadFiles");

router.post("/sign-up", mentorsController.create);
router.post("/login", mentorsController.login);
router.post(
  "/me/profile-img",
  mentorsAuth,
  imgUpload.single("profileImg"),
  mentorsController.addProfileImg
);
router.get("/me/profile-img", mentorsAuth, mentorsController.getProfileImg);
router.delete("/me/profile-img", mentorsAuth, mentorsController.removeProfileImg);
router.post("/me/logout", mentorsAuth,mentorsController.logout);
router.post("/me/logout-all", mentorsAuth,mentorsController.logoutAll);
router.patch("/me/update", mentorsAuth,mentorsController.update);
router.post("/me/change-password", mentorsAuth, mentorsController.changePassword);
// router.post("/forgot-password", mentorsAuth, mentorsController.forgotPassword);
// router.post("/reset-password/:id/:token", mentorsAuth, mentorsController.resetPassword);

module.exports = router;
