import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistAT, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {todolistsAPI} from "../api/todolists-api";



const REMOVE_TASK = 'REMOVE-TASK';
const ADD_TASK = 'ADD-TASK';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE';
const ADD_TODOLIST = 'ADD-TODOLIST';
const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const  SET_TODOLIST= 'SET-TODOLIST';
const  SET_TASKS = 'SET-TASKS';

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

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistID: string
}

export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType | SetTasksActionType | AddTodolistAT | RemoveTodolistAT | SetTodolistAT;

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
        case SET_TODOLIST: {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState;
        }
        case SET_TASKS: {
            const copyState = {...state}
            copyState[action.todolistID] = action.tasks
            return copyState;
        }
        default:
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

export const setTasksAC = (tasks: Array<TaskType>, todolistID: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistID}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}