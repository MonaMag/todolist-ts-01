import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

const ADD_TODOLIST = 'ADD-TODOLIST';
const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';


export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistID: string
}

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    todolistID: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todolistID: string
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT;

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state= initialState, action: TodolistActionType):Array<TodolistDomainType> => {
    switch (action.type){
        case ADD_TODOLIST:
            return [{
                id: action.todolistID,
                title: action.title,
                filter: 'all',
                addedData: '',
                order:0
            }, ...state]
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.todolistID)

        case CHANGE_TODOLIST_TITLE:
            debugger
            return state.map(tl => tl.id === action.todolistID
                ? {...tl, title: action.newTitle}
                : tl)
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.todolistID
                ? {...tl, filter: action.filter}
                : tl)
        default:
            return state
    }
}

//функция создяния объекта действия
export const removeTodolistAC = (todolistID: string): RemoveTodolistAT => {
    return { type: 'REMOVE-TODOLIST', todolistID: todolistID}
}

export const addTodolistAC = (title: string):  AddTodolistAT=> {
    return { type: 'ADD-TODOLIST', title: title, todolistID: v1()}
}

export const changeTodolistTitleAT = ( todoListID: string, title: string):  ChangeTodolistTitleAT=> {
    return { type: 'CHANGE-TODOLIST-TITLE', newTitle: title, todolistID: todoListID}
}

export const changeTodolistFilterAT = (todoListID: string, filter: FilterValuesType):  ChangeTodolistFilterAT=> {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, todolistID: todoListID}
}

