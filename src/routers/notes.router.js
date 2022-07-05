const router = require("express").Router();
const notesController = require("../controllers/notesController");
const learnerAuth = require("../middleware/learnersAuth")

//create note
router.post("/notes", learnerAuth, notesController.create);

//get all notes
router.get("/notes", learnerAuth, notesController.findAll);

//get single note
router.get("/notes/:note_id", learnerAuth, notesController.findOne);

//update note
router.patch("/notes/:note_id", learnerAuth, notesController.update);

//delete note
router.delete("/notes/:note_id", learnerAuth, notesController.delete);

module.exports = router;