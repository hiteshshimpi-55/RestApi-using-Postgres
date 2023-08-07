const express = require('express');
const app = express();
const pool = require('./db');


app.use(express.json());

// create a todo
app.post('/todos', async(req, res) => {
    try{
        const {title,description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (title,description) VALUES ($1, $2) RETURNING *",[title, description]);
        console.log(req.body);
        res.status = 200;
        res.json(newTodo.rows[0]);
    }catch(error){
        res
        console.log(error);
    }
});
// delete a todo
app.delete('/todos/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await pool.query("DELETE FROM todo WHERE id=$1",[id])
        res.status = 200;
        res.json({
            "message":"Todo Deleted Successfully",
            "data":result.rows
        });
    }catch(error){
        res.status = 500;
        res.json({
            "error":err
        })
    }
});
// get all todos
app.get('/todos',async(req,res)=>{
    
    try{
        const todos = await pool.query("SELECT *FROM todo");
        res.status = 200;
        res.json({
            "message":"Data retrieved successfully",
            "data":todos.rows
        })
    }catch(err){
        res.status = 500;
        res.json({
            "error":err
        })
    }
});
// get a todo
app.get("/todos/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await pool.query("SELECT *FROM todo WHERE id = $1",[id]);
        res.status = 200;
        res.json({
            "message":"Todo Retrieved Successfully",
            "data":result.rows
        });
    }catch(error){
        res.status = 500;
        res.json({
            "error":err
        })
    }
});

// update a todo
app.put("/todos/:id",async(req,res) => {
    try{
        const {id} = req.params;
        const {description} = req.body;

        const result = await pool.query("UPDATE todo SET description = $1 WHERE id = $2",[description,id]);

        res.status = 200;
        res.json({
            "message":"Update successfull",
            "data":result
        });

    }catch(error){
        res.status = 500;
        res.json({
            "error":err
        })
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');  
});