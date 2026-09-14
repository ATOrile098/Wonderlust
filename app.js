const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); //to serve static files

app.get("/", (req, res) => {
  res.send("Hii I am root !!");
});



app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


app.all("/*path", (req, res, next) => {
  next(new ExpressError(404, "Page not found!")); //it same as next(err);
});

//Custom Error Handling Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("app is listening to port 8080");
});
