const Note = require("../model/notes.model");

//create and save a note
exports.create = (req, res) => {
    console.log(req.learner)
//     check request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "field cannot be empty"
//         });
//    }
    //create note
    const note = new Note({
        learnerId: req.learner._id,
        title: req.body.title || "untitled note",
        content: req.body.content
    });
    //save note
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "an error occured"
        });
    });
}

//retrieve all notes
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "an error occured while retrieving notes"
        });
    });
}

//retrieve single note
exports.findOne =(req, res) => {
    Note.findById(req.params.note_id)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "note not found with id " + req.params.note_id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === "ObjectId") {
            return res.status(404).send({
                message: "note not found"
            });
        }
        return res.status(500).send({
            message: "error retrieving note with id " + req.params.note_id
        });
    });
}

//update a note
exports.update = (req, res) => {
    //check request
    if(!req.body.content) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }
    //fimd note and update by id
    Note.findByIdAndUpdate(req.params.note_id, {
        title: req.body.title || "untitled note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "note not found with id " + req.params.note_id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === "ObjectId") {
            return res.status(404).send({
                message: "note not found with id " + req.params.note_id
            });
        }
        return res. status(500).send({
            message: "error updating note with id " + req.params.note_id
        });
    });
}

//delete a note
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.note_id)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "note not found with id " + req.params.note_id
            });
        }
        res.send({message: "note deleted successfully!"});
    }).catch(err => {
        if(err.kind === "ObjectId" || err.name === "not found") {
            return res.status(404).send({
                message: "note not found with id " + req.params.note_id
            });
        }
        return res.status(500).send({
            message: "could not delete note with id " + req.params.note_id
        });
    });
}