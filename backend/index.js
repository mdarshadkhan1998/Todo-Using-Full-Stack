const express = require("express")
const cors = require("cors")
const app = express();
const fs = require("fs")
app.use(cors())

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// [[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[== GET, POST, DELETE, PUT ==]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] //

//GET TODO
app.get("/",(req,res)=>{
    // console.log(req.body)
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data)=>{
        const parsed = JSON.parse(data)
        console.log("get - parsed part", parsed.todos)
        res.status(201).send("Todo List Displayed");
    })
})

//POST TODO
app.post("/",(req,res)=>{
    // console.log(req.body)
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data)=>{
        const parsed = JSON.parse(data)
        parsed.todos = [...parsed.todos, req.body];
        console.log("post - parsed part", parsed.todos)
        fs.writeFile("./db.json", JSON.stringify(parsed), { encoding: "utf-8" },(err,data) => {
            res.status(201).send("Todo Created");
          }
        );
    })
})

//DELETE TODO
app.delete("/:id", (req, res)=>{
    const {id} = req.params;
    // console.log(req)
    // res.send("DELETE Request called")
    fs.readFile("./db.json",{encoding:"utf-8"},(err,data)=>{
        const parsed = JSON.parse(data)
        parsed.todos = parsed.todos.filter((el)=> el.id!=id);
        console.log("parsed part", parsed.todos)
        fs.writeFile("./db.json", JSON.stringify(parsed),"utf-8",()=>{
            res.status(201)
            res.end("Todo Deleted");
          }
        )
    })
})

//PUT TODO
app.put("/:id",(req,res)=>{
    const {id} = req.params;
    // console.log(req.body.todo)
    fs.readFile("./db.json", {encoding:"utf-8"}, (err,data)=>{
        const parsed = JSON.parse(data);
        var update = parsed.todos.map((el)=> {
            if(el.id==id)
            {
                var UpdatedPart = {
                    id: req.body.id, 
                    todo: req.body.todo
                }
                return UpdatedPart
            }
            return el
        });
        console.log(update);
        parsed.todos = [...update];
        fs.writeFile("./db.json", JSON.stringify(parsed), { encoding: "utf-8" },(err,data) => {
            res.status(201).send("Todo Updated");
          }
        );
    })
})



// app.get('/tasks',(req,res)=>{
//     res.status(201).send("list of all the tasks")
// })

// app.get('/add',(req,res)=>{
//     res.status(201).send("Added Task")
// })

// app.get('/delete',(req,res)=>{
//     res.status(201).send("Deleted Task")
// })


const PORT = process.env.PORT || 8080
// const PORT = 8080
app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})