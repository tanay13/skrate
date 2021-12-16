import * as dotenv from "dotenv";

dotenv.config();

import * as shell from "shelljs";

import bodyParser from "body-parser";
import express from "express";
import path from "path";

import connectDB from "../config/database";

import user from "./routes/api/user";

import meeting from "./routes/api/meeting";

const app = express();

// Connect to MongoDB
connectDB();

shell.cp("-R", "/views", "dist/");

// Setting the view engine
app.set("view engine", "ejs");
// Setting for the root path for views directory
app.set("views", path.join(__dirname, "views"));

// Express configuration
app.set("port", process.env.PORT || 5000);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.render("index");
});
app.use("/api/users", user);
app.use("/api/meetings", meeting);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
