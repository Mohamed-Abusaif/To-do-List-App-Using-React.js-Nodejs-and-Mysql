const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
//get all todos :
app.get("/todos/:userEmail", (req, res) => {
  const { userEmail } = req.params;
  console.log(userEmail);
  try {
    const todos = pool.query(
      "select * from todos where user_email = ?;",
      [userEmail],
      (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

//create new todo
app.post("/todos", (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();
  try {
    const newTodo = pool.query(
      `insert into todos (id , user_email , title , progress , date) values ("${id}" , "${user_email}", "${title}" , "${progress}" , "${date}") `
    );
    res.json(newTodo);
  } catch (err) {
    console.log(err);
  }
});

//edit todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  try {
    const editTodo = pool.query(
      `update todos set user_email=" ${user_email}" ,title="${title}" , progress= "${progress}" , date = "${date}" where id = "${id}" ;`
    );
    res.json(editTodo);
  } catch (err) {
    console.error(err);
  }
});

//delete todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  try {
    const deleteToDo = pool.query(`delete from todos where id="${id}"`);
    res.json(deleteToDo);
  } catch (err) {
    console.log(err);
  }
});

//sign up
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const signup = pool.query(
      `insert into users (email,hashed_password) values("${email}" , "${hashPassword}")`
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail });
    }
  }
});

//login

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  try {
    const {_rows} = pool.query("select * from users where email=?" , [email]);
 
    if (!_rows.length) return res.json({ detail: "user does not exist" });
    const success = bcrypt.compare(password, users.rows[0].hashPassword);
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if (success) {
      res.json({ 'email': users.rows[0].email, token });
    }else 
    {
      res.json({detail: "login failed"})
    }
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
