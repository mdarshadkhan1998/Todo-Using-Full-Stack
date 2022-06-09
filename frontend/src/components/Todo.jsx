import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import axios from "axios"
const Todo = () => {
    const [text, setText] = useState("")
    const [todo, setTodo] = useState([]);

    const handleText = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(text)
        const a = {
            id:uuid(),
            todo:text
        }
        setText("");  
        axios.post("http://localhost:8080",a).then(getTodo)
    }
    
    //ADD 
    const getTodo =()=>{
        axios.get("http://localhost:8080").then(function (response) {
        // console.log(...response.data.todos);
        setTodo([...response.data.todos]);
        }); 
    }
    useEffect(()=>{
        getTodo()
    },[])

    
    //COMPLETE
    const handleComplete = (e) => {
        const b = {
            id:e.id,
            todo:`${e.todo} ===> Completed`
        }
        axios.put(`http://localhost:8080/${e.id}`,b).then(getTodo);
    }
 
    //DELETE
    const handleDelete = (e) => { 
        // console.log(e)
        axios.delete(`http://localhost:8080/${e.id}`).then(getTodo) 
        // console.log(e)
    }

    return (
        <div>
            <h2>TODO LIST</h2>
            <form onSubmit={handleSubmit}>
                <div className='ui input'>
                    <input value={text} type="text" placeholder='Enter the todo here' onChange={handleText} />
                </div>
                <button className='ui primary button basic' type='submit' onClick={handleSubmit}>Submit</button>
            </form>
            {
                todo.map((e) => {
                    return <div key={e.id} >
                        <div className="ui cards">
                            <div className="card">
                                <div className="content">
                                    <div className="header">
                                        {e.todo}
                                    </div>
                                </div>
                                <div className="extra content">
                                    <div className="ui two buttons">
                                        <div className="ui basic green button" onClick={()=>handleComplete(e)}>Completed</div>
                                        <div className="ui basic red button" onClick={()=>handleDelete(e)}>Delete</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Todo