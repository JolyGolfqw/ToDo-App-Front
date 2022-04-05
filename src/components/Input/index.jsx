import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/features/todos";
import styles from "./styles.module.css";

function Input() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleText = (e) => {
    return setText(e.target.value);
  };

  const handleAddTodo = () => {
    if (!text) {
      return alert("Поле ввода не должно быть пустым");
    }
    setText("");
    dispatch(addTodo(text));
  };

  return (
    <>
      <h1 className={styles.title}>To Do List</h1>
      <InputGroup className={styles.inputGroup}>
        <FormControl
          className={styles.form}
          value={text}
          onChange={(e) => handleText(e)}
          placeholder="Add a task here..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button
          className={styles.btn}
          onClick={() => handleAddTodo()}
          variant="primary"
          id="button-addon2"
        >
          +
        </Button>
      </InputGroup>
    </>
  );
}

export default Input;
