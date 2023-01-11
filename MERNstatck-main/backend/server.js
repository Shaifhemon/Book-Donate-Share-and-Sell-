const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const donateRouter = require("./routes/donate");
const requestRouter = require("./routes/request");
const sellRouter = require("./routes/sell");
const usersRouter = require("./routes/users");
const path = require("path");

mongoose.connect(
  "mongodb://localhost:27017/myLoginRegister",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);



app.use(express.json());

app.use("/api/donate", donateRouter);
app.use("/api/users", usersRouter);
app.use("/api/sell", sellRouter);
app.use("/api/request", requestRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
