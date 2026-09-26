const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

app.use(
  session({
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  const { name = "anonymous" } = req.query;
  req.session.name = name;

  if(name == "anonymous") {
    req.flash("error", "User not registered");
  } else {
    req.flash("success", "user registered successfully!");
  }

  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", {name: req.session.name });
});


// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }

//   res.send(`You sent a requext ${req.session.count} times`);
// });

app.get("/test", (req, res) => {
  res.send("test successful!");
});

// app.use(cookieParser("mysecret"));

// app.get("/getsignedcookie", (req, res) => {
//   res.cookie("made-in", "India", { signed: true});
//   res.send("signed cookie sent");
// });

// app.get("/verify", (req, res) => {
//   console.log(req.signedCookies);
//   res.send("verified");
// });

// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "namaste");
//   // res.cookie("name", "ATOrile");
//   res.send("sent you some cookies");
// });

// app.get("/greet", (req, res) => {
//   let { name = "anonymous" } = req.cookies;
//   res.send(`Hii ${name}`);
// });

// app.get("/", (req, res) => {
//   console.dir(req.cookies)
//   res.send("Hello. I am root");
// });

// app.use("/users", users);
// app.use("/posts", posts);

app.listen(3000, (req, res) => {
  console.log("server is listning on port 3000");
});
