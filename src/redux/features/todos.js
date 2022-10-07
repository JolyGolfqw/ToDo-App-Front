import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../../serverUrl";

const initialState = {
  todos: [],
  error: null,
  loading: false,
};

console.log(serverUrl)

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/todos`);
      //console.log('aaaaaa', await res.json())
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const changeTodos = createAsyncThunk(
  "todos/edit",
  async (todo, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/todos/${todo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addTodos = createAsyncThunk(
  "todos/add",
  async (todo, thunkAPI) => {
    try {
      const res = await fetch(`${serverUrl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/delete",
  async (id, thunkAPI) => {
    try {
      await fetch(`${serverUrl}/todos/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })

      .addCase(changeTodos.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return action.payload;
          }
          return todo;
        });
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        console.log(action.payload);
        state.todos.push(action.payload);
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter(item => item._id !== action.payload)
      });
  },
});

export default todosSlice.reducer;

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "todos/fetch/fullfilled":
//       return { ...state, todos: action.payload, loading: false };

//     case "todos/fetch/pending":
//       return { ...state, loading: true };

//     case "todos/fetch/rejected":
//       return { ...state, error: action.payload, loading: false };

//     case "todos/post/fullfilled":
//       return {
//         ...state,
//         todos: [action.payload, ...state.todos],
//         loading: false,
//       };

//     case "todos/post/rejected":
//       return { ...state, error: action.payload, loading: false };

//     case "todos/patch/fullfilled":
//       return {
//         ...state,
//         todos: [
//           ...state.todos.map((todo) => {
//             if (todo._id === action.payload.id) {
//               todo.completed = !todo.completed;
//               return todo;
//             }
//             return todo;
//           }),
//         ],
//         loading: false,
//       };

//     case "todos/patch/rejected":
//       return { ...state, error: action.payloaad, loading: false };

//     case "todos/delete/fullfilled":
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo._id !== action.payload),
//         loading: false,
//       };

//     case "deleting":
//       return {
//         ...state,
//         todos: state.todos.map((item) => {
//           if (item._id === action.payload) {
//             return { ...item, deleting: true };
//           }
//           return item;
//         }),
//       };

//     case "todos/delete/rejected":
//       return { ...state, error: action.payloaad, loading: false };

//     default:
//       return state;
//   }
// };

export const loadTodos = () => {
  return async (dispatch) => {
    dispatch({ type: "todos/fetch/pending" });
    try {
      const res = await fetch("${serverUrl}/todos");
      const todos = await res.json();
      dispatch({ type: "todos/fetch/fullfilled", payload: todos });
    } catch (err) {
      dispatch({ type: "todos/fetch/rejected", payload: err.message });
    }
  };
};

// export const fetchTodos = createAsyncThunk(
//   'todos/fetch', async (_, thunkAPI) => {
//     try {
//       const res = await fetch("${serverUrl}/todos");
//       return res.json()
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err)
//     }
//   }
//   )

//   const todosSlice = createSlice({
//     name: 'todos',
//     initialState,
//     reducers: {},
//     extraReducers: {
//       [fetchTodos.fulfilled]: (state, action) => {
//         state.todos = action.payload
//         state.loading = false
//       },
//       [fetchTodos.pending]: (state) => {
//         state.loading = true
//       }
//     }
//   })

// export default todosSlice.reducer

//   export const addTodo = (todo) => {
//     return async (dispatch) => {
//       try {
//       const res = await fetch("${serverUrl}/todos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ todo }),
//       });
//       const data = await res.json();
//       dispatch({ type: "todos/post/fullfilled", payload: data });
//     } catch (err) {
//       dispatch({ type: "todos/post/rejected", payload: err.message });
//     }
//   };
// };

export const makeCompleted = (id, completed) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${serverUrl}/todos/${id}`, {
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
      await fetch(`${serverUrl}/todos/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "todos/delete/fullfilled", payload: id });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "todos/delete/rejected", payload: err.message });
    }
  };
};

// export default reducer;
