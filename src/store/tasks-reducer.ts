import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";

const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';
const ADD_TODOLIST = 'ADD-TODOLIST';
const REMOVE_TODOLIST = 'REMOVE-TODOLIST';


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistID: string
    status: TaskStatuses
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistID: string
    title: string
}


export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType | AddTodolistAT | RemoveTodolistAT;

export type TaskStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TaskStateType = {};


export const tasksReducer = (state = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case ADD_TASK:
            let task: TaskType = {id: v1(), title: action.title, status: TaskStatuses.New, priority: TaskPriorities.Low,
                todoListId:action.todolistID, description: '', addedDate: '', deadline: '', startDate: '', order: 0 }
            return {
                ...state,
                [action.todolistID]: [task, ...state[action.todolistID]]
            }
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t =>
                    t.id === action.taskId
                        ? {...t, status: action.status}
                        : t),
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(task => {
                        if (task.id === action.taskId) {
                            return {...task, title: action.title}
                        } else
                            return task
                    })
            }
        case ADD_TODOLIST:
            return {
                ...state,
                [action.todolistID]: [],
            }
        case REMOVE_TODOLIST:
            const newState = {...state}
            delete newState[action.todolistID]
            return newState
        default:
            // throw new Error('I don`t understand this action type')
            return state;
    }
}

//функция создяния объекта действия
export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, todolistID: todolistID}
}

export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistID}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistID}
}


