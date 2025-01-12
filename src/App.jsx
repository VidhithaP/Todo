import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  


  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handleDelete=(e,id)=>{
    let index= todos.findIndex(item=>{
      return item.id==id;
    })
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos)
    saveToLS()
    

  }

  const handleAdd=()=>{
    setTodos([...todos, {id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    console.log(todos)
    saveToLS()
  }

  const handleChange= (e)=>{ 
    setTodo(e.target.value)
    
  }

  const handleCheckbox=(e)=>{
    let id=e.target.name
    let index= todos.findIndex(item=>{
      return item.id==id;
    })
    let newTodos=[...todos]
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
    <Navbar/>
      <div className='container bg-slate-200 my-5 rounded-xl p-4 mx-auto min-h-[80vh] md:w-1/2'>
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className='addtodo font-bold text-lg my-5 flex flex-col gap-4'>
          <h2>Add your todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='className= w-full rounded-full px-5 py-1 font-normal'/>
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-slate-900 font-semibold hover:bg-slate-950 p-2 py-1 text-sm  text-white rounded-lg mx-1 hover:font-bold'>Add</button>

        </div>
        <input onChange={toggleFinished} type='checkbox' checked={showFinished} /> Show Finished
        <h2 className='font-bold text-lg flex justify-center'>Your Todos</h2>
        <div className='todos'>
          {todos.length==0 && <div>No todos to display</div>}
          {todos.map(item=>{
          return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex justify-between md:w-1/2 space-y-4'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            <div className='buttons flex h-full'>
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-slate-800 hover:bg-slate-900 p-2 py-1 text-sm font-semibold text-white rounded-md mx-1 hover:font-normal' >Edit</button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-slate-800 hover:bg-slate-900 p-2 py-1 text-sm font-semibold text-white rounded-md mx-1 hover:font-normal'>Delete</button>
            </div>
          </div>
          })}
        </div>
        
      </div>
    </>
  )
}

export default App
