const express = require("express");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoutes");
const tagRoute = require("./routes/tagRoute");
const parkingSlotRoute = require("./routes/parkingSlotRoute");
const globalErrorHandler = require("./controllers/errorController");
const cors =require("cors");



const app = express();
app.use(cors());

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use("/api/v1/posts", postRoute);
app.use("/api/v1/tags", tagRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/status", parkingSlotRoute);

app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.render("home");
});

module.exports = app;
