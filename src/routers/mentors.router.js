const router = require("express").Router();

const mentorsController = require("../controllers/mentorsController");

router.post("/sign-up", mentorsController.create);
router.post("/login", mentorsController.login);
router.patch("/update/:id", mentorsController.update);
router.post("/change-password/:id", mentorsController.changePassword);
router.post("/forgot-password", mentorsController.forgotPassword);
router.post("/reset-password/:id/:token", mentorsController.resetPassword);

module.exports = router;
