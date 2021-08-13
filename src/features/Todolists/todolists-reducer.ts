import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";


const ADD_TODOLIST = 'ADD_TODOLIST';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';
const  SET_TODOLIST= 'SET_TODOLIST';


export type FilterValuesType = 'all' | 'active' | 'completed';

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>

export type TodolistActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state= initialState, action: TodolistActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [{...action.todolist, filter: 'all'}, ...state]

        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.todolistID)

        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTitle} : tl)

        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)

        case SET_TODOLIST:
            return action.todolists.map(tl => ({...tl, filter: 'all'}))

        default:
            return state
    }
}

//* Action Creators
export const removeTodolistAC = (todolistID: string) => ({type: 'REMOVE_TODOLIST', todolistID: todolistID} as const)
export const addTodolistAC = (todolist: TodolistType)=> ({ type: 'ADD_TODOLIST', todolist} as const)
export const changeTodolistTitleAC = ( todolistID: string, title: string)=> ({ type: 'CHANGE_TODOLIST_TITLE', newTitle: title, todolistID} as const)
export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType)=> ({ type: 'CHANGE_TODOLIST_FILTER', filter, todolistID} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>)=> ({ type: 'SET_TODOLIST', todolists: todolists} as const)

//* Thunk Creators

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<TodolistActionType>) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch<TodolistActionType>) => {
        todolistsAPI.deleteTodolist(todolistID)
            .then(res => {
                let action = removeTodolistAC(todolistID);
                dispatch(action);
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<TodolistActionType>) => {
        todolistsAPI.createTodolist(title)
            .then(res => {
                let action = addTodolistAC(res.data.data.item);
                dispatch(action);
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<TodolistActionType>) => {
        todolistsAPI.updateTodolist(id, title)
            .then(res => {
                let action = changeTodolistTitleAC(id, title);
                dispatch(action);
            })
    }
}