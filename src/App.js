import React, {useEffect, useState} from 'react';
import './App.css'
import Layout from "./components/layout";
import Header from "./components/header";
import Lists from "./components/Lists";
import Form from "./components/form";

const App = () => {
    const [todo,setTodo]=useState('')
    const [todos,setTodos]=useState([])
    const [error,setError]=useState(null)

//Get todos from LocalStorage
    useEffect(()=>{
        const getTodos = JSON.parse(localStorage.getItem('todos'))

        if (getTodos){
            setTodos(getTodos)
        }
    },[])

    //Saving the todos LocalStorage
    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])



    const submitHandler = (e) => {
        e.preventDefault()

        if (todo.length < 5 ){
            setError('At least 5 word required')
            return false
        }

        setTodos([ {id:Date.now(), title:todo, done:false}, ...todos])

        setError(null)
        setTodo('')
    }

    const delHandler = (todoId) => {
        if (window.confirm('Are you sure?')){
            const updatedTodos = todos.filter(item=> item.id !== todoId )

            setTodos(updatedTodos)
        }

    }
    const doneHandler = (todoId) => {
        const index = todos.findIndex(item => item.id === todoId)
        const duplicateTodos = [...todos]

        duplicateTodos[index] = {
            id: todos[index].id,
            title: todos[index].title,
            done: !todos[index].done
        }
        setTodos(duplicateTodos)
    }

  return (
      <Layout>
          <Header/>
          <Form todo={todo} change={(e)=>setTodo(e.target.value)} submit={submitHandler} error={error}/>
          <Lists done={doneHandler} del={delHandler} todos={todos}/>
      </Layout>

  );
};

export default App;
