const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req body

//Routes


//create a todo

app.post("/todos", async(req,res) => {
    try {
        console.log(req.body)
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO workspace_todo(description) VALUES('shit') RETURNING * FROM workspace_todo", 
        [description]
        );

        res.json(newTodo.rows[0]);


    } catch (err) {
        console.log(err.message)
    }
});


//get all todos

app.get("/todos", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows)

    } catch (err) {
        console.log(err.message)
    }
});

//get a todo

app.get("/todos/:id", async(req,res) => {
    try {
        console.log(req.params);
        const todo = await pool.query("SELECT * FROM workspace_todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0])

    } catch (error) {
        console.log(error.message)
    }
})

//update a todo

app.put("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE workspace_todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated");
    } catch (error) {
        console.log(error.message)
    }
})


//delete a todo


app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM workspace_todo WHERE todo_id = $1", [id]);

        res.json("Todo Deleted")

    } catch (error) {
        console.log(error.maessage)
    }
})



app.listen(5000, () => {
    console.log("Server has started on http://localhost:5000")
});