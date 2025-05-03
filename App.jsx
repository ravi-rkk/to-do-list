import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Todo from './Components/Todo'
import CreateTodo from './Components/Create'
import UpdateTodo from './Components/Update'





function App() {
  const [count, setCount] = useState(0)
 

  return (
   
 <Routes>
  <Route path='/' element={<Todo/>}/>
  <Route path='/update/:id' element={<UpdateTodo/>}/>
  <Route path='/create' element={<CreateTodo/>}/>
  
 </Routes>

  )
}

export default App