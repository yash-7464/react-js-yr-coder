import { useState } from "react";

function createInitalTodos(){
    const initalTodo = [];
    for(let i=0; i < 10; i++){
        initalTodo.push({
            id:i,
            text: "Item" + (i + 1)
        });
    }
    return initalTodo;
}

export default function PassingInialValuelFun(){
    const [todos, setTodods] = useState(createInitalTodos);
    const [text, setText ] = useState('');

    return(
        <>
            <input 
                placeholder="Add Todo"
                value={text}
                onChange={(e) =>
                    setText (e.target.value)
                } 
                className="bg-neutral-50 border-2 p-1 rounded-md border-cyan-900"    
            />
            <button 
                className="m-2 border-2 p-1 border-cyan-900 rounded-md font-bold shadow-md"
                onClick={() => {        
                    setText('');
                    setTodods([{
                        id: todos.length,
                        text: text
                    },...todos]);
                }}
            
            >Add</button>
            <ul>
                {todos.map(item => (
                    <li key={item.id}>
                        {item.text}
                    </li>
                ))}
            </ul>
        </>
    )
}