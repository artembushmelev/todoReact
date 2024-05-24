import { FilterValuesType, TasksStateType } from "../App";
import { v1 } from "uuid";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

export type AddTodolistActionType = ReturnType<typeof addTaskAC>;

export type ActionsType = RemoveTaskActionType | AddTodolistActionType;

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (el) => el.id !== action.taskId
        ),
      };
    }
    case "ADD-TASK": {
      let newTask = { id: v1(), title: action.title, isDone: false };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: "REMOVE-TASK",
    taskId,
    todolistId,
  } as const;
};
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASK",
    title,
    todolistId,
  } as const;
};