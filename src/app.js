const express = require("express");
require("./db/mongooseConfig")
const cors = require("cors");
const  usersRouter = require("./routers/users.router")
const mentorsRouter = require("./routers/mentors.router")
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users",usersRouter)
app.use("/mentors", mentorsRouter);
module.exports = app;
