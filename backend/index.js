const express = require("express")
const cors = require("cors")
const app = express();

app.use(cors())

app.get('/tasks',(req,res)=>{
    res.status(201).send("list of all the tasks")
})

app.get('/add',(req,res)=>{
    res.status(201).send("Added Task")
})

app.get('/delete',(req,res)=>{
    res.status(201).send("Deleted Task")
})

// const PORT = process.env.PORT || 8080
const PORT = 8080
app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})