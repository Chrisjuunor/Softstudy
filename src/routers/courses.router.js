const router = require("express").Router();
const mentorsAuth = require("../middleware/mentorsAuth");
const courseController = require("../controllers/courseController");
const { imgUpload } = require("../utils/uploadFiles");

router.post("/", mentorsAuth,courseController.create);
router.get("/", courseController.getAll);
router.get("/:_id", courseController.getOne);
router.get("/:_id/banner", courseController.getBanner);
router.post("/:_id/banner",mentorsAuth,imgUpload.single("banner"),
  courseController.uploadBanner);

module.exports = router;
