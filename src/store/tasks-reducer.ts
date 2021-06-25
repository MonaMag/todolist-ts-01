import {TaskStateType, TasksType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";


type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskID: string
    todolistID: string
}

type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todolistID: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    todolistID: string
    isDone: boolean
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskId: string
    todolistID: string
    title: string
}



export type ActionsType = RemoveTaskActionType
    | AddTaskActionType |  ChangeTaskStatusActionType
    | ChangeTaskTitleActionType | AddTodolistAT |RemoveTodolistAT;

export const tasksReducer = (state: TaskStateType, action: ActionsType) => {
    switch (action.type){
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        case 'ADD_TASK':
            let task: TasksType = {id: v1(), isDone: false, title: action.title}
            return {
                ...state,
                [action.todolistID]: [task, ...state[action.todolistID]]
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map( task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                        } else
                        return task
                } )
            }

        case 'CHANGE_TASK_TITLE':
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

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistID]: []
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.todolistID]
            return {
                ...state,
                [action.todolistID]: []
            }

        default:
            throw new Error('I do not understand this type')
    }
}



//функция создяния объекта действия
export const  removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return { type: 'REMOVE_TASK', taskID, todolistID}
}

export const  addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todolistID}

}

export const changeTaskStatusAC= (taskId: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistID }
}

export const changeTaskTitleAC= (taskId: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todolistID }
}


