import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      if (todo.isComplete) {
        console.log(todo.id);
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="toggle">
          <FontAwesomeIcon icon={faBars} className="toggle-icon" />
        </div>
        <h1 className="logo">My Todo</h1>
        <div className="spacer"></div>
      </div>
      <TodoForm onSubmit={addTodo} />
      <div className="container">
        <h2>Tasks</h2>
        <div className="tasks">
          <Todo
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        </div>
      </div>
    </div>
  );
}

function TodoForm(props) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Add Task"
          value={input}
          name="text"
          className="todo-input"
          onChange={handleChange}
        />
        <button className="addButton">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </form>
  );
}

function Todo({ todos, completeTodo, removeTodo }) {
  // const [edit, setEdit] = useState({
  //   id: null,
  //   value: "",
  // });

  return todos.map((todo, index) => (
    <div className="task" key={index}>
      <div className="done" onClick={() => completeTodo(todo.id)}>
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <div className="task-title" key={todo.id}>
        {todo.text}
      </div>
      <div className="delete" onClick={() => removeTodo(todo.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  ));
}

export default App;
