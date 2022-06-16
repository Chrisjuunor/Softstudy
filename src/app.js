const express = require("express");
require("./db/mongooseConfig")
const cors = require("cors");
const  usersRouter = require("./routers/users.router")
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users",usersRouter)
module.exports = app;
