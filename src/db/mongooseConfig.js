const mongoose = require("mongoose");
const { MONGODB_URL } = require("../utils/secrets");

mongoose.connect(process.env.MONGODB_DEV, { useNewUrlParser: true }, (error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Database connected!");
  }
});
