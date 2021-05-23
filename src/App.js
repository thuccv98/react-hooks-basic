import './App.scss';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';
import queryString from 'query-string';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/CLock';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'anh yeu em nhieu lam'},
    { id: 2, title: 'em yeu anh nhieu lam'},
    { id: 3, title: 'chung ta chia tay nhe'}
  ]);

  const [postList, setPortList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFileters] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  })

  useEffect(() => {
    async function fetchPostList() {
      //...
      try {
        // _limit=10&_page=1
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;
        setPortList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch post list:', error.message);
      }
      
    }

    fetchPostList();
  }, [filters]);

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

  function handlePageChange(newPage) {
    console.log('new Page:',  newPage);
    setFileters({
      ...filters,
      _page: newPage,
    });
  }

  function handleFiltersChange(newFilters) {
    console.log('New filters:', newFilters);
    setFileters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,

    })
  }

  return (
    <div className="app">
      <h1>React hooks - Clock</h1>
      <Clock />
      <h1>React hooks - ColorBox</h1>

      <ColorBox />
      <h1>React Hooks - TodoList</h1>

      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />

      <h1>React hooks - PostList</h1>
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
        
      <Pagination 
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
