import { configureStore } from "@reduxjs/toolkit";
import  todosSlice  from "../features/todos";

export const store = configureStore({reducer: todosSlice})

