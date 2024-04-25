import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType
}

function App() {

  const removeTask = (id: string, todolistId:string) => {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  };

  const addTask = (title: string, todolistId:string) => {
    const task = {
      id: v1(),
      title,
      isDone: false,
    };
    let tasks = tasksObj[todolistId];
    let newTask = [task, ...tasks ];
    tasksObj[todolistId] = newTask;
    setTasks({...tasksObj});
  };

  const changeStatus = (taskId: string, isDone: boolean, todolistId:string) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});
    }
    
  };



  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId );
    if(todolist) {
      todolist.filter = value
      setTodolist([...todolists])
    }
  };

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolist] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn", filter: "active" },
    { id: todolistId2, title: "What to buy", filter: "completed" },
  ]);

  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todolists.filter(tl => tl.id !== todolistId )
    setTodolist(filteredTodoList)
    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  }

  let [tasksObj, setTasks] = useState({
    [todolistId1] : [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redax", isDone: false }], 

    [todolistId2] : [
    { id: v1(), title: "Book", isDone: false },
    { id: v1(), title: "Milk", isDone: true }]
  })

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];

        if (tl.filter === "completed") {
          tasksForTodoList = tasksObj[tl.id].filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksObj[tl.id].filter((t) => t.isDone === false);
        }
        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
