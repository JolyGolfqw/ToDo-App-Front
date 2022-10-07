import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { makeCompleted, deleteTodo, changeTodos, deleteTodos } from "../../../redux/features/todos";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

function Todo({ text, done, id, deleting,  todo }) {
  const dispatch = useDispatch();

  Todo.propTypes = {
    text: PropTypes.string,
    done: PropTypes.bool,
    deleting: PropTypes.bool,
  };

  const handleChecked = () => {
    dispatch(changeTodos(todo));
    console.log(todo);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodos(id));
    console.log(deleting);
  };

  return (
    <div className={!done ? styles.todo : styles.completedTodo}>
      <div className={!done ? styles.text : styles.completedText}>{text}</div>
      <div className={!done ? styles.btnContainer : styles.completedContainer}>
        <Checkbox
          className={styles.checked}
          checked={done}
          onChange={() => handleChecked()}
          icon={<CircleUnchecked />}
          checkedIcon={<CircleChecked />}
        />
        <button
          disabled={deleting}
          className={deleting ? styles.disabled : ""}
          onClick={() => handleDelete(id)}
        >
          Х
        </button>
      </div>
    </div>
  );
}

export default Todo;
