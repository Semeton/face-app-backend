const express = require("express");
// import express from "express";
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "semetonbalogun",
    password: "",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

// Sign in
app.post("/signin", signin.handleSign(db, bcrypt));

// Register
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// Get user profile
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

// Image counter endpoint
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
