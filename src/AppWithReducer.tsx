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

function AppWithReducer() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispathToTodolists] = useReducer(todolistReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, dispathToTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  let removeTodoList = (todolistId: string) => {
    dispathToTodolists(removeTodolistAC(todolistId));
    dispathToTasks(removeTodolistAC(todolistId));
  };

  const removeTask = (todolistId: string, id: string) => {
    dispathToTasks(removeTaskAC(id, todolistId));
  };

  const addTask = (todolistId: string, title: string) => {
    dispathToTasks(addTaskAC(title, todolistId));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispathToTasks(changeTaskStatusAC(taskId, isDone, todolistId));
  };

  const changeTodolistFilter = (
    todolistId: string,
    value: FilterValuesType
  ) => {
    dispathToTodolists(ChangeTodolistFilterAC(todolistId, value));
  };

  const addTodolist = (title: string) => {
    let action = AddTodolistAC(title);
    dispathToTasks(action);
    dispathToTodolists(action);
  };

  const updateTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispathToTasks(changeTaskTitleAC(taskId, title, todolistId));
  };

  const updateTodolist = (todolistId: string, title: string) => {
    dispathToTodolists(ChangeTodolistTitleAC(todolistId, title));
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
              let tasksForTodolist = tasks[mapTodoList.id];

              if (mapTodoList.filter === "active") {
                tasksForTodolist = tasks[mapTodoList.id].filter(
                  (t) => t.isDone === false
                );
              }
              if (mapTodoList.filter === "completed") {
                tasksForTodolist = tasks[mapTodoList.id].filter(
                  (t) => t.isDone === true
                );
              }

              return (
                <Grid item>
                  <Paper elevation={6} sx={{ padding: "20px" }}>
                    <Todolist
                      key={mapTodoList.id}
                      todolistId={mapTodoList.id}
                      title={mapTodoList.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeTodolistFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={mapTodoList.filter}
                      removeTodoList={removeTodoList}
                      updateTask={updateTaskTitle}
                      updateTodolist={updateTodolist}
                    />
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

export default AppWithReducer;
