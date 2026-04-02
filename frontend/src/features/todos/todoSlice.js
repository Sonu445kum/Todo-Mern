import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// GET TODOS
export const getTodos = createAsyncThunk(
  "todos/get",
  async ({ page = 1, keyword = "" }) => {
    const res = await API.get(`/todos?page=${page}&keyword=${keyword}`);
    return res.data;
  }
);

// CREATE
export const createTodo = createAsyncThunk(
  "todos/create",
  async (data) => {
    const res = await API.post("/todos", data);
    return res.data;
  }
);

// DELETE
export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id) => {
    await API.delete(`/todos/${id}`);
    return id;
  }
);

const slice = createSlice({
  name: "todos",
  initialState: { todos: [] },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (t) => t._id !== action.payload
        );
      });
  },
});

export default slice.reducer;