import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "../stories/Button";
import { AddItemForm, AddItemFormPropsType } from "../addItemForm/AddItemForm";
import { ChangeEvent, memo, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox, TaskAlt } from "@mui/icons-material";
import { Task } from "./Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: "TODOLIST/Task",
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  args: {
    changeTaskStatus: fn(),
    changeTaskTitle: fn(),
    removeTask: fn(),
    task: { id: "gdssfgsdfs", title: "JS", isDone: false },
    todolistId: "grtrgfhg",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
  args: {
    task: { id: "gdssfgs", title: "HTML", isDone: true },
  },
};

const TaskToggle = () => {
  const [task, setTask] = useState({
    id: "gdssfgs",
    title: "HTML",
    isDone: false,
  });
  const changeTaskStatus = () => {
    setTask({ ...task, isDone: !task.isDone });
  };
  const changeTaskTitle = (taskId: string, newTitle: string) => {
    setTask({ ...task, title: newTitle });
  };

  return (
    <Task
      changeTaskStatus={changeTaskStatus}
      changeTaskTitle={changeTaskTitle}
      removeTask={() => {}}
      task={task}
      todolistId={"yfgdrtedrf"}
    />
  );
};

export const TaskTogleStory: Story = {
  render: () => <TaskToggle />,
};
