const express = require("express");
const app = express();
const pool = require("./db");

//get all todos :
app.get("/todos", (req, res) => {
  try {
    const todos = pool.query("select * from todos", (err, result) => {
      if (err) throw err;
      console.log(result)
      res.send(result)
    });
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
