import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType,
} from "./todolists-reducer";
import {ResponseType, TaskPriorities, tasksAPI, TaskStatuses, TaskType, TaskUpdateModelType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

//types
const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const ADD_TODOLIST = 'ADD_TODOLIST';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const SET_TODOLIST = 'SET_TODOLIST';
const SET_TASKS = 'SET_TASKS';

export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType;

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type ThunkDispatchType = TasksActionsType | AppActionsType
const initialState: TaskStateType = {};

//reducer
export const tasksReducer = (state = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case REMOVE_TASK:
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        case UPDATE_TASK:
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t =>
                    t.id === action.taskId ? {...t, ...action.model} : t),
            }
        case ADD_TODOLIST:
            return {...state, [action.todolist.id]: []}

        case REMOVE_TODOLIST:
            const newState = {...state}
            delete newState[action.todolistID]
            return newState

        case SET_TODOLIST:
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState;
        case SET_TASKS:
            return {...state, [action.todolistID]: action.tasks}
        default:
            return state;
    }
}

//функция создяния объекта действия actions
export const removeTaskAC = (taskID: string, todolistID: string) =>
    ({type: 'REMOVE_TASK', taskID: taskID, todolistID: todolistID} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD_TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistID: string) =>
    ({type: `UPDATE_TASK`, taskId, model, todolistID} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) =>
    ({type: 'SET_TASKS', tasks, todolistID} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId));
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch<TasksActionsType>) => {
    tasksAPI.deleteTask(todolistID, taskID)
        .then(res => {
            let action = removeTaskAC(taskID, todolistID);
            dispatch(action);
        })
}
export const addTaskTC = (title: string, todolistID: string) => (dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = addTaskAC(res.data.data.item);
                dispatch(action);
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}

export const updateTaskTC = (taskID: string, todolistID: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<ThunkDispatchType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistID].find(t => t.id === taskID);
        if (!task) {
            // throw new Error('task not found in the state')
            console.warn('task not found in the state');
            return;
        }
        const apiModel: TaskUpdateModelType = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }
        tasksAPI.updateTask(todolistID, taskID, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskID, apiModel, todolistID);
                    dispatch(action);
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }
