const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

app.get("/", (req, res) => {
    res.send("Root here");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, (req, res) => {
  console.log("server is listning on port 3000");
});
