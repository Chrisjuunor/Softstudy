const express = require("express");
require("./db/mongooseConfig");
const cors = require("cors");
const swagger = require("./Docs/swagger")
const learnersRouter = require("./routers/learners.router");
const mentorsRouter = require("./routers/mentors.router");
const coursesRouter = require("./routers/courses.router");
const lessonsRouter = require("./routers/lessons.router");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/learners", learnersRouter);
app.use("/api/mentors", mentorsRouter);
app.use("/api/courses", coursesRouter);
app.use("/api", lessonsRouter);

swagger(app)
app.get("/", (req, res)=> {
  res.send({message: "API is working fine"})
})

app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .send({ status: "error", message: error.message });
});

module.exports = app;
