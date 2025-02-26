import React, { useEffect } from 'react';
import TodoList from "./todo/TodoList";
import Context from "./context";
import Loader from "./loader";
import Modal from "./modal/modal";

const AddTodo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./todo/addTodos'));
  }, 2000);
}));

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=1')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 1000);
      })
  },[]);

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className='wrapper'>
        <h1>Список Покупок</h1>
        <Modal />


        <React.Suspense fallback={<p>Loading.....</p>}>
        <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo}/>
        ) : loading ? null : (
          <p>Список пустий</p>
        )}

      </div>
    </Context.Provider>
  );
}

export default App;
