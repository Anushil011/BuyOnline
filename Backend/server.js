require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const HttpError = require("./models/http-error");

const app = express();
const port = process.env.PORT || 5000;

/********** middleware ******************/
app.use(express.json());
app.use(cors({origin:"http://localhost:3000",credentials:true}));
// app.use(express.json());
app.use(session({
  secret:"process.env.SECRET",
  resave:true,
  saveUninitialized:true
}))

app.use(cookieParser("process.env.SECRET"));

app.use(passport.initialize());
app.use(passport.session());
require("./models/passportConfig")(passport);
/********** routes ******************/
app.use("/store", productRoutes);
app.use("/users", userRoutes);

/*********** handling error for not existing route *********/
app.use((req, res, next) => {
  const error = new HttpError("Cannot get the route", 404);
  throw error;
});

/*********** handling error for unknown errors **********/
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

/****************  connect to mongoDB  *****************/
mongoose
  .connect("mongodb://localhost:27017/storeProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("server running on port 5000");
    });
  })
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection is established successfully");
});
