import React, { Reducer, useReducer, useState } from "react";
import "./App.css";

import { v1 } from "uuid";
import { Todolist } from "./TodoList";
import { AddItemForm } from "./AddItemForm";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { MenuButton } from "./MenuButton";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Switch } from "@mui/material";
import { AppBarHeader } from "./AppBar";
import { TaskType } from "./TodoListWithRef";
import {
  ActionsType,
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer,
} from "./model/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./model/tasks-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./model/store";
import { useDispatch } from "react-redux";
import { TodolistWithRedax } from "./TodoListWithRedax";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export type FilterValuesType = "all" | "active" | "completed";

type ThemeMode = "dark" | "light";

function AppWithRedux() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(
    (state) => state.todolists
  );

  let tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );

  const dispath = useDispatch();

  let removeTodoList = (todolistId: string) => {
    dispath(removeTodolistAC(todolistId));
  };

  const removeTask = (todolistId: string, id: string) => {
    dispath(removeTaskAC(id, todolistId));
  };

  const addTask = (todolistId: string, title: string) => {
    dispath(addTaskAC(title, todolistId));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispath(changeTaskStatusAC(taskId, isDone, todolistId));
  };

  const changeTodolistFilter = (
    todolistId: string,
    value: FilterValuesType
  ) => {
    dispath(ChangeTodolistFilterAC(todolistId, value));
  };

  const addTodolist = (title: string) => {
    dispath(AddTodolistAC(title));
  };

  const updateTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispath(changeTaskTitleAC(taskId, title, todolistId));
  };

  const updateTodolist = (todolistId: string, title: string) => {
    dispath(ChangeTodolistTitleAC(todolistId, title));
  };

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const changeModeHandler = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, marginBottom: "100px" }}>
          <AppBarHeader changeModeHandler={changeModeHandler} />
        </Box>
        <Container fixed>
          <Grid container sx={{ marginBottom: "50px" }}>
            <AddItemForm addItem={addTodolist} />
          </Grid>
          <Grid container spacing={5}>
            {todolists.map((mapTodoList) => {
              // let tasksForTodolist = tasks[mapTodoList.id];

              // if (mapTodoList.filter === "active") {
              //   tasksForTodolist = tasks[mapTodoList.id].filter(
              //     (t) => t.isDone === false
              //   );
              // }
              // if (mapTodoList.filter === "completed") {
              //   tasksForTodolist = tasks[mapTodoList.id].filter(
              //     (t) => t.isDone === true
              //   );
              // }

              return (
                <Grid key={mapTodoList.id} item>
                  <Paper elevation={6} sx={{ padding: "20px" }}>
                    <TodolistWithRedax todolist={mapTodoList} />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default AppWithRedux;
