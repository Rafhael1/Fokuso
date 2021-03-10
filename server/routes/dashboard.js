const router = require("express").Router();
const pool = require("../db");
const authorization = require('../middleware/authorization');

 // all todos and name
router.get('/alltodos', authorization, async(req,res) => {
    try {
        const user = await pool.query(
            // add notes
            "SELECT users.user_name, workspace_todo.todo_id, workspace_todo.description  FROM users LEFT JOIN workspace_todo ON users.user_id = workspace_todo.user_id WHERE users.user_id = $1",
         [req.user.id]
         );

        res.json(user.rows)

    } catch (error) {
        console.log(error.message)
        res.status(500).json("Server Error")
    }
})

// all notes
router.get('/notes', authorization, async(req,res) => {
    try {
        
        //res.json(req.user)

        const user = await pool.query(
            // add notes
            "SELECT users.user_name, notes.note_id, notes.description  FROM users LEFT JOIN notes ON users.user_id = notes.user_id WHERE users.user_id = $1",
         [req.user.id]
         );

        res.json(user.rows)

    } catch (error) {
        console.log(error.message)
        res.status(500).json("Server Error")
    }
})

// create a todo
router.post("/todos", authorization, async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO workspace_todo (user_id, description) VALUES($1, $2) RETURNING *",
        [req.user.id ,description]
      );
  
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
// update a todo

router.put("/todos/:id", authorization, async(req,res) => {
    try {
        const { id } = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            "UPDATE workspace_todo SET description = $1 WHERE todo_id = $2 AND user_id = $3", 
        [description, id, req.user.id]
        );

        if(updateTodo.rows.length === 0) {
            return res.json("this todo ain't no yours")
        }

        res.json("Todo was updated");
    } catch (error) {
        console.log(error.message)
    }
})

// delete a todo
router.delete("/todos/:id", authorization, async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM workspace_todo WHERE todo_id = $1 AND user_id = $2",
         [id, req.user.id]);

         if(deleteTodo.rows.length === 0) {
             return res.json("This todo is not yours!")
         }

        res.json("Todo Deleted")

    } catch (error) {
        console.log(error.maessage)
    }
})

// create a note
router.post("/notes", authorization, async (req, res) => {
    try {
      const { description } = req.body;
      const newNote = await pool.query(
        "INSERT INTO notes (user_id, description) VALUES($1, $2) RETURNING *",
        [req.user.id ,description]
      );
  
      res.json(newNote.rows[0]);

    } catch (err) {
      console.error(err.message);
    }
  });
// update a note
router.put("/notes/:id", authorization, async(req,res) => {
    try {
        const { id } = req.params;
        const {description} = req.body;
        const updateNote = await pool.query(
            "UPDATE notes SET description = $1 WHERE note_id = $2 AND user_id = $3", 
        [description, id, req.user.id]
        );

        if(updateNote.rows.length === 0) {
            return res.json("this note ain't no yours")
        }

        res.json("Note was updated");
    } catch (error) {
        console.log(error.message)
    }
})
// delete a note
router.delete("/notes/:id", authorization, async(req, res) => {
    try {
        const { id } = req.params;
        const deleteNote = await pool.query("DELETE FROM notes WHERE note_id = $1 AND user_id = $2",
         [id, req.user.id]);

         if(deleteNote.rows.length === 0) {
             return res.json("This todo is not yours!")
         }

        res.json("Note Deleted")

    } catch (error) {
        console.log(error.maessage)
    }
})



module.exports = router;

