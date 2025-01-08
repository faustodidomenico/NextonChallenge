const express = require("express");
const myEval = require("./src/calculator");

const app = express();

const port = 2000;

app.use(express.json());

app.post("/calculator", (req, res) => {
  const { expression } = req.body;
  let result = myEval(expression);
  res.status(200).send(String(result));
});

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
