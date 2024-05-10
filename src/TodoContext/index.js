import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext()

function TodoProvider({children})
{
    // ESTADOS
    const {
        item: todos, 
        saveItem: saveTodos,
        loading,
        error} = useLocalStorage('TODOS_V1', [])
    const [searchValue, setSearchValue] = React.useState('')
    const [openModal, setOpenModal] = React.useState(false)

    // ESTADOS DERIVADOS
    const completedTodos = todos.filter(todo => !! todo.completed).length
    const totalTodos = todos.length;

    const searchedTodos = todos.filter((todo) =>{
        const todoText = todo.text.toLowerCase()
        const searchText = searchValue.toLowerCase()
        return todoText.includes(searchText)
    })

    const completeTodo = (text) =>
    {
        const newTodos = [...todos]
        const todoIndex = newTodos.findIndex((todo) => todo.text === text)

        if(newTodos[todoIndex].completed)
        newTodos[todoIndex].completed = false
        else
        newTodos[todoIndex].completed = true

        saveTodos(newTodos)  
    }

    const deleteTodo = (text) =>
    {
        //const newTodos = todos.filter(todo => todo.text !== text);

        const newTodos = [...todos]
        const todoIndex = newTodos.findIndex((todo) => todo.text === text)

        newTodos.splice(todoIndex,1)

        saveTodos(newTodos)
    }

    const addTodo = (text) =>
    {
        const newTodos = [...todos]
        newTodos.push({
            text,
            completed: false
        })

        saveTodos(newTodos)
    }

    return(
        <TodoContext.Provider value={{
            completedTodos, 
            totalTodos, 
            searchValue, 
            setSearchValue, 
            searchedTodos, 
            completeTodo, 
            deleteTodo, 
            loading, 
            error,
            openModal,
            setOpenModal,
            addTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}


export {TodoContext, TodoProvider}


// localStorage.removeItem('TODOS_V1')

// const defaultTodos = [
//   {text: 'Cortar Cebolla', completed: true},
//   {text: 'Tomar el curso de Intro', completed: false},
//   {text: 'Llorar con la Llorona', completed: false},
//   {text: 'LALALALALA', completed: false},
//   {text: 'Comprar mayonesa', completed: false}
// ]

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos))