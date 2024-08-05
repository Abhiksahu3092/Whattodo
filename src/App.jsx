import { useEffect, useState } from 'react'
import { Todoprovider } from './context/todocontext'
import './App.css'
import Todoform from './components/Todoform'
import TodoItem from './components/Todoitem'

function App() {
  const [todos, settodos] = useState([])

  const addtodo = (todo) => {
    settodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const edittodo = (id, todo) => {
    settodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)))
  }

  const deletetodo = (id) => {
    settodos((prev) => prev.filter((prevtodo) => prevtodo.id !== id))
  }

  const toggletodo = (id) => {
    settodos((prev) => prev.map((prevtodo) => prevtodo.id === id ? { ...prevtodo, id: id, completed: !prevtodo.completed } : prevtodo))
  }

  //to get access of todos array from the local storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      settodos(todos)
    }
  }, [])

  //to store the todos array into local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <Todoprovider value={{ todos, addtodo, edittodo, deletetodo, toggletodo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <Todoform />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  )
}

export default App
