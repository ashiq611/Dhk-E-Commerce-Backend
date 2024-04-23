const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const UserRouter = require("./routers/userRouter");
const SeedRouter = require("./routers/seedRouter");



const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
});



app.use(xssClean());
app.use(rateLimiter);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/users", UserRouter);
app.use("/api/seed", SeedRouter);

app.get("/test", (req, res) => {
  res.status(200).send({
    message: "Tets api done",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});



// client error handler
app.use((req, res, next) => {
  
  next(createError(404, "Not Found"));
});

// server error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

module.exports = app;
