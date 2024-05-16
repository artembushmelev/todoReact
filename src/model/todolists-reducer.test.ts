import { ActionsType, todolistReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { TodolistsType } from "../App";

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  // 1. Стартовый state
  const startState: TodolistsType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  // 2. Действие
  const action = {
    type: "REMOVE-TODOLIST",
    payload: {
      id: todolistId1,
    },
  } as const;

  const endState = todolistReducer(startState, action);

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1);
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2);
});
