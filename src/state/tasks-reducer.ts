import { TasksStateType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodosType } from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
  todolistsAPI,
} from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

const initialState: TasksStateType = {
  /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/
};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
      };

    case "ADD-TASK": {
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolist.id]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    case "SET-TODOLISTS": {
      return action.todos.reduce((acc, tl) => {
        acc[tl.id] = [];
        return acc;
      }, state);
    }
    case "SET-TASKS": {
      return {
        ...state,
        [action.todoId]: action.tasks,
      };
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({ type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId } as const);

export const addTaskAC = (task: TaskType) => ({ type: "ADD-TASK", task } as const);

export const updateTaskAC = (taskId: string, todolistId: string, model: UpdateTaskModelType) =>
  ({ type: "UPDATE-TASK", model, todolistId, taskId } as const);

export const setTaskAC = (todoId: string, tasks: TaskType[]) =>
  ({ type: "SET-TASKS", tasks, todoId } as const);

export const getTasksTС = (todoId: string) => {
  return (dispatch: Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsAPI.getTasks(todoId).then((res) => {
      // и диспатчить экшены (action) или другие санки (thunk)
      dispatch(setTaskAC(todoId, res.data.items));
    });
  };
};

export const createTasksTС = (todoId: string, title: string) => {
  return (dispatch: Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsAPI.createTask(todoId, title).then((res) => {
      // и диспатчить экшены (action) или другие санки (thunk)
      dispatch(addTaskAC(res.data.data.item));
    });
  };
};

export const deleteTasksTС = (todoId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsAPI.deleteTask(todoId, taskId).then((res) => {
      // и диспатчить экшены (action) или другие санки (thunk)
      dispatch(removeTaskAC(taskId, todoId));
    });
  };
};

export const updateTasksTС = (todoId: string, taskId: string, domainModel: UpdateTaskModelType) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoId].find((task) => task.id === taskId);
    if (task) {
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
        startDate: task.startDate,
        status: task.status,
        ...domainModel,
      };

      todolistsAPI.updateTask(todoId, taskId, apiModel).then((res) => {
        dispatch(updateTaskAC(taskId, todoId, apiModel));
      });
    }
  };
};

//// types

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodosType
  | ReturnType<typeof setTaskAC>
  | UpdateTaskActionType;
