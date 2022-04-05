const initialState = {
  todos: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/fetch/fullfilled":
      return { ...state, todos: action.payload, loading: false };

    case "todos/fetch/pending":
      return { ...state, loading: true };

    case "todos/fetch/rejected":
      return { ...state, error: action.payload, loading: false };

    case "todos/post/fullfilled":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        loading: false,
      };

    case "todos/post/rejected":
      return { ...state, error: action.payload, loading: false };

    case "todos/patch/fullfilled":
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo._id === action.payload.id) {
              todo.completed = !todo.completed;
              return todo;
            }
            return todo;
          }),
        ],
        loading: false,
      };

    case "todos/patch/rejected":
      return { ...state, error: action.payloaad, loading: false };

    case "todos/delete/fullfilled":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
        loading: false,
      };

    case "deleting":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item._id === action.payload) {
            return { ...item, deleting: true };
          }
          return item;
        }),
      };

    case "todos/delete/rejected":
      return { ...state, error: action.payloaad, loading: false };

    default:
      return state;
  }
};

export const loadTodos = () => {
  return async (dispatch) => {
    dispatch({ type: "todos/fetch/pending" });
    try {
      const res = await fetch("http://localhost:3030/todos");
      const todos = await res.json();
      dispatch({ type: "todos/fetch/fullfilled", payload: todos });
    } catch (err) {
      dispatch({ type: "todos/fetch/rejected", payload: err.message });
    }
  };
};

export const addTodo = (todo) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:3030/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo }),
      });
      const data = await res.json();
      dispatch({ type: "todos/post/fullfilled", payload: data });
    } catch (err) {
      dispatch({ type: "todos/post/rejected", payload: err.message });
    }
  };
};

export const makeCompleted = (id, completed) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3030/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      const data = await res.json();

      dispatch({ type: "todos/patch/fullfilled", payload: { data, id } });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "todos/patch/rejected", payload: err.message });
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: "deleting", payload: id });
    try {
      await fetch(`http://localhost:3030/todos/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "todos/delete/fullfilled", payload: id });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "todos/delete/rejected", payload: err.message });
    }
  };
};

export default reducer;
