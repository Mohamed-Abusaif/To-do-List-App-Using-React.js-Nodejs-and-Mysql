const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
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

  try{
    const editTodo = pool.query(`update todos set user_email=" ${user_email}" ,title="${title}" , progress= "${progress}" , date = "${date}" where id = "${id}" ;`)
    res.json(editTodo)
  }
  catch(err){
    console.error(err)
  }
});

//delete todo 
app.delete("/todos/:id" , (req,res)=>{
  const {id} = req.params ;
  try{
    const deleteToDo =  pool.query(`delete from todos where id="${id}"`)
    res.json(deleteToDo)
  }
  catch(err){
    console.log(err)
  }
})

const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
