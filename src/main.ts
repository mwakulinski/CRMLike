import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("czy teraz dziaała");
  console.log("czy teraz dziaała");
  console.log(`Example app listening on port ${port}`);
});
