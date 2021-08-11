import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

const ADD_TODOLIST = 'ADD-TODOLIST';
const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';
const  SET_TODOLIST= 'SET-TODOLIST';

export type SetTodolistAT = {
    type: 'SET-TODOLIST'
    todolists: Array<TodolistType>
}

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

export type TodolistActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT | SetTodolistAT;

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state= initialState, action: TodolistActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [{
                id: action.todolistID,
                title: action.title,
                filter: 'all',
                addedData: '',
                order: 0
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
        case SET_TODOLIST:
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        default:
            return state
    }
}
//* ====== Action Creators ====================>
export const removeTodolistAC = (todolistID: string): RemoveTodolistAT => {
    return { type: 'REMOVE-TODOLIST', todolistID: todolistID}
}

export const addTodolistAC = (title: string):  AddTodolistAT=> {
    return { type: 'ADD-TODOLIST', title: title, todolistID: v1()}
}

export const changeTodolistTitleAC = ( todoListID: string, title: string):  ChangeTodolistTitleAT=> {
    return { type: 'CHANGE-TODOLIST-TITLE', newTitle: title, todolistID: todoListID}
}

export const changeTodolistFilterAC = (todoListID: string, filter: FilterValuesType):  ChangeTodolistFilterAT=> {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, todolistID: todoListID}
}

export const setTodolistsAC = (todoLists: Array<TodolistType>):  SetTodolistAT=> {
    return { type: 'SET-TODOLIST', todolists: todoLists}
}

//* ====== Thunk Creators =======================>
//type ThunkType = BaseThunkType<TodoListActionsType>

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}