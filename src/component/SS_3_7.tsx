import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

const Todo = () => {
    const [todo, setTodo] = React.useState([""]);
    const [input, setInput] = React.useState("");
    return (
        <div className={"container d-flex flex-column align-items-center"}>
            <h1>Todo List</h1>
            <input type={"text"}
                   value={input}
                   placeholder={"Todo Name"}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       setInput(e.target.value)
                   }}/>
            <button onClick={() => setTodo([...todo, input])}>Add</button>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {
                    todo.map((todo, index) => (
                        <tr key={index}>
                            <td>{todo}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
export default Todo;