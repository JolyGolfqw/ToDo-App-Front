import React, { useEffect } from "react";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { loadTodos } from "../../redux/features/todos";
import CircularProgress from "@mui/material/CircularProgress";
import "./Todo/styles.module.css";
import styles from "./styles.module.css";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

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
            />
          )
        );
      })}
    </div>
  );
}

export default Todos;
