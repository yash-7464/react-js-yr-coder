import { useState } from "react";

export default function TaskList({todo, onChangeTodo, onDeleteTodo}) {
  return (
    <ul>
      {todo.map (todo => (
        <li key={todo.id}>
          <Task todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}


function Task({ todo, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    let todoContent;
    if (isEditing) {
        todoContent = (
            <>
                <input
                    value={todo.title}  
                    onChange={e => {
                        onChange({
                            ...todo,
                            title: e.target.value
                        });
                    }}
                    className="bg-neutral-50 border-2 p-1 rounded-md border-cyan-900"
                />
                <button onClick={() => setIsEditing(false)}
                    className=" border-2 p-1 border-cyan-900 rounded-md font-bold shadow-md">Save</button>
            </>
        );
    } else {
        todoContent = (
            <>
                {todo.title}
                <button onClick={() => setIsEditing(true)}
                    className=" border-2 p-1 border-cyan-900 rounded-md font-bold shadow-md"
                >Edit</button>
            </>
        );
    }

    return (
        <label htmlFor="">
            <input type="checkBox"
                checked={todo.done}
                onChange={(e) => {
                    onChange({
                        ...todo,
                        done: e.target.checked
                    });
                }}
            />
            {todoContent}
            <button onClick={() => onDelete(todo.id)}
                className="m-1 border-2 p-1 border-cyan-900 rounded-md font-bold shadow-md"
            >Delete</button>
        </label>
    )
}
