import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { makeCompleted, deleteTodo } from "../../../redux/features/todos";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

function Todo({ text, done, id, deleting }) {
  const dispatch = useDispatch();

  Todo.propTypes = {
    text: PropTypes.string,
    done: PropTypes.bool,
    deleting: PropTypes.bool,
  };

  const handleChecked = () => {
    console.log(id);
    dispatch(makeCompleted(id, done));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
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
