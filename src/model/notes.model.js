const { string } = require("joi");
const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title:{
        type: String,
        required: true

    },
    content: {
        type: String,
        required: true
    },
    learnerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;