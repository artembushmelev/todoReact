import {
  ActionsType,
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  removeTodolistAC as removeTodolistAC,
  todolistReducer,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TodolistsType } from "../App";

let todolistId1: string;
let todolistId2: string;
let startState: TodolistsType[];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  // 1. Стартовый state
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1);
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const newTodolist = "New Todolist";

  const endState = todolistReducer(startState, AddTodolistAC(newTodolist));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolist);
});

test("correct todolist should change its name", () => {
  const newTodolistTitle = "New Todolist";

  const endState = todolistReducer(
    startState,
    ChangeTodolistTitleAC(todolistId2, newTodolistTitle)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  const endState = todolistReducer(
    startState,
    ChangeTodolistFilterAC(todolistId2, "completed")
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("completed");
});
