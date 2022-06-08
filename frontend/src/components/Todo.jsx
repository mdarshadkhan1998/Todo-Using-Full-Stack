import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
const Todo = () => {
    const [text, setText] = useState("")
    const [todo, setTodo] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(text)
        setTodo([...todo, text])
        setText("")
    }
    const handleText = (e) => {
        setText(e.target.value)
    }
    const handleComplete = (e) => {
        console.log(e)
        
        // setTodo([...text,e])
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
                    return <div key={uuid()} >
                        <div className="ui cards">
                            <div className="card">
                                <div className="content">
                                    <div className="header">
                                        {e}
                                    </div>
                                </div>
                                <div className="extra content">
                                    <div className="ui two buttons">
                                        <div className="ui basic green button" onClick={()=>handleComplete(e)}>Completed</div>
                                        <div className="ui basic red button">Delete</div>
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