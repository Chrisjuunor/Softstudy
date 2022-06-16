const router = require("express").Router();
const User = require("../model/user.model");

router.post("/sign-up", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ status: "success", message: "user created successfully!" });
});
router.post("/login", (req, res) => {
  res.send({ status: "success", message: "user created successfully!" });
});

module.exports = router;
