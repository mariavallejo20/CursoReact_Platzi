import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';

function AppUI()
{

    const {
        searchedTodos, 
        completeTodo, 
        deleteTodo, 
        loading, 
        error, 
        openModal
    } = React.useContext(TodoContext)

    return (
        <>    
            <TodoCounter />
            <TodoSearch />

            <TodoList>
            
                {loading && <p>Estamos cargando...</p>}
                {error && <p> Desespérate, hubo un error!!</p>}
                {(!loading && searchedTodos === 0) && <p>¡Crea tu primer TODO!</p>}

                {searchedTodos.map(todo => (
                <TodoItem 
                    key={todo.text} 
                    text={todo.text} 
                    completed={todo.completed}
                    onComplete={() => completeTodo(todo.text)}
                    onDelete={() => deleteTodo(todo.text)}
                />
                ))}

            </TodoList>
            
            <CreateTodoButton />

            {openModal && (
                <Modal>
                    <TodoForm />
                </Modal>
            )}
    
        </>
      );
}

export {AppUI}
