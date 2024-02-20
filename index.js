require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

//database
mongoose.connect(mongoString);
const database = mongoose.connection;

//throw a success or an error message
database.on("error", (error) => {
  console.log("error");
});

database.once("connected", () => {
  console.log("database connected ");
});

//express
const app = express();
app.use(express.json());

const routes = require("./routes/router");
app.use("/api", routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
