import './App.css';
import React, { useEffect, useState } from 'react';
import { IoIosCheckmark } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function App() {
  const [isCompleteScreen, setColor] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [allcompleted, setCompleted] = useState([]);
  const [renderPage, setRenderPage] = useState(true);

  const AddTodo = (e) => {
    e.preventDefault();

    if (newTitle === '') {
      alert("Please enter a title");
      return;
    }

    let newTodoItem = {
      title: newTitle,
      description: newDescription
    };
    
    let updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    
    // Clear input fields after adding todo
    setNewTitle('');
    setNewDescription('');
  };

  const deleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const deleteCompletedTodo = (index) => {
    const newCompletedTodo = [...allcompleted];
    newCompletedTodo.splice(index, 1);
    setCompleted(newCompletedTodo);
    localStorage.setItem('completedTodos', JSON.stringify(newCompletedTodo));
  };

  const completedTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1; // Note: Months are zero-based, so add 1
    let yy = now.getFullYear();
    let hr = now.getHours();
    let min = now.getMinutes();
    let period = hr >= 12 ? 'PM' : 'AM';
    
    // Convert hour to 12-hour format
    hr = hr % 12 || 12;
    
    let completedOn = `${dd}-${mm}-${yy} at ${hr}:${min} ${period}`;

    let completedItem = {
      ...allTodos[index],
      completedOn: completedOn
    };

    const updatedTodos = allTodos.filter((item, i) => i !== index);
    const updatedCompleted = [...allcompleted, completedItem];

    setTodos(updatedTodos);
    setCompleted(updatedCompleted);

    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleted));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompleted(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <div className='todo-wrapper'>
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter todo" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the task description" />
          </div>
          <div className='primaryBtn'>
            <button type="button" className ="btn" onClick={AddTodo}>Add</button>
          </div>
        </div>
        <div className="btn-area">
          <div>
            <button className={`secondaryBtn ${!isCompleteScreen && 'active'}`} onClick={() => setColor(false)}>todo</button>
            <button className={`secondaryBtn ${isCompleteScreen && 'active'}`} onClick={() => setColor(true)}>completed</button>
          </div>
        </div>
        <div className="todo-list">
          {!isCompleteScreen &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <span className="icon" onClick={() => deleteTodo(index)}><MdDelete /></span>
                  <span className="check-icon" onClick={() => completedTodo(index)}><IoIosCheckmark /></span>
                </div>
              </div>
            ))}
          {isCompleteScreen &&
            allcompleted.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on {item.completedOn}</small></p>
                </div>
                <div>
                  <span className="icon" onClick={() => deleteCompletedTodo(index)}><MdDelete /></span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
