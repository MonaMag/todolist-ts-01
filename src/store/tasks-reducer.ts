import {TaskStateType, TasksType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

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
    isDone: boolean
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistID: string
    title: string
}


export type ActionsType = RemoveTaskActionType
    | AddTaskActionType | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType | AddTodolistAT | RemoveTodolistAT;


const initialState: TaskStateType = {};

//const initialState = {}
//type initialStateType = typeof initialState

export const tasksReducer = (state = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        case ADD_TASK:
            let task: TasksType = {id: v1(), isDone: false, title: action.title}
            return {
                ...state,
                [action.todolistID]: [task, ...state[action.todolistID]]
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t =>
                    t.id === action.taskId
                        ? {...t, isDone: action.isDone}
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

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistID}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistID}
}


