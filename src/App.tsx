import React, { useState } from "react";
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

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type FilterValuesType = "all" | "active" | "completed";

function App() {
  // let [tasks, setTasks] = useState([
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ]);
  // let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
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
    let filteredTodoList = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodoList);
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  function removeTask(todolistId: string, id: string) {
    let filteredTasks = tasks[todolistId].filter((t) => t.id !== id);
    setTasks({ ...tasks, [todolistId]: filteredTasks });
  }

  function addTask(todolistId: string, title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = {
      ...tasks,
      [todolistId]: [newTask, ...tasks[todolistId]],
    };
    setTasks(newTasks);
  }

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    let ChangeTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map((m) =>
        m.id === taskId ? { ...m, isDone: isDone } : m
      ),
    };

    setTasks(ChangeTasks);
  };

  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTodolists(
      todolists.map((filtered) =>
        filtered.id === todolistId ? { ...filtered, filter: value } : filtered
      )
    );
  }

  const addTodolist = (title: string) => {
    const newTodolistId = v1();
    const newTodolist: TodolistsType = {
      id: newTodolistId,
      title,
      filter: "all",
    };
    setTodolists([...todolists, newTodolist]);
    setTasks({ ...tasks, [newTodolistId]: [] });
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((el) =>
        el.id === taskId ? { ...el, title: title } : el
      ),
    });
  };

  const updateTodolist = (todolistId: string, title: string) => {
    setTodolists(
      todolists.map((el) => (el.id === todolistId ? { ...el, title } : el))
    );
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, marginBottom: "100px" }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
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
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={mapTodoList.filter}
                    removeTodoList={removeTodoList}
                    updateTask={updateTask}
                    updateTodolist={updateTodolist}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
