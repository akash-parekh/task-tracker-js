import { randomUUID } from "crypto";
import { readTasks, writeTask } from "../utils/file.js";
import type { Task } from "./../types/Task.js";

export const listTasks = async (filter: string[] = []): Promise<Task[]> => {
    const tasks = await readTasks();
    const filteredTasks = tasks.filter((t) => t.status in filter);
    return filteredTasks;
};

export const addTask = async (description: string): Promise<Task> => {
    const newTask: Task = {
        id: randomUUID(),
        description: description,
        status: "Todo",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    let tasks = await readTasks();
    tasks.push(newTask);
    await writeTask(tasks);
    return newTask;
};

export const updateTask = async (
    id: string,
    description: string,
): Promise<Task | null> => {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        return null;
    }
    task.description = description;
    await writeTask(tasks);
    return task;
};

export const changeStatus = async (
    id: string,
    status: string,
): Promise<Task | null> => {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        return null;
    }
    task.status = status;
    await writeTask(tasks);
    return task;
};

export const deleteTask = async (id: string): Promise<boolean> => {
    const tasks = await readTasks();
    const newTask = tasks.filter((t) => t.id !== id);
    await writeTask(newTask);
    return tasks.length !== newTask.length;
};
