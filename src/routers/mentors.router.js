const router = require("express").Router();
const mentorsAuth =require("../middleware/mentorsAuth")
const mentorsController = require("../controllers/mentorsController");

router.post("/sign-up", mentorsController.create);
router.post("/login", mentorsController.login);
router.post("/logout", mentorsAuth,mentorsController.logout);
router.post("/logoutAll", mentorsAuth,mentorsController.logoutAll);
router.patch("/update/:id", mentorsAuth,mentorsController.update);
router.post("/change-password/:id", mentorsAuth, mentorsController.changePassword);
router.post("/forgot-password", mentorsAuth, mentorsController.forgotPassword);
router.post("/reset-password/:id/:token", mentorsAuth, mentorsController.resetPassword);

module.exports = router;
