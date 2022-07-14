import {useState, memo, useCallback, useMemo} from 'react'

/////////////////////////////////////////////////////////////////////////////////////////
function Todo(){
  /////// data and actions ///////////////////////////////////////////////////////////////
  console.log('Todo')
  const [todo,setTodo] = useState('')
  const [todos,setTodos] = useState([
    {
      todo:'Learn vue.js',
      isCompleted: false
    },{
      todo:'Learn React',
      isCompleted: false
    },{
      todo:'Learn Laravel',
      isCompleted: false
    }
  ])

  const inputTodo = (e) => {
    setTodo(e.target.value)
  }

  const addTodo = (e) => {
    e.preventDefault()
    setTodos(todos => [...todos,{ todo:todo, isCompleted:false }] )
  }

  const completeTodo = useCallback((index) => {
    console.log(index)
    let newTodos = todos.map((todo,todoIndex) => {
      if(todoIndex === index){
        todo.isCompleted = !todo.isCompleted
      }
      return todo
     })
     setTodos(newTodos)
  },[todos])

  const notCompleteTodos = useMemo( () => todos.filter(todo => {
    console.log('notComplete')
    return todo.isCompleted === false;
  }),[todos])

  ////////////////// render //////////////////////////////////////////////////////////
  return(
    <div>
      <form className='ml-4 mb-2' onSubmit={addTodo}>
        <span className='mr-3 mb-2'>追加:</span>
        <input type="text" onChange={inputTodo} value={todo}/>
      </form>
      <TodoList todos={notCompleteTodos} completeTodo={completeTodo}/>
    </div>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////
const TodoList = memo(({todos,completeTodo}) =>{
  console.log('TodoList')
  return(
    <ul className='flex flex-col'>
      { todos.map( (todo,index) => 
        <TodoItem 
          todo={todo} 
          key={index}
          index={index} 
          completeTodo={completeTodo}
        />
      )}
    </ul>
  )
})

/////////////////////////////////////////////////////////////////////////////////////////
const TodoItem = (({todo,index,completeTodo}) =>{
  console.log('TodoItem')
  return(
    <li className='mb-2' style={ todo.isCompleted === true ? {textDecorationLine: 'line-through'}:{}}>
      {todo.todo}
      <button className='h-12 ml-2 pr-2 pl-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 font-bold text-white shadow-lg shadow-yellow-200 transition ease-in-out duration-200 translate-10' onClick={ () => completeTodo(index)}>完了</button>
    </li>
  )

})

export default Todo;