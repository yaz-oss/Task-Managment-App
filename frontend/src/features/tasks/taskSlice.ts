import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const API = "http://localhost:5000/api/tasks";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: {
    title: string;
    description: string;
  }) => {
    const res = await axios.post(API, task);
    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: any) => {
    const res = await axios.put(
      `${API}/${task.id}`,
      task
    );

    return res.data;
  }
);

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });

    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? action.payload
          : task
      );
    });
  },
});

export default taskSlice.reducer;