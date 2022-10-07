import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, loadTodos } from "../../redux/features/todos";
import CircularProgress from "@mui/material/CircularProgress";
import "./Todo/styles.module.css";
import styles from "./styles.module.css";
import Pagination from "../Pagination";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  const [load, setLoad] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [todosPerPage] = useState(4)

  const lastPageIndex = currentPage * todosPerPage
  const firstPageIndex = lastPageIndex - todosPerPage
  const currentTodo = todos.slice(firstPageIndex, lastPageIndex)

  const paginate = pageNumber => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage(prev => prev + 1)
  const prevPage = () => setCurrentPage(prev => prev - 1)

  
  console.log(todos)
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTodos());
    setLoad(false)
  }, [dispatch]);
  
  console.log(todos)
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (loading) {
    return (
      <div className={styles.loader}>
        <CircularProgress />
      </div>
    );
  }

  if (!todos.length) {
    return <div className={styles.emptyData}>У вас нет добавленных дел</div>;
  }

  return (
    <div>
      {todos.map((todo) => {
        return (
          !todo.completed && (
            <Todo
              key={todo._id}
              text={todo.todo}
              done={todo.completed}
              id={todo._id}
              deleting={todo.deleting}
              todo={todo}
            />
          )
        );
      })}
      <hr />
      {todos.map((todo) => {
        return (
          todo.completed && (
            <Todo
              key={todo._id}
              text={todo.todo}
              done={todo.completed}
              id={todo._id}
              deleting={todo.deleting}
              todo={todo}
            />
          )
        );
      })}
      {/* <Pagination todosPerPage={todosPerPage} totalTodo={todos.length} paginate={paginate}/>
      <button className="btn btn-primary" onClick={prevPage}>Prev Page</button>
      <button className="btn btn-primary ms-2" onClick={nextPage}>Next Page</button> */}

    </div>
  );
}

export default Todos;
