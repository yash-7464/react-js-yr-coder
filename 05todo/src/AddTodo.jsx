import { useState } from "react";

export default function AddTodo({onAddTodo}){
    const [title, setTitle] = useState('');

    return(
        <div>
            <input 
                placeholder="Add Todo"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                } 
                className="bg-neutral-50 border-2 p-1 rounded-md border-cyan-900"    
            />
            <button 
                className="m-2 border-2 p-1 border-cyan-900 rounded-md font-bold shadow-md"
                onClick={()=>{
                    setTitle('');
                    onAddTodo(title);
                }}
            >Add</button>
        </div>
    )
}