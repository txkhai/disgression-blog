const express = require("express");
const app = express();
// const formidableMiddleware = require("express-formidable");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categories");

dotenv.config();
app.use(express.json());
// app.use(formidableMiddleware());

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to MongoDB")).catch(err => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);

app.listen("5000", () => {
    console.log("Backend is running.");
});