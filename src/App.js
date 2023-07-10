
import React,{useState}from 'react'
import "./App.css"

function App() {
  const [todo,settodo] = useState("");
  const [todos,settodos] = useState([])
  const [editid,seteditid] = useState(0)

  const handlesubmit=(e)=>{
    e.preventDefault()

    if(editid){
      const edittodo = todos.find((i)=>i.id === editid)
      const updatedtodos = todos.map((t)=>
      t.id ===edittodo.id 
      ?(t={id:t.id,todo})
      : {id: t.id, todo: t.todo}
      )
      settodos(updatedtodos)
      seteditid(0)
      settodo("")
      return;

    };
    

    if(todo !== ""){
      settodos([{id: `${todo}-${Date.now()}`,todo},...todos])
      settodo(" ")
    }
  };

  const handledelete=(id)=>{
    const deletetodo = todos.filter((to)=>to.id !== id)
    settodos([...deletetodo])
  };

  const handleedit =(id)=>{
    const edittodo = todos.find((i)=> i.id === id)
    settodo(edittodo.todo);
    seteditid(id)
  }

  
  return (
    <div className='App'>
      <div className='container'>
        <h1>TODO LIST APP</h1>
        <form className='todo-form' onSubmit={handlesubmit}>
          <input type="text" value={todo}onChange={(e)=>settodo(e.target.value)}/>
          <button type='submit'>{editid?"EDIT":"GO"}</button>
        </form>
        <ul>
          {
            todos.map((t)=>(
              <li>
            <span className='span' key={t.id}>{t.todo}</span>
            <button onClick={()=>handleedit(t.id)}><b>EDIT</b></button>
            <button onClick={()=>handledelete(t.id)}><b>DELETE</b></button>
           </li>

            ))
          }
          
        </ul>

      </div>
      

    </div>
  )
}

export default App