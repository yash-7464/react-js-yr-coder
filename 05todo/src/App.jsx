import { useState } from 'react'
import AddTodo from './AddTodo'
import TaskList from './TaskList';
import PassingInialValuelFun from './PassingInialValuelFun';
import './App.css'

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];
function App() {
  const [todo, setTodo] = useState(initialTodos)

  function handleAddTodo(title){
    setTodo([
      ...todo,
      {
        id : nextId++,
        title : title,
        done: false
      }
    ]);
  }

  function handleChangeTodo(nextTodo){
    setTodo(todo.map(t => {
      if(t.id === nextTodo.id){
        return nextTodo;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTodo(todoId){
    setTodo(
        todo.filter(t => t.id !== todoId)
    );    
  }

  return (
    <>
    <div className='w-full max-w mx-auto shadow-md rounded-sm text-orange-600 bg-slate-400'>
        <h1 className='text-white m-4 p-2 font-bold'>Todo App</h1>
    </div>
    <div className="bg-neutral-50 border-2 p-1 rounded-md border-cyan-900 my-4">
        <AddTodo
          onAddTodo={handleAddTodo}
        />
        <TaskList
          todo={todo}
          onChangeTodo={handleChangeTodo}
          onDeleteTodo={handleDeleteTodo}
        />
    </div>
    <div className="bg-neutral-50 border-2 p-1 rounded-md border-cyan-900">
        <PassingInialValuelFun />
    </div>
    </>
  )
}

export default App
