import './App.scss';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'anh yeu em nhieu lam'},
    { id: 2, title: 'em yeu anh nhieu lam'},
    { id: 3, title: 'chung ta chia tay nhe'}
  ]);

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>Welcome to React Hooks!</h1>

      <ColorBox />
      <h1>TodoList</h1>

      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  );
}

export default App;
