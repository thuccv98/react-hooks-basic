import './App.scss';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import { useEffect, useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'anh yeu em nhieu lam'},
    { id: 2, title: 'em yeu anh nhieu lam'},
    { id: 3, title: 'chung ta chia tay nhe'}
  ]);

  const [postList, setPortList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const { data } = responseJSON;
        setPortList(data);
      } catch (error) {
        console.log('Failed to fetch post list:', error.message);
      }
      
    }

    fetchPostList();
  }, []);

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log('form submit:', formValues); //kiem tra xem du lieu da nhan duoc chua
    //add new todo to curent todo list
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>React hooks - ColorBox</h1>

      <ColorBox />
      <h1>React Hooks - TodoList</h1>

      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />

      <h1>React hooks - PostList</h1>
      <PostList posts={postList} />
    </div>
  );
}

export default App;
