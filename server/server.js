const express = require("express");
const app = express();
const pool = require("./db");
const cors = require('cors')
app.use(cors());
//get all todos :
app.get("/todos/:userEmail", (req, res) => {
    const {userEmail} = req.params
    console.log(userEmail)
  try {
    const todos = pool.query('select * from todos where user_email = ?;',[userEmail] , (err, result) => {
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
